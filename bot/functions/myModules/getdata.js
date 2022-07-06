//const functions = require('firebase-functions')

// เชื่อมต่อ firestore
const firestore = require(".././database/firebase");

function getdata(uid){
  const inventory = firestore.collection('inventory')
  var data = "";
  inventory.get()
  .then(snapshot =>{
    snapshot.forEach((doc)=>{
      if(doc.data().inventory_number === uid){
        console.log(doc.id);
        const id = doc.id;
        const number = doc.data().inventory_number;
        const name = doc.data().inventory_name;
        const room = doc.data().room;
        const url = doc.data().photo;
        data = id+"#"+number+"#"+name+"#"+room+"#"+url;
      }else{
        console.log("ไม่พบข้อมูลครุภัณฑ์");
      }
    })
  })
  return data;
}

module.exports={ getdata };