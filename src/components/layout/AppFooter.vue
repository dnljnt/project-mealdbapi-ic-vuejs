<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-divider bg-bg-primary pt-16 pb-8 font-body">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div
        class="flex flex-col items-start justify-between gap-10 border-b border-divider pb-12 lg:flex-row lg:items-center"
      >
        <div class="max-w-md">
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-tag border border-accent-warm/25 bg-accent-soft px-3 py-1"
          >
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-warm">
              Join the kitchen
            </span>
          </div>
          <h2 class="font-display text-[32px] font-bold leading-tight text-text-primary">
            Master your meals <br />
            <span class="italic text-text-secondary">with AI precision.</span>
          </h2>
        </div>

        <div
          class="flex w-full max-w-sm items-center gap-2 rounded-btn border border-border-subtle bg-bg-elevated p-1.5 transition-colors focus-within:border-accent-warm/50"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            class="w-full bg-transparent px-4 py-2 text-[14px] text-text-primary outline-none placeholder:text-text-tertiary"
          />
          <button
            class="rounded-[8px] bg-text-primary px-5 py-2 text-[13px] font-bold text-bg-primary transition-all hover:bg-accent-warm hover:shadow-[0_0_15px_rgba(232,164,74,0.3)]"
          >
            Subscribe
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
        <div class="md:col-span-2">
          <RouterLink to="/" class="inline-block transition-opacity hover:opacity-80">
            <span class="font-display italic text-[20px] font-light text-text-secondary">AI</span>
            <span class="font-display text-[22px] font-bold italic text-accent-warm">Chef</span>
          </RouterLink>
          <p class="mt-4 max-w-sm text-[14px] leading-[1.7] text-text-tertiary">
            Your intelligent culinary companion. Discover curated recipes, utilize leftover
            ingredients, and track nutrition instantly.
          </p>
        </div>

        <div>
          <h3 class="mb-5 text-[12px] font-bold uppercase tracking-[0.15em] text-text-primary">
            Platform
          </h3>
          <ul class="flex flex-col gap-3 text-[14px] text-text-secondary">
            <li>
              <RouterLink to="/" class="transition-colors hover:text-accent-warm"
                >Recipe Catalogue</RouterLink
              >
            </li>
            <li>
              <RouterLink to="#" class="transition-colors hover:text-accent-warm"
                >Leftover Snapshot</RouterLink
              >
            </li>
            <li>
              <RouterLink to="#" class="transition-colors hover:text-accent-warm"
                >Nutrition Analysis</RouterLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-5 text-[12px] font-bold uppercase tracking-[0.15em] text-text-primary">
            Connect
          </h3>
          <ul class="flex flex-col gap-3 text-[14px] text-text-secondary">
            <li><a href="#" class="transition-colors hover:text-accent-warm">About Project</a></li>
            <li><a href="#" class="transition-colors hover:text-accent-warm">Developer API</a></li>
            <li><a href="#" class="transition-colors hover:text-accent-warm">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row">
        <p class="text-[12px] text-text-tertiary">
          &copy; {{ new Date().getFullYear() }} AI Chef Companion. Crafted with Vue 3 & TailwindCSS.
        </p>

        <div class="flex items-center gap-5 text-text-tertiary">
          <a href="#" class="transition-colors hover:text-accent-warm"
            ><Twitter class="h-4 w-4"
          /></a>
          <a href="#" class="transition-colors hover:text-accent-warm"
            ><Instagram class="h-4 w-4"
          /></a>
          <a href="#" class="transition-colors hover:text-accent-warm"
            ><Github class="h-4 w-4"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>
