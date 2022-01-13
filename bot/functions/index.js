'use strict';
const functions = require('firebase-functions')
// สำหรับ network requests
const axios = require('axios');
// เชื่อมต่อ firebase
var config = require('./config.js');
const region = 'asia-northeast1';
//const rp = require('request-promise-native');
var photo = require('./myModules/uploadPhoto');
var users = require('./myModules/userResgister');
var asset = require('./myModules/checkedInventory');
var richMenu = require('./myModules/richmenu');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.region(region).https.onRequest(async(req, res) => {
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
      }else if(msg[0] === "เมนู"){
        richMenu.userMenu();
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