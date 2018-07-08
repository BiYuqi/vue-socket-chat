// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import io from 'socket.io-client'
import '../static/js/rem.js'

Vue.config.productionTip = false
Vue.prototype.socket = io('ws://localhost:9786')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
