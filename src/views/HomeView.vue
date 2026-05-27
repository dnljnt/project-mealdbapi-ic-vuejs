<script setup>
import { onMounted, ref, watch } from 'vue'

import SearchBar from '@/components/home/SearchBar.vue'
import RecipeCard from '@/components/home/RecipeCard.vue'

import { useMealDB } from '@/composables/useMealDB'

const search = ref('')

const {
  meals,
  loading,
  error,
  searchMeals,
} = useMealDB()

/*
|--------------------------------------------------------------------------
| Debounce Search
|--------------------------------------------------------------------------
*/

let debounceTimeout = null

watch(search, (value) => {
  clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    searchMeals(value)
  }, 300)
})

/*
|--------------------------------------------------------------------------
| Initial Fetch
|--------------------------------------------------------------------------
*/

onMounted(() => {
  searchMeals('chicken')
})
</script>

<template>
  <main class="min-h-screen bg-bg-primary">
    <!-- HERO -->
    <section
      class="relative overflow-hidden border-b border-divider"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,164,74,0.12),transparent_30%)]"
      />

      <div
        class="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-10"
      >
        <!-- Heading -->
        <div class="max-w-4xl">
          <div
            class="mb-6 inline-flex items-center gap-3 rounded-full border border-accent-warm/20 bg-accent-soft px-5 py-2"
          >
            <span
              class="text-[11px] uppercase tracking-[0.25em] text-accent-warm"
            >
              AI Editorial Kitchen
            </span>
          </div>

          <h1
            class="font-display text-5xl italic leading-[0.95] tracking-[-0.05em] text-text-primary sm:text-6xl md:text-7xl xl:text-[96px]"
          >
            Discover recipes
            <br />

            worth craving.
          </h1>

          <p
            class="mt-8 max-w-2xl text-lg leading-8 text-text-secondary"
          >
            Explore curated dishes, AI-generated
            culinary ideas, and nutrition insights —
            all crafted into one immersive food
            experience.
          </p>
        </div>

        <!-- Search -->
        <div class="mt-14 max-w-2xl">
          <SearchBar
            v-model="search"
            :loading="loading"
          />
        </div>
      </div>
    </section>

    <!-- RESULTS -->
    <section
      class="mx-auto max-w-7xl px-5 py-16 lg:px-10"
    >
      <!-- Header -->
      <div
        class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2
            class="font-display text-3xl italic text-text-primary"
          >
            Found
            {{ meals.length }}
            Recipes
          </h2>

          <p
            class="mt-2 text-sm text-text-secondary"
          >
            Showing culinary inspirations from
            around the world.
          </p>
        </div>

        <!-- Fake Filters -->
        <div class="flex flex-wrap gap-3">
          <button
            class="rounded-full border border-accent-warm/20 bg-accent-soft px-4 py-2 text-xs uppercase tracking-[0.14em] text-accent-warm"
          >
            All
          </button>

          <button
            class="rounded-full border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.14em] text-text-secondary transition-all duration-300 hover:border-accent-warm/30 hover:text-text-primary"
          >
            Popular
          </button>

          <button
            class="rounded-full border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.14em] text-text-secondary transition-all duration-300 hover:border-accent-warm/30 hover:text-text-primary"
          >
            Quick
          </button>
        </div>
      </div>

      <!-- Error -->
      <div
        v-if="error"
        class="rounded-card border border-red-500/20 bg-red-500/10 p-6 text-red-300"
      >
        {{ error }}
      </div>

      <!-- Loading -->
      <div
        v-else-if="loading"
        class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="overflow-hidden rounded-card border border-border-subtle bg-bg-surface"
        >
          <div
            class="h-56 animate-pulse bg-bg-elevated"
          />

          <div class="space-y-4 p-5">
            <div
              class="h-3 w-20 animate-pulse rounded bg-bg-elevated"
            />

            <div
              class="h-5 w-full animate-pulse rounded bg-bg-elevated"
            />

            <div
              class="h-5 w-2/3 animate-pulse rounded bg-bg-elevated"
            />

            <div
              class="h-10 w-full animate-pulse rounded bg-bg-elevated"
            />
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div
        v-else-if="!meals.length"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="text-6xl">
          🍜
        </div>

        <h3
          class="mt-6 font-display text-4xl italic text-text-primary"
        >
          Nothing found.
        </h3>

        <p
          class="mt-4 max-w-md text-text-secondary"
        >
          Try searching for “Pasta”, “Chicken”,
          or “Seafood”.
        </p>
      </div>

      <!-- Grid -->
      <TransitionGroup
        v-else
        tag="div"
        name="grid"
        class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <RecipeCard
          v-for="recipe in meals"
          :key="recipe.idMeal"
          :recipe="recipe"
        />
      </TransitionGroup>
    </section>
  </main>
</template>

<style scoped>
.grid-enter-active,
.grid-leave-active {
  transition: all 0.35s ease;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>