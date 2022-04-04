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
//var richMenu = require('./myModules/richmenu');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.region(region).https.onRequest(async(req, res) => {

  res.header('Access-Control-Allow-Origin', '*')
  let event = req.body.events[0];
  let menuDefault = 'richmenu-a26579f0cace6185b1471cf2ccb6cef4';
  let menuUser = 'richmenu-c72f84074036d7771f13a4c9bc8477d9';
  let menuStaff = 'richmenu-ca3292d5958a11cf4fa31fc449060143';
  let menuAdmin = 'richmenu-4d0db5a336cb80925f9d9b38cbdacdfa';
  //console.log("uid: "+event.source.userId);

  if (event.source.userId !== undefined) {
    let usrType="staff"
    if(usrType !== undefined){
      switch (usrType) {
        case 'none': link(event.source.userId, menuDefault); break
        case 'user': link(event.source.userId, menuUser); break
        case 'staff': link(event.source.userId, menuStaff); break
        case 'admin': link(event.source.userId, menuAdmin); break
      }
    }
  } else {
    link("all", menuDefault)
  }

  if(req.method === "POST"){
    //let event = req.body.events[0];
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
      //}else if(msg[0] === "เมนู"){
        //richMenu.userMenu();
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
    uri: `https://api.line.me/v2/bot/user/${uid}/richmenu/${richMenuId}`,
    headers: { Authorization: `Bearer ${config.accessToken}` }
  });
}

/*const processToOtherUrl =function(payloadRequest){
  console.log('processToOtherUrl');
  
  payloadRequest.headers.host = "dialogflow.cloud.google.com"
    var options = {
      method: 'POST',
      uri: config.dialogflow,
      headers: payloadRequest.headers,
      body: payloadRequest.body,
      json: true // Automatically stringifies the body to JSON
  };

    return rp( options ).then( data => {
      //console.log(data);
      //JSON.stringify(data);
      console.log('OK Data');
      console.log(data);
    }).catch(function (err) {
      // POST failed...
      console.log('OK Error');
      console.log(err);
    });
}*/