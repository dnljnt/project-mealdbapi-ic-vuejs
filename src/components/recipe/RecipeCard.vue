<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink 
    :to="`/recipe/${recipe.idMeal}`" 
    class="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary"
  >
    <!-- 
      OUTER FRAME (SaaS / Bento-box aesthetic) 
      Menggunakan p-1.5 untuk menciptakan bingkai dalam yang sangat modern 
    -->
    <article
      class="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-bg-primary p-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:border-accent-warm/40 hover:bg-bg-surface hover:shadow-[0_20px_40px_-12px_rgba(232,164,74,0.15)]"
    >
      <!-- INNER WRAPPER -->
      <div class="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-bg-surface">
        
        <!-- IMAGE CONTAINER -->
        <div class="relative h-[220px] w-full overflow-hidden bg-bg-elevated">
          <img
            :src="recipe.strMealThumb"
            :alt="recipe.strMeal"
            class="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            loading="lazy"
          />
          
          <!-- Smooth Vignette -->
          <div class="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

          <!-- Floating Badge (Editorial Pill) -->
          <div
            class="absolute bottom-3 left-3 flex items-center rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md transition-colors duration-500 group-hover:bg-black/60"
          >
            <span class="text-[11px] font-medium tracking-[0.05em] text-text-primary">
              🌍 {{ recipe.strArea }}
            </span>
          </div>
        </div>

        <!-- CONTENT AREA -->
        <div class="flex flex-1 flex-col p-5">
          <!-- Category with Accent Dot -->
          <div class="mb-3 flex items-center gap-2">
            <div class="h-1.5 w-1.5 rounded-full bg-accent-warm transition-transform duration-500 group-hover:scale-150"></div>
            <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-warm">
              {{ recipe.strCategory }}
            </span>
          </div>

          <!-- Dish Name (Menggunakan font-display agar terasa seperti majalah) -->
          <h3 class="line-clamp-2 font-display text-[20px] leading-[1.35] text-text-primary transition-colors duration-300 group-hover:text-accent-glow">
            {{ recipe.strMeal }}
          </h3>

          <div class="mt-auto pt-6"></div>

          <!-- FOOTER ACTION ROW -->
          <div class="mt-2 flex items-center justify-between border-t border-divider/50 pt-4">
            <span class="font-mono text-[12px] uppercase tracking-wider text-text-tertiary transition-colors duration-300 group-hover:text-text-primary">
              Explore Dish
            </span>
            
            <!-- Animated Icon Button (Berputar menjadi ArrowUpRight saat di-hover) -->
            <div class="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-accent-warm group-hover:bg-accent-warm group-hover:text-[#0F0D0B] group-hover:shadow-[0_0_15px_rgba(232,164,74,0.4)]">
              <ArrowRight
                class="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-rotate-45"
              />
            </div>
          </div>
        </div>
        
      </div>
    </article>
  </RouterLink>
</template>