import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  chatlist: []
}
const mutations = {
  setChatList (state, data) {
    state.chatlist.push(data)
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
