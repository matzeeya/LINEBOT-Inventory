'use strict';
const functions = require('firebase-functions')
// สำหรับ network requests
const axios = require('axios');
// เชื่อมต่อ firebase
var config = require('./config.js');
const region = 'asia-northeast1';

var photo = require('./myModules/uploadPhoto');

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
      postToDialogflow(req);
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