<template>
    <div class="column">
      <b-field label="ประเภทผู้ใช้งาน">
        <div class="select">
          <select id="userType"
              name="userType"
              style="width:280px" 
              @change="setSelected($event)">
            <option v-for="utype in utypes" 
              v-bind:key="utype">
                {{utype}}
              </option>
          </select>
        </div>
      </b-field>
      <b-field label="รหัสนักศึกษา" 
        v-bind:type="isStuType"
        v-bind:message="isStuMsg"
        v-if="isType">
        <b-input id="stuid"
          name="stuid"
          v-model="stuid"
          maxlength="8">
        </b-input>
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
      isType: false,
      stuid:null,
      isStuType: null,
      isStuMsg:null
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
  },
  watch:{
    stuid(){
      if(this.stuid < '0' || this.stuid >'9'){
        this.isStuType = "is-danger"
        this.isStuMsg = "กรุณากรอกเฉพาะตัวเลข"
      }else{
        this.isStuType =  null
        this.isStuMsg = null
      }
    }
  }
}
</script>