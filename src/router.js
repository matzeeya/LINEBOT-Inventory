import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Regiter from './views/Default/UserRegister.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/register',
  name: 'Regiter',
  component: Regiter
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router