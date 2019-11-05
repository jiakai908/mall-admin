import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/login.vue'
import Home from '@/components/views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
