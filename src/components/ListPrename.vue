<template>
  <b-field label="คำนำหน้า">
    <div class="select">
      <select id="prename"
        name="prename"
        v-model="prename"
        @change="getPrename(prename)"
        style="width:280px">
          <option v-for="prename in pnames" 
            v-bind:key="prename">
              {{prename}}
            </option>
      </select>
    </div>
  </b-field>
</template>
<script>
import firestore from "../../backend/database/firebase"
export default {
  name: 'Prename',
  props:{
    getPrename:Function
  },
  data () {
    return {
      pnames: [],
      prename:null
    }
  },
  created() {
    const pname = firestore.collection("prename").orderBy("name","asc")
    pname.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data()){
          this.pnames.push(doc.data().name)
        }
      })
    })
  },
  /*watch:{
    prename(){
      console.log("isPrename: "+this.prename)
    }
  }*/
}
</script>