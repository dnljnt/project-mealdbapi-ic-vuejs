<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { Sparkles, LoaderCircle } from '@lucide/vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  retryMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const loadingMessages = [
  'Consulting our AI Chef...',
  'Mixing the flavors...',
  'Taste-testing the algorithm...',
  'Almost ready to plate...',
]

const currentMessage = ref(loadingMessages[0])

let interval = null

watch(
  () => props.loading,
  (isLoading) => {
    clearInterval(interval)

    if (isLoading) {
      let index = 0

      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length

        currentMessage.value = loadingMessages[index]
      }, 2000)
    } else {
      currentMessage.value = loadingMessages[0]
    }
  },
)

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <button
    @click="emit('click')"
    :disabled="disabled || loading"
    class="relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-btn text-[15px] font-bold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
    :class="
      retryMessage
        ? 'border border-accent-warm bg-bg-elevated text-accent-warm'
        : 'bg-accent-warm text-bg-primary hover:bg-accent-glow hover:shadow-[0_0_24px_rgba(232,164,74,0.28)]'
    "
  >
    <!-- Loading Overlay -->
    <div v-if="loading && !retryMessage" class="absolute inset-0 animate-pulse bg-white/10" />

    <!-- Icon -->
    <LoaderCircle v-if="loading" class="relative z-10 h-4 w-4 animate-spin" />

    <Sparkles v-else class="relative z-10 h-4 w-4" />

    <!-- Text -->
    <span class="relative z-10">
      {{ retryMessage ? retryMessage : loading ? currentMessage : 'Generate My Recipe' }}
    </span>
  </button>
</template>