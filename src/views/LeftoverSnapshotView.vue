<script setup>
import { ref, computed } from 'vue' // Tambahkan computed
import { useGemini } from '../composables/useGemini'

import IngredientTagInput from '../components/leftover/IngredientTagInput.vue'
import GenerateButton from '../components/leftover/GenerateButton.vue'
import AIRecipeResult from '../components/leftover/AIRecipeResult.vue'

const { loading, error, retryMessage, generateRecipe, analyzeNutrition } = useGemini()

const ingredients = ref([])
const rawInput = ref('') // Menyimpan teks yang belum di-enter

const generatedRecipe = ref(null)
const generatedNutrition = ref(null)
const nutritionLoading = ref(false)

// Tombol aktif jika ada tag ATAU ada teks yang sedang diketik
const isReadyToGenerate = computed(() => {
  return ingredients.value.length > 0 || rawInput.value.trim().length > 0
})

const handleGenerate = async () => {
  // UX Pintar: Jika ada sisa teks yang belum di-enter, jadikan bahan secara otomatis
  if (rawInput.value.trim()) {
    ingredients.value.push(rawInput.value.trim())
    rawInput.value = ''
  }

  if (ingredients.value.length === 0) return
  
  error.value = null
  generatedRecipe.value = null
  generatedNutrition.value = null
  loading.value = true

  try {
    const recipeResult = await generateRecipe(ingredients.value)
    generatedRecipe.value = recipeResult
    loading.value = false

    nutritionLoading.value = true
    const nutResult = await analyzeNutrition(recipeResult.name, recipeResult.ingredients)
    generatedNutrition.value = nutResult
  } catch (err) {
    console.error(err)
    error.value = "AI Chef is currently unavailable. Please try again."
  } finally {
    loading.value = false
    nutritionLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-primary pb-24 font-body text-text-secondary">
    
    <header class="mx-auto max-w-[720px] px-6 pt-24 text-center">
      <span class="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-warm">
        AI Creative Chef
      </span>
      <h1 class="mt-4 font-display text-[42px] font-bold italic leading-tight text-text-primary sm:text-[52px]">
        What's in your fridge?
      </h1>
      <p class="mt-4 text-[16px] leading-[1.7] text-text-secondary">
        Add your leftover ingredients and we'll create a unique recipe just for you.
      </p>
    </header>

    <main class="mx-auto mt-12 max-w-[720px] px-6">
      
      <IngredientTagInput 
        v-model="ingredients" 
        v-model:inputValue="rawInput" 
      />

      <div class="mt-10">
        <GenerateButton 
          :loading="loading" 
          :retryMessage="retryMessage"
          :disabled="!isReadyToGenerate" 
          @click="handleGenerate" 
        />
      </div>

      <div v-if="error" class="mt-6 rounded-btn border border-cal/20 bg-cal/10 p-4 text-center text-[14px] text-cal">
        ⚠ {{ error }}
      </div>

      <Transition name="fade-up">
        <div v-if="generatedRecipe" class="mt-16">
          <AIRecipeResult 
            :recipe="generatedRecipe" 
            :nutrition="generatedNutrition" 
            :nutritionLoading="nutritionLoading" 
          />
        </div>
      </Transition>

    </main>
  </div>
</template>

<style scoped>
.fade-up-enter-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>