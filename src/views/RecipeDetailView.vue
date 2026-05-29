<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import RecipeDetailHero from '../components/recipe/RecipeDetailHero.vue'
import IngredientsTable from '../components/recipe/IngredientsTable.vue'
import InstructionSteps from '../components/recipe/InstructionSteps.vue'
import NutritionScanner from '../components/nutrition/NutritionScanner.vue'

const route = useRoute()
const router = useRouter()

const recipe = ref(null)
const loading = ref(true)
const error = ref(null)

const nutritionData = ref(null)
const nutritionLoading = ref(false)
const nutritionError = ref(null)

// ─── Cache Helpers ────────────────────────────────────────────────
const CACHE_PREFIX = 'nutrition_cache_'
const RECIPE_CACHE_PREFIX = 'recipe_cache_'
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 hari

const getCached = (key) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }))
  } catch (e) {
    console.warn('Cache write failed:', e)
  }
}

// ─── Recipe Fetch (dengan cache) ─────────────────────────────────
const fetchRecipeDetail = async () => {
  const recipeId = route.params.id
  const cacheKey = `${RECIPE_CACHE_PREFIX}${recipeId}`

  try {
    loading.value = true

    const cached = getCached(cacheKey)
    if (cached) {
      recipe.value = cached
      loading.value = false
      return
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    const data = await response.json()

    if (data.meals && data.meals.length > 0) {
      recipe.value = data.meals[0]
      setCache(cacheKey, data.meals[0])
    } else {
      error.value = 'Recipe not found.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load recipe details.'
  } finally {
    loading.value = false
  }
}

// ─── Retry Helper ─────────────────────────────────────────────────
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchWithRetry = async (url, options, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options)

    if (response.status === 429) {
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000 // 1s, 2s, 4s
        console.warn(
          `Rate limited. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`,
        )
        await sleep(delay)
        continue
      }
      throw new Error('RATE_LIMITED')
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response
  }
}

// ─── Nutrition Generate (dengan cache + retry) ────────────────────
const handleGenerateNutrition = async () => {
  if (!recipe.value) return

  const recipeId = route.params.id
  const cacheKey = `${CACHE_PREFIX}${recipeId}`

  const cached = getCached(cacheKey)
  if (cached) {
    nutritionData.value = cached
    return
  }

  nutritionLoading.value = true
  nutritionError.value = null

  try {
    const ingredientList = parsedIngredients.value
      .map((ing) => `${ing.measure} ${ing.name}`)
      .join(', ')

    const prompt = `Analyze the nutritional content of this recipe "${recipe.value.strMeal}" with the following ingredients: ${ingredientList}.

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "calories": <number>,
  "protein_g": <number>,
  "carbs_g": <number>,
  "fat_g": <number>,
  "health_note": "<one short sentence about this dish's nutritional profile>"
}`

    const response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    )

    const data = await response.json()
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) throw new Error('Empty response from Gemini')

    const cleaned = rawText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    nutritionData.value = parsed
    setCache(cacheKey, parsed)
  } catch (err) {
    if (err.message === 'RATE_LIMITED') {
      nutritionError.value = 'Too many requests. Please wait a moment and try again.'
    } else {
      nutritionError.value = 'Failed to analyze nutrition. Please try again.'
    }
    console.error('Nutrition scan failed:', err)
  } finally {
    nutritionLoading.value = false
  }
}

// ─── Mount ────────────────────────────────────────────────────────
onMounted(() => {
  fetchRecipeDetail()

  const cached = getCached(`${CACHE_PREFIX}${route.params.id}`)
  if (cached) {
    nutritionData.value = cached
  }
})

// ─── Computed ─────────────────────────────────────────────────────
const parsedIngredients = computed(() => {
  if (!recipe.value) return []

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = recipe.value[`strIngredient${i}`]
    const measure = recipe.value[`strMeasure${i}`]

    if (name && name.trim() !== '') {
      ingredients.push({
        id: i,
        name: name.trim(),
        measure: measure ? measure.trim() : '',
        thumb: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name.trim())}-Small.png`,
      })
    }
  }
  return ingredients
})

const parsedInstructions = computed(() => {
  if (!recipe.value || !recipe.value.strInstructions) return []

  return recipe.value.strInstructions.split(/\r?\n/).filter((step) => step.trim().length > 5)
})
</script>

<template>
  <main
    class="min-h-screen bg-bg-primary font-body text-text-secondary selection:bg-accent-soft selection:text-accent-warm"
  >
    <!-- Loading State -->
    <div v-if="loading" class="flex min-h-screen items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-10 w-10 animate-spin rounded-tag border-2 border-accent-warm border-t-transparent"
        ></div>
        <p class="font-display italic text-text-tertiary">Preparing the kitchen...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <div class="text-[64px] opacity-80">🔥</div>
        <h3 class="mt-4 font-display text-[28px] italic text-text-primary">{{ error }}</h3>
        <button
          @click="router.back()"
          class="mt-6 rounded-btn border border-border-subtle px-6 py-2 transition-colors hover:border-accent-warm hover:text-text-primary"
        >
          Go Back
        </button>
      </div>
    </div>

    <!-- Recipe Content -->
    <div v-else-if="recipe">
      <RecipeDetailHero :recipe="recipe" />

      <section class="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <!-- Left: Ingredients + Instructions -->
          <div class="lg:col-span-7 xl:col-span-8">
            <IngredientsTable :ingredients="parsedIngredients" />
            <InstructionSteps :steps="parsedInstructions" />
          </div>

          <!-- Right: Nutrition Scanner -->
          <div class="lg:col-span-5 xl:col-span-4">
            <div class="sticky top-24">
              <NutritionScanner
                :nutrition="nutritionData"
                :loading="nutritionLoading"
                @generate="handleGenerateNutrition"
              />

              <!-- Nutrition Error -->
              <div
                v-if="nutritionError"
                class="mt-3 rounded-nutri border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-400"
              >
                ⚠ {{ nutritionError }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>