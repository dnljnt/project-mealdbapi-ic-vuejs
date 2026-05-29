import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/recipe/:id',
    name: 'recipe-detail',
    component: () => import('../views/RecipeDetailView.vue'),
  },
  {
    path: '/leftover-snapshot',
    name: 'leftover',
    component: () => import('../views/LeftoverSnapshotView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
