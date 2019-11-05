import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/login'
import Home from '@/components/views/home'
import User from '@/components/views/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'user',
        path: '/user',
        component: User
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }

  ]
})
