<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen bg-bg-primary text-text-primary antialiased">
    <!-- Global Background Accent -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-accent-soft blur-3xl"/>

      <div class="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-accent-soft blur-3xl"/>
    </div>

    <!-- Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main class="relative z-10">
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-1 opacity-0"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>