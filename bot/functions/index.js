'use strict';
const functions = require('firebase-functions')
//const request = require("request-promise");

// สำหรับ network requests
const axios = require('axios');
// เชื่อมต่อ firestore
//const firestore = require("./database/firebase");

var config = require('./config.js');
const region = 'asia-northeast1';
//const rp = require('request-promise-native');
var photo = require('./myModules/uploadPhoto');
var users = require('./myModules/userResgister');
var asset = require('./myModules/checkedInventory');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.region(region).https.onRequest(async(req, res) => {

  res.header('Access-Control-Allow-Origin', '*')

  let event = req.body.events[0];

  /*const menu = firestore.collection('richMenu')
  const userRegister = firestore.collection('userRegister')
  userRegister.get().then(snapshot => {
    snapshot.forEach(uid => {
      if(uid.data()){
        if(uid.id !== undefined) {
          if(uid.id === event.source.userId){
            menu.get().then(snapmenu => {
              snapmenu.forEach(richmenu => {
                if (richmenu.data()){
                  if(richmenu.id === uid.data().type){ //ถ้า id ของ richmenu เท่ากับ type ของ user
                    if(richmenu.id === "admin"){ // ถ้า type เท่ากับ admin
                      switch (event.message.text) {
                        case 'BackPage1': link(uid.id, richmenu.data().richMenuId); break
                        case 'NextPage2': link(uid.id, richmenu.data().richMenuId2); break
                        default: link(uid.id, richmenu.data().richMenuId); 
                      }
                    }else{
                      link(uid.id, richmenu.data().richMenuId); // ถ้า type ไม่ใช่ admin ให้ดึง richmenuid มาแสดงตาม type ได้เลย
                    }
                  }// end เช็ค ถ้า id ของ richmenu เท่ากับ type ของ user
                }
              })
            })//forEach richMenu วนลูป list menu
          }//if(uid.id === event.source.userId)
        }//if(uid.id !== undefined)
      }//if(uid.data())
    })
  })//forEach userRegister วนลูปหา user*/

  if(req.method === "POST"){
    //console.log("type: "+ event.message.type);
    if(event.message.type !== "text"){
      if(event.message.type === "image"){
        photo.uploadPhoto(req, res); // เรียก function uploadPhoto
      }else{
        await reply(event.replyToken, { type: "text", text: "สวัสดีค่ะ"});
      }
    } else {
      //console.log("text: "+ event.message.text);
      var msg = event.message.text.split(": ");
      if(msg[0] === "ตรวจสอบผู้ใช้งาน"){
        users.userVertify(req,res);
      }else if(msg[0] === "หมายเลขครุภัณฑ์" && msg[1] !== "null"){
        asset.chkInventory(req, res, msg[1]);
        //await reply(event.replyToken, { type: "text", text: "หมายเลขครุภัณฑ์คือ " + msg[1]});
      }else{
        if(event.message.text === "ลงชื่อเข้าใช้"){
          await reply(event.replyToken, { type: "text", text: "รอสักครู่นะคะ"});
        }else{
          postToDialogflow(req);
        }
      }
    }
  }
  return res.status(200).send('done');
});

const reply = (replyToken, payload) => {
  axios({
    method: "post",
    url: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    data: JSON.stringify({
      replyToken: replyToken,
      messages: [payload]
    })
  })
};

const postToDialogflow = payloadRequest => {
  payloadRequest.headers.host = "dialogflow.cloud.google.com"
  axios({
    url: config.dialogflow,
    headers: payloadRequest.headers,
    method: "post",
    data: payloadRequest.body
  })
}

/*const link = async (uid, richMenuId) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/user/${uid}/richmenu/${richMenuId}`,
    headers: { Authorization: `Bearer ${config.accessToken}` }
  });
}*/