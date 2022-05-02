import Vue from 'vue'
//import App from './App.vue'
//import Hello from './components/HelloWorld.vue'
import page from './components/addUser.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(page),
}).$mount('#app')
