<script setup>
import { onMounted, ref, watch } from 'vue'

import SearchBar from '@/components/home/SearchBar.vue'
import RecipeCard from '@/components/recipe/RecipeCard.vue'
import AboutView from './AboutView.vue'
import { useMealDB } from '@/composables/useMealDB'

const search = ref('')

const {
  meals,
  loading,
  error,
  currentPage,
  totalPages,
  paginatedMeals,
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
  // String kosong agar memicu resep acak pada awal buka web
  searchMeals('')
})
</script>

<template>
  <main class="min-h-screen bg-bg-primary font-body text-text-secondary selection:bg-accent-soft selection:text-accent-warm">
    <section class="relative overflow-hidden border-b border-divider">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,164,74,0.06),transparent_50%)]" />

      <div class="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-12 lg:py-32">
        <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-warm/25 bg-accent-soft px-4 py-1.5 shadow-sm">
          <span class="text-[12px] font-medium uppercase tracking-[0.05em] text-accent-warm">
            AI Editorial Kitchen
          </span>
        </div>

        <h1 class="max-w-4xl font-display text-[42px] font-bold leading-[1.1] text-text-primary sm:text-[72px] lg:text-[84px]">
          Discover recipes <br />
          <span class="font-medium italic text-text-secondary">worth craving.</span>
        </h1>

        <p class="mt-6 max-w-xl text-[15px] leading-[1.7] text-text-secondary">
          Explore curated dishes, AI-generated culinary ideas, and nutrition insights — all crafted into one immersive food experience.
        </p>

        <div class="mt-12 w-full max-w-[480px]">
          <SearchBar v-model="search" :loading="loading" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="font-display text-[28px] italic text-text-primary">
            Found {{ meals ? meals.length : 0 }} Recipes
          </h2>
          <p v-if="!search" class="mt-1 text-xs text-text-tertiary">
            ✨ Showing dynamic inspiration picks for today.
          </p>
        </div>
      </div>

      <div v-if="error" class="rounded-[16px] border border-cal-color/20 bg-cal-color/10 p-6 text-[15px] text-cal-color">
        ⚠ {{ error }}
      </div>

      <div v-else-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="n in 8" :key="n" class="overflow-hidden rounded-[16px] border border-border-subtle bg-bg-surface">
          <div class="h-[200px] w-full animate-pulse bg-bg-elevated/80" />
          <div class="space-y-3 p-4">
            <div class="h-3 w-16 animate-pulse rounded-full bg-accent-soft" />
            <div class="h-5 w-4/5 animate-pulse rounded bg-bg-elevated" />
            <div class="mt-4 flex justify-between pt-2">
              <div class="h-4 w-20 animate-pulse rounded bg-bg-elevated" />
              <div class="h-4 w-6 animate-pulse rounded bg-bg-elevated" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!meals || !meals.length" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="text-[64px] leading-none opacity-80">
          🍽️
        </div>
        <h3 class="mt-6 font-display text-[28px] italic text-text-primary">
          Nothing found yet.
        </h3>
        <p class="mt-3 max-w-md text-[15px] leading-[1.7] text-text-secondary">
          Try searching for "Pasta", "Chicken", or "Seafood".
        </p>
      </div>

      <div v-else class="space-y-12">
        <Transition name="page-fade" mode="out-in">
          <div 
            :key="currentPage" 
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <RecipeCard
              v-for="(recipe, index) in paginatedMeals"
              :key="recipe.idMeal"
              :recipe="recipe"
              class="animate-stagger-in"
              :style="{ animationDelay: `${index * 60}ms` }"
            />
          </div>
        </Transition>

        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-6">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="flex h-10 items-center justify-center rounded-[10px] border border-border-subtle bg-bg-surface px-4 text-[14px] font-medium text-text-secondary transition-all hover:border-accent-warm hover:text-text-primary disabled:opacity-30 disabled:hover:border-border-subtle disabled:hover:text-text-secondary"
          >
            Prev
          </button>
          
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'flex h-10 w-10 items-center justify-center rounded-[10px] font-mono text-[14px] font-bold transition-all',
              currentPage === page 
                ? 'bg-accent-warm text-[#0F0D0B]' 
                : 'border border-border-subtle bg-bg-surface text-text-secondary hover:border-accent-warm hover:text-text-primary'
            ]"
          >
            {{ page }}
          </button>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            class="flex h-10 items-center justify-center rounded-[10px] border border-border-subtle bg-bg-surface px-4 text-[14px] font-medium text-text-secondary transition-all hover:border-accent-warm hover:text-text-primary disabled:opacity-30 disabled:hover:border-border-subtle disabled:hover:text-text-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </section>
    <AboutView/>
  </main>
</template>

<style scoped>
/* 1. Transisi halaman keseluruhan (Grid lama memudar, grid baru masuk) 
*/
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 2. Animasi individual kartu agar efek stagger / gelombang tetap terjadi mulus
*/
.animate-stagger-in {
  opacity: 0; 
  animation: staggerIn 0.5s ease-out forwards;
}

@keyframes staggerIn {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>