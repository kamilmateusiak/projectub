import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    user: {}
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    authenticate (state, payload) {
      state.user = payload
      state.authenticated = true
    },
    logout (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('_id')
      state.user = {}
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
