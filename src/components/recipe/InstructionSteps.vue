<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <h2 class="mb-6 font-display text-[32px] italic text-text-primary">
      How to Make It
    </h2>
    
    <div class="flex flex-col gap-6">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="relative border-b border-divider border-dashed pb-6 pl-14 pt-2 last:border-b-0 sm:pl-16 sm:pt-1"
      >
        <span class="absolute left-0 top-0 font-display text-[48px] font-bold leading-none text-accent-warm/20 sm:text-[56px]">
          {{ index + 1 }}
        </span>
        
        <p class="relative z-10 text-[15px] leading-[1.8] text-text-secondary">
          {{ step }}
        </p>
      </div>
    </div>
  </div>
</template>