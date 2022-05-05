<template>
  <div>
    <form @submit.prevent="submitHandler">
      <div class="input-container">
        <div>
          <label>ชื่อ:</label>
        </div>
        <div>
          <input type="text" id="userName" name="userName" v-model="userName" />
        </div>
      </div>
      <div class="input-container">
        <div>
          <label>อายุ:</label>
        </div>
        <div>
          <input type="number" id="age" name="age" v-model="age" />
        </div>
      </div>
      <div :style="{marginTop:'5px'}">
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "../../backend/database/firebase"
export default {
  name: 'App',
  data() {
    return {
      userName:null,
      age:null
    };
  },
  mounted() {
    const liff = this.$liff
    liff.init({
      
    })
  },
  methods: {
    addUser(obj){
      const ref = firebase.collection("users");
      //const id = "myid#" + Math.random(999).toString();
      ref
      //.doc(id)
      //.set(obj)  //set id
      .add(obj) // add auto id
      .then(()=>{
        console.log("add successfully");
      })
      .catch(err => console.log(err));
    },
    submitHandler() {
      const obj = {
        userName: this.userName,
        age:this.age
      };
      this.age = null;
      this.userName = null;
      this.addUser(obj);
    }
  }
};
</script>
<style>
</style>
