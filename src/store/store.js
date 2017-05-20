import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    userId: null
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    },
    user (state) {
      return state.userId
    }
  },
  mutations: {
    authenticate (state, payload) {
      state.userId = payload
      state.authenticated = true
    },
    logout (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('_id')
      state.userId = null
      state.authenticated = false
    }
  },
  actions: {
    authenticate ({ commit }, payload) {
      commit('authenticate', payload)
    },
    logout ({ commit }) {
      commit('logout')
    }
  }
})
