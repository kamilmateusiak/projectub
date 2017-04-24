import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import axios from 'axios'

Vue.use(VueRouter)

axios.defaults.baseURL = 'http://localhost:3000/api'
Vue.prototype.$http = axios

const router = new VueRouter({
  routes,
  mode: 'history'
})

export const eventBus = new Vue({})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
})
