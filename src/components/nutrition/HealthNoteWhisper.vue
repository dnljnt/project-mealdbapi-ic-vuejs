<script setup>
defineProps({
  note: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="mt-5 rounded-r-btn border-l-[3px] border-accent-warm bg-accent-soft px-4 py-3">
    <p class="text-[14px] italic leading-[1.6] text-text-secondary">
      "{{ note }}"
    </p>
  </div>
</template>