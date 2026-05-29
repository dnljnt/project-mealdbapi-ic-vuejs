<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  unit: { type: String, required: true },
  colorType: { type: String, required: true }, // 'cal', 'prot', 'carb', 'fat'
  percentage: { type: Number, default: 0 }
})

// Pemetaan kelas agar Tailwind CSS v4 dapat memindainya dengan benar
const colorMap = {
  cal: { bg: 'bg-cal', text: 'text-cal' },
  prot: { bg: 'bg-prot', text: 'text-prot' },
  carb: { bg: 'bg-carb', text: 'text-carb' },
  fat: { bg: 'bg-fat', text: 'text-fat' }
}

const theme = computed(() => colorMap[props.colorType])
</script>

<template>
  <div class="rounded-nutri bg-bg-elevated p-4">
    <div class="mb-2 flex items-center gap-2">
      <div :class="['h-2 w-2 rounded-tag', theme.bg]"></div>
      <span class="text-[12px] font-medium text-text-secondary">{{ label }}</span>
    </div>

    <div class="flex items-baseline gap-1">
      <span :class="['font-mono text-[28px] font-bold', theme.text]">{{ value }}</span>
      <span class="text-[14px] text-text-tertiary">{{ unit }}</span>
    </div>

    <div class="mt-3 h-[3px] w-full overflow-hidden rounded-tag bg-divider">
      <div
        :style="{ width: `${percentage}%` }"
        :class="['h-full rounded-tag transition-all duration-1000 ease-out', theme.bg]"
      ></div>
    </div>
  </div>
</template>