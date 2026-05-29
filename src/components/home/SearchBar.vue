<script setup>
import { computed } from 'vue'
import { Search, X } from '@lucide/vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'clear'])

const hasValue = computed(() => props.modelValue.length > 0)

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const clearInput = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="w-full">
    <div
      class="group relative overflow-hidden rounded-[10px] border border-border-subtle bg-bg-elevated transition-colors duration-200 focus-within:border-accent-warm"
    >
      <div v-if="loading" class="absolute left-0 top-0 h-[2px] w-full overflow-hidden">
        <div class="animate-loading-bar h-full w-1/3 bg-accent-warm" />
      </div>

      <div class="flex h-12 items-center gap-3 px-4">
        <Search
          class="h-4 w-4 text-text-tertiary transition-colors group-focus-within:text-accent-warm"
        />

        <input
          :value="modelValue"
          type="text"
          placeholder="Search recipes... Chicken, Pasta, Tacos"
          class="flex-1 bg-transparent text-[15px] text-text-primary outline-none placeholder:text-text-tertiary"
          @input="updateValue"
        />

        <button
          v-if="hasValue"
          @click="clearInput"
          class="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-bg-surface"
        >
          <X class="h-3.5 w-3.5 text-text-secondary" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading-bar {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(300%);
  }
}
.animate-loading-bar {
  animation: loading-bar 1.2s infinite ease-in-out;
}
</style>