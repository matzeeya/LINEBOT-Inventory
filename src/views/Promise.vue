<template>
  <div id="app">
    <h3>Promise!!</h3>
  </div>
</template>
<script>

export default {
  name: 'App',
  created(){
    const p = new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve({ id: 1, name: "mattareeya"})
        reject(new Error("Error 404 Bad Request"));
      },2000);
    });
    console.log("Before Asynchronous Operation.");
    /*p.then(function(result){
      console.log("This is result: ",result);
    }).catch(function(err){
      console.log(err.message);
    });*/
    //ตัดโค้ดให้สั้นลงด้วยการกำหนดฟังก์ชันแบบ ES6 โดยตัดคำว่า function ออกแล้วใช้เครื่องหมาย => แทรกระหว่างพรารามิเตอร์กับบอดี้
    p.then(result => console.log("This is result: ",result))
    .catch(err => console.log(err.message));
    console.log("After Asynchronous Operation.");
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
