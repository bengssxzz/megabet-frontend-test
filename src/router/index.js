import { createRouter, createWebHistory } from 'vue-router'

import RegisterNumber from '@/pages/RegisterNumber.vue'
import CredentialPage from '@/pages/CredentialPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterNumber,
    },
    {
      path: '/set-credential',
      name: 'credentials',
      component: CredentialPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
  ],
})

export default router
