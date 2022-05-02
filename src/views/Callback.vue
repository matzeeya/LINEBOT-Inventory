<template>
  <div id="app">
    <h3>Callback!!</h3>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods:{
    myRequest(data,callback){
      const response = 10+data;
      const error = undefined;
      const result = callback(error,response);
      return result;
    }
  },
  created(){
    const result = this.myRequest(5,(error,res)=>{
      if(error){
        return "You have got Error";
      }else{
        return res;
      }
    });
    console.log(result);
  }
};
</script>

<style>
#app {
 text-align: center;
 color: #2c3e50;
 margin-top: 60px;
}
</style>
