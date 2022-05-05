import Vue from 'vue'
//import App from './App.vue'
//import router from './router'
//import Hello from './components/HelloWorld.vue'
import page from './views/addUser.vue'

Vue.prototype.$liff = window.liff
Vue.config.productionTip = false

new Vue({
  //router,
  render: h => h(page),
}).$mount('#app')
