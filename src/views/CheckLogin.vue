<template>
  <div id="app">
    <h3 class="title">Check User Login</h3>
    <h2 class="subtitle" v-if="userProfile">สวัสดีคุณ {{ userProfile.displayName }} 😀</h2>
    <h3 class="subtitle" v-else>สวัสดีค่ะ 😀</h3>
  </div>
</template>
<script>
  const firebase  = require('../../bot/functions/database/firebase.js')
  const line  = require('../../bot/functions/config.js')
  export default {
    name: 'App',
    data () {
      return {
        userProfile: null
      }
    },
    mounted() {
      const liff = this.$liff
      liff.init({
        liffId: line.LIFF_ID
      }).then(() => {
        console.log('LIFF initialize finished')
        if (liff.isLoggedIn()) {
          liff.getProfile()
          .then(profile => {
            // console.log(JSON.stringify(profile))
            this.userProfile = profile
          })
          .catch((err) => {
            console.error(err)
          })
        } else {
          console.log('LIFF is not logged in')
          liff.login()
        }
      }).catch((err) => {
        console.error('Error initialize LIFF: ', err)
      })
      // TODO: get user from Firestore
      firebase.userRegister.get().then(snapshot => {
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