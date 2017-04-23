import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000/api'

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
