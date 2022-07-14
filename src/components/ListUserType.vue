<template>
    <div class="column">
      <b-field label="ประเภทผู้ใช้งาน">
        <div class="select">
          <select style="width:280px" @change="setSelected($event)">
            <option v-for="utype in utypes" v-bind:key="utype">{{utype}}</option>
          </select>
        </div>
      </b-field>
      <b-field label="รหัสนักศึกษา" v-if="isType">
        <b-input id="stuid"></b-input>
      </b-field>
  </div>
</template>
<script>
import firestore from "../../backend/database/firebase"
export default {
  name: 'App',
  data () {
    return {
      utypes: [],
      isType: false
    }
  },
  created() {
    const userType = firestore.collection("user_type").orderBy("name","asc")
    userType.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data()){
          this.utypes.push(doc.data().name_th)
        }
      })
    })
  },
  methods: {
    setSelected(event){
      let uType = event.target.value
      if(uType === "นักศึกษา"){
        this.isType = true
      }else{
        this.isType = false
      }
    }
  }
}
</script>