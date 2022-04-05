'use strict';
const functions = require('firebase-functions')
const request = require("request-promise");

// สำหรับ network requests
const axios = require('axios');
// เชื่อมต่อ firebase
var config = require('./config.js');
const region = 'asia-northeast1';
//const rp = require('request-promise-native');
var photo = require('./myModules/uploadPhoto');
var users = require('./myModules/userResgister');
var asset = require('./myModules/checkedInventory');

//richmenu
//var RichMenuDefault = require('./RichMenu/default.json');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.region(region).https.onRequest(async(req, res) => {

  //console.log("json: "+RichMenuDefault.name)

  res.header('Access-Control-Allow-Origin', '*')

  //menu(RichMenuDefault);
  let event = req.body.events[0];
  let menuDefault = 'richmenu-d34defac514589520c9f6ac5b4c3058e';
  let menuUser = 'richmenu-488095112fd3da2c78f0c4e9262940e4';
  let menuStaff = 'richmenu-d301b36c64e734c57efc8883f33b97fe';
  let menuAdminPage1 = 'richmenu-91649aecd18485c6509c544c701dafef';
  let menuAdminPage2 = 'richmenu-379bd5ef31638af5ef9891fa2f8e77e3';
  //console.log("uid: "+event.source.userId);

  let uid = config.uid;
  //let uid = "undefined";
  if (uid !== undefined) {
    let usrType="admin"
    if(usrType !== undefined){
      if(usrType === "admin"){
        //console.log("type: "+event.type);
        //console.log(" data: "+event.message.text);
        switch (event.message.text) {
          case 'BackPage1': link(event.source.userId, menuAdminPage1); break
          case 'NextPage2': link(event.source.userId, menuAdminPage2); break
          default: link(event.source.userId, menuAdminPage1); 
        }

      }else{
        switch (usrType) {
          case 'none': link(event.source.userId, menuDefault); break
          case 'user': link(event.source.userId, menuUser); break
          case 'staff': link(event.source.userId, menuStaff); break
        }
      }
    }
  } else {
    link("all", menuDefault)
  }

  if(req.method === "POST"){
    let event = req.body.events[0];
    //console.log("userID: "+ event.source.userId); //get userid
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
      //console.log(msg[0]);
      if(msg[0] === "ตรวจสอบผู้ใช้งาน"){
        users.userVertify(req,res);
      }else if(msg[0] === "หมายเลขครุภัณฑ์" && msg[1] !== "null"){
        asset.chkInventory(req, res, msg[1]);
        //await reply(event.replyToken, { type: "text", text: "หมายเลขครุภัณฑ์คือ " + msg[1]});
      }else{
        postToDialogflow(req);
        //processToOtherUrl(req);
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

const link = async (uid, richMenuId) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/user/${uid}/richmenu/${richMenuId}`,
    headers: { Authorization: `Bearer ${config.accessToken}` }
  });
}

/*const menu = async (payload) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/richmenu`,
    headers: { Authorization: `Bearer ${config.accessToken}` },
    body: JSON.stringify({payload})
  });
}*/