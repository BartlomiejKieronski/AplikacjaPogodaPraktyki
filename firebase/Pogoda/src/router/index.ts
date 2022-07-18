import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'
import register from '../views/Register.vue'
import pogoda from '../views/Pogoda.vue'
import read from '../views/Read.vue'
import Chart from '../views/Chart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Register',
      name: 'register',
      component: register
    },
    {
      path:'/Pogoda',
      name:'pogoda',
      component: pogoda
    },
    {
      path:'/Read',
      name:'read',
      component: read
    },
    {
      path:'/Chart/:id',
      name:'Chart',
      component: Chart,
      props: true
    },
    
  ]
  
})

export default router
