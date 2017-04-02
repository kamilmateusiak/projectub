import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueFire)
Vue.use(VueRouter)

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
