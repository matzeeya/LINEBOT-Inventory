<template>
  <div id="app">
    <h3 class="title">Check User Login</h3>
    <h2 class="subtitle" v-if="userProfile">สวัสดีคุณ {{ userProfile.displayName }} 😀</h2>
    <h3 class="subtitle" v-else>สวัสดีค่ะ 😀</h3>
  </div>
</template>
<script>
  import firebase from "../../backend/database/firebase"
  const userRegister = firebase.collection("userRegister")
  export default {
    name: 'App',
    data () {
      return {
        userProfile: null
      }
    },
    created() {
      userRegister.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data()){
            console.log(doc.id)
            console.log(doc.data().account)
          }
        })
      })
    }
  }
</script>