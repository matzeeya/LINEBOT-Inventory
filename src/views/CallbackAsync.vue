<template>
  <div id="app">
    <h3>Callback Async!!</h3>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods:{
    myAsync(callback){
      console.log("Start");
      setTimeout(()=>{
          const result = callback("Hello!");
          console.log(result);
      },2000);
      console.log("Finish");
    }
  },
  created(){
    this.myAsync(message =>{
      return message + "Async";
    })
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
