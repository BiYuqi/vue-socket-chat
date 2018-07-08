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
    }
  ]
})
/* eslint handle-callback-err: "error" */
router.beforeEach((to, from, next) => {
  if (!localStorage.username && to.name !== 'login') {
    next({
      replace: true,
      name: 'login'
    })
  } else if (localStorage.username && to.name === 'login') {
    next({
      name: 'list'
    })
  } else {
    next()
  }
})
export default router
