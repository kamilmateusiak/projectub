import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import axios from 'axios'
import { store } from './store/store'

Vue.use(VueRouter)
Vue.use(Vuetify)

axios.defaults.baseURL = 'http://localhost:3000/api'
// axios.defaults.baseURL = 'https://lm-project-hub.herokuapp.com/api'
Vue.prototype.$http = axios

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.name !== 'login' && to.name !== 'register' && token === null) {
    next('/login')
  } else {
    next()
  }
})

export const eventBus = new Vue({})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
