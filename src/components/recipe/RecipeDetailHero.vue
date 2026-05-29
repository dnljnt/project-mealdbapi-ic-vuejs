<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft, Play } from '@lucide/vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const openYoutube = () => {
  if (props.recipe?.strYoutube) {
    window.open(props.recipe.strYoutube, '_blank')
  }
}
</script>

<template>
  <section class="relative h-100 w-full overflow-hidden sm:h-120">
    <img 
      :src="recipe.strMealThumb" 
      :alt="recipe.strMeal" 
      class="absolute inset-0 h-full w-full object-cover"
    />
    
    <div class="absolute inset-0 bg-bg-primary/55"></div>
    
    <div class="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/40 to-transparent"></div>
    
    <button 
      @click="router.back()"
      class="cursor-pointer absolute left-6 top-8 z-10 flex items-center gap-2 rounded-tag border border-border-subtle bg-bg-elevated/40 px-4 py-2 text-[14px] font-medium text-text-primary backdrop-blur-md transition-all hover:bg-bg-elevated/80 hover:text-accent-warm lg:left-12"
    >
      <ArrowLeft class="h-4 w-4" />
      Back
    </button>

    <div class="absolute bottom-0 left-0 w-full px-6 pb-12 lg:px-12 lg:pb-16">
      <div class="mx-auto max-w-7xl">
        <nav class="mb-4 text-[12px] font-medium uppercase tracking-wider text-text-secondary">
          <span class="cursor-pointer transition-colors hover:text-text-primary" @click="router.push('/')">Home</span>
          <span class="mx-2 text-text-tertiary">›</span>
          <span class="text-accent-warm">{{ recipe.strCategory }}</span>
        </nav>

        <h1 class="line-clamp-2 max-w-4xl font-display text-[42px] font-bold text-text-primary sm:text-[56px] lg:text-[64px]">
          {{ recipe.strMeal }}
        </h1>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <div class="rounded-tag border border-border-subtle bg-bg-elevated px-4 py-1.5">
            <span class="text-[13px] font-medium text-text-primary">🌍 {{ recipe.strArea }}</span>
          </div>
          <div class="rounded-tag border border-border-subtle bg-bg-elevated px-4 py-1.5">
            <span class="text-[13px] font-medium text-text-primary">🍽️ {{ recipe.strCategory }}</span>
          </div>
          
          <button 
            v-if="recipe.strYoutube" 
            @click="openYoutube"
            class="flex items-center gap-2 rounded-tag border border-cal/30 bg-cal/10 px-4 py-1.5  cursor-pointer transition-colors hover:bg-cal/20"
          >
            <Play class="h-4 w-4 text-cal" />
            <span class="text-[13px] font-medium text-cal">Watch Tutorial</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>