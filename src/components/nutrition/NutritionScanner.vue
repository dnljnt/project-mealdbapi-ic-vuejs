<script setup>
import { Sparkles, Activity } from '@lucide/vue'
import MacroCard from './MacroCard.vue'
import HealthNoteWhisper from './HealthNoteWhisper.vue'

defineProps({
  nutrition: {
    type: Object,
    default: null, 
  },
  loading: { type: Boolean, default: false },
})

defineEmits(['generate'])

const getPercentage = (value, max) => Math.min(Math.round((value / max) * 100), 100)
</script>

<template>
  <div class="overflow-hidden rounded-card border border-border-subtle bg-bg-surface p-6 shadow-xl transition-all duration-500">
    
    <div class="mb-6 flex items-center justify-between border-b border-divider pb-4">
      <div class="flex items-center gap-2">
        <Sparkles :class="['h-4 w-4 text-accent-warm', { 'animate-pulse': loading }]" />
        <div>
          <h3 class="font-display text-[13px] font-bold uppercase tracking-[0.05em] text-accent-warm">
            Nutrition Estimate
          </h3>
          <p class="text-[11px] text-text-tertiary">AI-powered analysis via Gemini</p>
        </div>
      </div>
    </div>

    <div v-if="loading" class="animate-pulse space-y-4">
      <div class="h-20 rounded-nutri bg-bg-elevated"></div>
      <div class="h-20 rounded-nutri bg-bg-elevated"></div>
    </div>

    <div v-else-if="nutrition" class="grid grid-cols-2 gap-3">
      <MacroCard 
        label="Calories" 
        :value="nutrition.calories" 
        unit="kcal" 
        colorType="cal" 
        :percentage="getPercentage(nutrition.calories, 800)" 
      />
      <MacroCard 
        label="Protein" 
        :value="nutrition.protein_g" 
        unit="g" 
        colorType="prot" 
        :percentage="getPercentage(nutrition.protein_g, 100)" 
      />
      <MacroCard 
        label="Carbs" 
        :value="nutrition.carbs_g" 
        unit="g" 
        colorType="carb" 
        :percentage="getPercentage(nutrition.carbs_g, 100)" 
      />
      <MacroCard 
        label="Fat" 
        :value="nutrition.fat_g" 
        unit="g" 
        colorType="fat" 
        :percentage="getPercentage(nutrition.fat_g, 100)" 
      />
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-border-subtle bg-bg-elevated/30 py-8 text-center"
    >
      <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bg-surface text-accent-warm shadow-sm">
        <Activity class="h-5 w-5" />
      </div>

      <p class="mb-5 max-w-[200px] text-[13px] leading-[1.6] text-text-secondary">
        Scan ingredients to reveal estimated macros and calories.
      </p>

      <button
        @click="$emit('generate')"
        class="cursor-pointer flex items-center gap-2 rounded-btn bg-accent-warm px-6 py-2.5 text-[13px] font-bold text-bg-primary transition-all hover:bg-accent-glow hover:shadow-[0_0_15px_rgba(232,164,74,0.3)]"
      >
        <Sparkles class="size-4"/> Scan Nutrition
      </button>
    </div>

    <HealthNoteWhisper 
      v-if="nutrition && !loading" 
      :note="nutrition.health_note" 
    />
    
  </div>
</template>