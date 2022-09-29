import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import City from '../components/City.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Mayana"
      }
    },
    {
      path: '/weather/:state/:city',
      name: 'city',
      component: City,
      meta: {
        title: "Weather"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${ to.params.state 
    ? `${to.params.city}, ${to.params.state}` 
    : to.meta.title} Local Weather`;
  next();
})

export default router
