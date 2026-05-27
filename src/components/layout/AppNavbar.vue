<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import {
  ChefHat,
  Search,
  Sparkles,
  Menu,
  X,
} from '@lucide/vue'

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
    class="sticky top-0 z-50 border-b border-divider bg-bg-primary/70 backdrop-blur-2xl"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="group flex items-center gap-3"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full border border-accent-warm/20 bg-accent-soft transition-all duration-300 group-hover:scale-105 group-hover:border-accent-warm/40"
        >
          <ChefHat
            class="h-5 w-5 text-accent-warm"
            :stroke-width="1.8"
          />
        </div>

        <div class="leading-none">
          <span
            class="font-display text-2xl italic tracking-tight"
          >
            <span class="font-light text-text-secondary">
              AI
            </span>

            <span class="font-bold text-accent-warm">
              Chef
            </span>
          </span>
        </div>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-10 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="group relative text-sm font-medium tracking-wide text-text-secondary transition-colors duration-200 hover:text-text-primary"
        >
          {{ item.name }}

          <!-- Active Underline -->
          <span
            class="absolute -bottom-5.25 left-0 h-0.5 bg-accent-warm transition-all duration-300"
            :class="
              isActive(item.path)
                ? 'w-full opacity-100'
                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
            "
          />
        </RouterLink>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden items-center gap-3 md:flex">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-glass text-text-secondary transition-all duration-200 hover:border-accent-warm/30 hover:bg-accent-soft hover:text-accent-warm"
        >
          <Search class="h-4 w-4" />
        </button>

        <button
          class="flex items-center gap-2 rounded-btn bg-accent-warm px-5 py-2.5 text-sm font-semibold tracking-wide text-bg-primary transition-all duration-200 hover:scale-[1.02] hover:bg-accent-glow"
        >
          <Sparkles class="h-4 w-4" />

          <span>Explore</span>
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-glass text-text-primary md:hidden"
        @click="mobileMenu = !mobileMenu"
      >
        <Menu
          v-if="!mobileMenu"
          class="h-5 w-5"
        />

        <X
          v-else
          class="h-5 w-5"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
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
        class="border-t border-divider bg-bg-surface/95 backdrop-blur-2xl md:hidden"
      >
        <nav class="flex flex-col p-5">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="rounded-xl px-4 py-4 text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-bg-elevated hover:text-text-primary"
            @click="mobileMenu = false"
          >
            {{ item.name }}
          </RouterLink>

          <button
            class="mt-4 flex items-center justify-center gap-2 rounded-btn bg-accent-warm px-5 py-3 text-sm font-semibold text-bg-primary"
          >
            <Sparkles class="h-4 w-4" />

            <span>Explore Recipes</span>
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>