import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
