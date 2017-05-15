import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {
    authenticated (state) {
      return state.authenticated
    }
  },
  mutations: {
    authenticate (state) {
      state.authenticated = true
    },
    logout (state) {
      localStorage.removeItem('token')
      state.authenticated = false
    }
  },
  actions: {
    authenticate ({ commit }) {
      commit('authenticate')
    },
    logout ({ commit }) {
      commit('logout')
    }
  }
})
