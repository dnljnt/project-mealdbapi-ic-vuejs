<script setup>
import { Code, Sparkles, Layout,  PenTool, Camera } from '@lucide/vue'
</script>

<template>
  <main class="min-h-screen bg-bg-primary pb-32 pt-24 font-body text-text-secondary selection:bg-accent-soft selection:text-accent-warm">
    
    <!-- HEADER / HERO SECTION -->
    <header class="mx-auto max-w-5xl px-6 text-center lg:px-12">
      <div class="mb-8 inline-flex items-center gap-2 rounded-tag border border-accent-warm/25 bg-accent-soft px-4 py-1.5 shadow-sm">
        <Sparkles class="h-3.5 w-3.5 text-accent-warm" />
        <span class="text-[12px] font-bold uppercase tracking-[0.15em] text-accent-warm">
          Behind the Kitchen
        </span>
      </div>
      
      <h1 class="font-display text-[48px] font-bold leading-[1.05] text-text-primary sm:text-[64px] lg:text-[84px]">
        Bridging complex code <br />
        <span class="font-medium italic text-text-secondary">with minimalist design.</span>
      </h1>
      
      <p class="mx-auto mt-8 max-w-2xl text-[16px] leading-[1.8] text-text-tertiary">
        AI Chef Companion is an experimental digital publication designed to push the boundaries of how we discover, create, and analyze the food we eat every day through a premium interface.
      </p>
    </header>

    <!-- CONTENT SECTION (Modern Bento Grid) -->
    <section class="mx-auto mt-24 max-w-7xl px-6 lg:px-12">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-12">
        
        <!-- THE CREATOR (Wide Panel) -->
        <div class="group relative overflow-hidden rounded-[24px] border border-border-subtle bg-bg-surface p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-accent-warm/40 hover:shadow-[0_20px_40px_-12px_rgba(232,164,74,0.12)] md:col-span-12 lg:col-span-8 lg:p-12">
          <div class="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent-soft blur-[100px] transition-opacity duration-500 group-hover:opacity-80"></div>
          
          <div class="relative z-10">
            <h2 class="font-display text-[32px] italic text-text-primary sm:text-[42px]">
              Meet the Architect
            </h2>
            <div class="mt-6 flex flex-col gap-5 text-[15px] leading-[1.8] text-text-secondary">
              <p>
                This platform was engineered and designed by <strong class="font-bold text-text-primary">Daniel</strong>, an Informatics student who enjoys building modern frontend experiences and is always happy to learn new things.
              </p>
              <p>
                Driven by a deep appreciation for premium, SaaS-style digital experiences, the goal was to create an interface that feels less like a standard recipe directory and more like a high-end culinary magazine. Every interaction is measured, ensuring the technology serves the aesthetic just as much as the function.
              </p>
            </div>
          </div>
        </div>

        <!-- VISUAL COMPOSITION (Square Panel) -->
        <div class="group rounded-[24px] border border-border-subtle bg-bg-elevated/40 p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-accent-warm/40 hover:bg-bg-surface md:col-span-6 lg:col-span-4">
          <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-bg-surface text-accent-warm transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-soft">
            <Camera class="h-5 w-5" />
          </div>
          <h3 class="font-display text-[26px] text-text-primary">Analog Precision</h3>
          <p class="mt-4 text-[14px] leading-[1.7] text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
            A sharp eye for detail doesn't stop at the screen. The tactile precision of shooting with manual Fujifilm mirrorless lenses heavily influences the platform's focus on raw, authentic aesthetics and meticulous visual composition.
          </p>
        </div>

        <!-- DESIGN LANGUAGE (Square Panel) -->
        <div class="group rounded-[24px] border border-border-subtle bg-bg-elevated/40 p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-accent-warm/40 hover:bg-bg-surface md:col-span-6 lg:col-span-4">
          <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-bg-surface text-accent-warm transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-soft">
            <PenTool class="h-5 w-5" />
          </div>
          <h3 class="font-display text-[26px] text-text-primary">Motion & Aesthetic</h3>
          <p class="mt-4 text-[14px] leading-[1.7] text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
            Rooted in the "Editorial Dark Kitchen" aesthetic with earthy color palettes. The interface leverages smooth, physics-based motion principles to ensure every hover and page transition feels heavy, intentional, and polished.
          </p>
        </div>

        <!-- TECH STACK (Wide Bottom Panel) -->
        <div class="group flex flex-col justify-between rounded-[24px] border border-border-subtle bg-bg-surface p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:border-accent-warm/40 md:col-span-12 lg:col-span-8 lg:flex-row lg:items-center lg:p-10">
          <div class="max-w-md">
            <h3 class="font-display text-[26px] text-text-primary">Modern Architecture</h3>
            <p class="mt-3 text-[14px] leading-[1.7] text-text-tertiary transition-colors duration-300 group-hover:text-text-secondary">
              Built on a robust stack utilizing Vue 3, Vite, and Tailwind CSS v4. Intelligent features are powered by seamless integration with Google's Gemini 2.5 generative AI.
            </p>
          </div>
          <div class="mt-8 flex gap-4 lg:mt-0">
            <div class="flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors duration-300 group-hover:border-accent-warm group-hover:text-accent-warm">
              <Code class="h-6 w-6" />
            </div>
            <div class="flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors duration-300 group-hover:border-accent-warm group-hover:text-accent-warm">
              <Layout class="h-6 w-6" />
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CALL TO ACTION (Floating Bar Style) -->
    <section class="mx-auto mt-24 max-w-4xl px-6 text-center">
      <div class="flex flex-col items-center justify-between gap-8 rounded-[24px] border border-border-subtle bg-bg-surface p-10 sm:flex-row sm:p-12">
        <div class="text-left">
          <h2 class="font-display text-[32px] italic text-text-primary">Ready to plate?</h2>
          <p class="mt-2 text-[15px] text-text-tertiary">Experience the AI culinary workflow.</p>
        </div>
        <RouterLink 
          to="/"
          class="flex h-14 items-center justify-center rounded-btn bg-text-primary px-8 text-[14px] font-bold tracking-[0.05em] text-bg-primary transition-all duration-300 ease-out hover:bg-accent-warm hover:shadow-[0_0_20px_rgba(232,164,74,0.3)]"
        >
          Explore Catalogue
        </RouterLink>
      </div>
    </section>

  </main>
</template>