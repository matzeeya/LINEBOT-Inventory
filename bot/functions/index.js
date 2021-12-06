'use strict';
const functions = require('firebase-functions')
// สำหรับ network requests
const axios = require('axios');
// เชื่อมต่อ firebase
var config = require('./config.js');

var photo = require('./myModules/selfie');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.https.onRequest(async(req, res) => {
  if(req.method === "POST"){
    let event = req.body.events[0];
    //console.log("userID: "+ event.source.userId); //get userid
    if(event.message.type !== "text"){
      //console.log("type: "+ event.message.type);
      //await reply(event.replyToken, { type: "text", text: event.message.type});
      if(event.message.type === "image"){
        photo.selfie(req, res); // เรียก function selfie
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
    url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/87196520-2ab0-472a-81ce-b9bc88a32e7c",
    headers: payloadRequest.headers,
    method: "post",
    data: payloadRequest.body
  })
}