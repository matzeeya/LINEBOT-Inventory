<template>
  <div id="app">
    <h3>Callback!!</h3>
  </div>
</template>
<script>

export default {
  name: 'App',
  created(){
    const getStudent = (id)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          let name;
          name = "mattareeya";
          if(name){
            resolve({id: id, name: name});
          }else{
            reject(new Error("Cannot get the result"));
          }
      },2000);
      });
    }
    getStudent(3)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err.message);
    });
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
