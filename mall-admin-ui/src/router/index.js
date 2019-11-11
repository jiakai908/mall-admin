import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/login'
import Home from '@/components/views/home'
import User from '@/components/views/user/user'
import Right from '@/components/views/roles/right'
import Role from '@/components/views/roles/role'
import GoodList from '@/components/views/goods/goodlist'
import GoodAdd from '@/components/views/goods/goodadd'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user',
          path: '/users',
          component: User
        },
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        {
          name: 'role',
          path: '/roles',
          component: Role
        },
        {
          name: 'goodlist',
          path: '/goods',
          component: GoodList
        },
        {
          name: 'goodadd',
          path: '/goodadd',
          component: GoodAdd
        },
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push({'name': 'login'})
      Message.warning('请先登录')
    }
    next()
  }
})

export default router
