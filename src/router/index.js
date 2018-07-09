import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/login.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/components/chat.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/components/list.vue')
    },
    {
      path: '/private',
      name: 'private',
      component: () => import('@/components/private.vue')
    }
  ]
})
/* eslint handle-callback-err: "error" */
router.beforeEach((to, from, next) => {
  if (!sessionStorage.username && to.name !== 'login') {
    next({
      replace: true,
      name: 'login'
    })
  } else if (sessionStorage.username && to.name === 'login') {
    next({
      name: 'list'
    })
  } else {
    next()
  }
})
export default router
