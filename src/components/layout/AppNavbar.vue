<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { ChefHat, Menu, X } from '@lucide/vue'

const route = useRoute()

const mobileMenu = ref(false)

const navItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Leftover Snapshot',
    path: '/leftover-snapshot',
  },
]

const isActive = (path) => route.path === path
</script>

<template>
  <header
    class="sticky top-0 z-[100] h-16 border-b border-white/5 bg-bg-primary/75 backdrop-blur-[20px]"
  >
    <div class="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-12">
      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-3">
        <!-- Icon -->
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-accent-warm/20"
        >
          <ChefHat class="h-4 w-4 text-accent-warm" :stroke-width="1.8" />
        </div>

        <!-- Logo Text -->
        <div class="leading-none">
          <span class="font-display text-[30px] italic tracking-[-0.03em]">
            <span class="font-light text-text-secondary"> AI </span>

            <span class="font-bold text-accent-warm"> Chef </span>
          </span>
        </div>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="group relative px-4 py-2 text-[14px] font-medium tracking-[0.02em] text-text-secondary transition-all duration-300 hover:text-text-primary"
        >
          {{ item.name }}

          <!-- Active Indicator -->
          <span
            class="absolute bottom-[2px] left-4 h-px rounded-full bg-accent-warm/90 transition-all duration-300"
            :class="
              isActive(item.path)
                ? 'w-[calc(100%-32px)] opacity-100'
                : 'w-0 opacity-0 group-hover:w-[calc(100%-32px)] group-hover:opacity-100'
            "
          />
        </RouterLink>
      </nav>

      <!-- Mobile Toggle -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-text-primary transition-all duration-300 hover:border-accent-warm/20 hover:text-accent-warm md:hidden"
        @click="mobileMenu = !mobileMenu"
      >
        <Menu v-if="!mobileMenu" class="h-5 w-5" />

        <X v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenu"
        class="border-t border-white/5 bg-bg-surface/95 backdrop-blur-[20px] md:hidden"
      >
        <nav class="flex flex-col px-6 py-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="rounded-xl px-4 py-4 text-sm font-medium tracking-[0.02em] text-text-secondary transition-all duration-300 hover:bg-bg-elevated hover:text-text-primary"
            @click="mobileMenu = false"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
