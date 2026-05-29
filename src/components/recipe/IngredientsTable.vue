<script setup>
defineProps({
  ingredients: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="mb-16">
    <h2 class="mb-6 font-display text-[32px] italic text-text-primary">
      Ingredients
    </h2>
    
    <ul class="flex flex-col border-t border-divider">
      <li 
        v-for="(item, index) in ingredients" 
        :key="item.id"
        class="group flex items-center justify-between border-b border-divider border-l-[3px] border-l-transparent px-4 py-3 transition-colors duration-200 hover:border-l-accent-warm hover:bg-bg-elevated"
        :class="{ 'bg-bg-surface/30': index % 2 === 0 }"
      >
        <div class="flex items-center gap-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-tag bg-bg-elevated p-1.5">
            <img :src="item.thumb" :alt="item.name" class="h-full w-full object-contain drop-shadow-md" loading="lazy" />
          </div>
          <span class="text-[15px] font-medium capitalize text-text-primary transition-colors group-hover:text-accent-glow">
            {{ item.name }}
          </span>
        </div>
        <span class="font-mono text-[14px] font-medium text-accent-warm text-right">
          {{ item.measure }}
        </span>
      </li>
    </ul>
  </div>
</template>