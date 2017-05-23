import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
      axios.defaults.headers.common['user-id'] = JSON.stringify(state.userId).trim()
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
