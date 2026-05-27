<script setup>
import { ArrowUpRight, Clock3 } from '@lucide/vue'
</script>

<template>
  <RouterLink :to="`/recipe/${recipe.idMeal}`" class="group block">
    <article
      class="overflow-hidden rounded-[28px] border border-white/5 bg-[#171411] transition-all duration-500 hover:-translate-y-2 hover:border-accent-warm/20 hover:shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
    >
      <!-- IMAGE -->
      <div class="relative overflow-hidden">
        <img
          :src="recipe.strMealThumb"
          :alt="recipe.strMeal"
          class="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <!-- overlays -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <!-- top badge -->
        <div
          class="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl"
        >
          <span class="text-[10px] uppercase tracking-[0.18em] text-white/80">
            {{ recipe.strCategory }}
          </span>
        </div>

        <!-- floating action -->
        <div
          class="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-300 group-hover:border-accent-warm/30 group-hover:bg-accent-soft"
        >
          <ArrowUpRight
            class="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent-warm"
          />
        </div>

        <!-- bottom content -->
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-xl">
              <span class="text-xs text-white/80"> 🌍 {{ recipe.strArea }} </span>
            </div>

            <div class="rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-xl">
              <span class="flex items-center gap-1 text-xs text-white/80">
                <Clock3 class="h-3 w-3" />

                30 mins
              </span>
            </div>
          </div>

          <h3 class="line-clamp-2 font-display text-3xl italic leading-tight text-white">
            {{ recipe.strMeal }}
          </h3>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script>
export default {
  props: {
    recipe: Object,
  },
}
</script>