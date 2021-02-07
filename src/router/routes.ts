import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  //* MAIN ROUTES
  {
    path: '/',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/play',
    component: () => import('pages/Play.vue')
  },
  {
    path: '/tryouts',
    component: () => import('pages/Tryouts.vue')
  },

  //* ERROR 404 PAGE
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
