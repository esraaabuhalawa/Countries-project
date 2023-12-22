import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import ErrorPage from '../views/ErrorPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/countrypage/:id',
      name: 'country',
      component: CountryView
    },
    {
      path: '/:catchAll(.*)',
      name: 'errorpage',
      component: ErrorPage
    }
  ]
})

export default router
