import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from './views/CheckLogin.vue'
import AddUser from './views/addUser.vue'
import AsyncAwait from './views/AsyncAwait.vue'

Vue.use(VueRouter)

const routes = [/*{
  path: '/',
  name: 'Home',
  component: Home
},*/
{
  path: '/add',
  name: 'AddUser',
  component: AddUser
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