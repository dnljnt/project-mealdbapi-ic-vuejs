<script setup>
import { computed } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  inputValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'update:inputValue'])

// Menghubungkan input teks langsung ke Parent
const currentInput = computed({
  get: () => props.inputValue,
  set: (val) => emit('update:inputValue', val)
})

const suggestions = ['🧅 Onion', '🥚 Egg', '🧄 Garlic', '🍅 Tomato', '🧀 Cheese', '🌾 Rice', '🍗 Chicken']

const addIngredient = () => {
  const val = currentInput.value.trim().replace(/,/g, '')
  if (val && !props.modelValue.includes(val)) {
    emit('update:modelValue', [...props.modelValue, val])
  }
  currentInput.value = ''
}

const removeIngredient = (index) => {
  const newArr = [...props.modelValue]
  newArr.splice(index, 1)
  emit('update:modelValue', newArr)
}

const addSuggestion = (sug) => {
  const cleanName = sug.split(' ')[1] 
  if (!props.modelValue.includes(cleanName)) {
    emit('update:modelValue', [...props.modelValue, cleanName])
  }
}
</script>

<template>
  <div>
    <div class="relative min-h-[80px] rounded-card border-[1.5px] border-border-subtle bg-bg-surface p-4 transition-colors focus-within:border-accent-warm">
      <div class="flex flex-wrap gap-2">
        <TransitionGroup name="tag-spring">
          <div 
            v-for="(item, index) in modelValue" 
            :key="item"
            class="flex items-center gap-2 rounded-tag border border-tag-border bg-tag-bg py-1.5 pl-3 pr-1.5 text-[12px] font-medium text-text-primary shadow-sm"
          >
            {{ item }}
            <button @click="removeIngredient(index)" class="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-accent-warm hover:text-[#0F0D0B]">
              <X class="h-3 w-3" />
            </button>
          </div>
        </TransitionGroup>

        <!-- Input sekarang otomatis update ke Parent -->
        <input
          v-model="currentInput"
          @keydown.enter.prevent="addIngredient"
          @keydown.,.prevent="addIngredient"
          type="text"
          placeholder="Add an ingredient... (e.g. chicken, tomato)"
          class="min-w-[200px] flex-1 bg-transparent py-1 text-[15px] text-text-primary outline-none placeholder:text-text-tertiary"
        />
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button 
        v-for="sug in suggestions" 
        :key="sug"
        @click="addSuggestion(sug)"
        class="rounded-tag border border-dashed border-tag-border bg-bg-elevated px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:border-accent-warm hover:text-text-primary"
      >
        {{ sug }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.tag-spring-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.tag-spring-leave-active {
  transition: all 0.2s ease-in;
  position: absolute;
}
.tag-spring-enter-from,
.tag-spring-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.tag-spring-move {
  transition: transform 0.3s ease;
}
</style>