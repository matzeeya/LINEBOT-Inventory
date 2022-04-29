<template>
  <div id="app">
    <h3>Async Await!!</h3>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods:{
    async checkAuth(id,pass){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          let authData;
          if(pass === "mypassword"){
            authData = "xTyk012pDyz12";
            console.log("User authenticaticated");
          }else{
            reject("wrong password");
          }
          if (authData !== null) 
            resolve({id: id, auth: authData});
            reject("Error!!");
        },1000);
      });
    },
    async getStudent(token){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          const data = {name: "mattareeya",
          permission: "admin"};
          if(token.auth === "xTyk012pDyz12")
            resolve(data);
            reject("Error!");
        },2000);
      });
    },
    async getTheResult(){
      try{
        const authToken = await this.checkAuth(1,"mypassword");
        const data = await this.getStudent(authToken);
        console.log(data);
      }catch(err){
        console.log(err);
      }
    }
  },
  created(){
    this.getTheResult();
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
