import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexVue from './pages/tasks/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: () => import("src/layouts/default.vue"),
    children: [
    {
      path: '/',
      name: 'tasks',
      component: IndexVue
    },
    {
      path: '/tasks/:id',
      name: 'details',
      component: () => import('src/pages/tasks/Detail.vue')
    }]}]
})
export default router
