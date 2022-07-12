import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/CheckLogin.vue'
import Regiter from './components/Default/UserRegister.vue'
import AsyncAwait from './views/AsyncAwait.vue'

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
},
{
  path: '/async',
  name: 'AsyncAwait',
  component: AsyncAwait
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router