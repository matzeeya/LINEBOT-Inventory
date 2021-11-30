<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h3>Hello firestore!!</h3>
  </div>
</template>

<script>
import firebase from "./database/firebase"
const userRegister = firebase.collection("userRegister")

export default {
  name: 'App',
  created() {
    userRegister.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data()){
          console.log(doc.id)
          console.log(doc.data().email)
        }
      })
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
