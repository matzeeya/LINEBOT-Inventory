// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const region = 'asia-northeast1';

// เชื่อมต่อ Dialogflow
const {WebhookClient, Payload} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.fulfillment = functions.region(region).https.onRequest(async(request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function takePhoto(agent){
    agent.add(new Card({
        title: "ถ่ายเซลฟี่เพื่อยืนยันตัวตน",
        imageUrl: 'https://png.pngtree.com/png-clipart/20190726/ourlarge/pngtree-fashion-youth-girl-selfie-png-image_1516241.jpg',
        text: "กรุณาถอดแมสและแว่นตาขณะถ่ายรูป",
        buttonText: 'กดเพื่อถ่าย',
        buttonUrl: 'https://line.me/R/nv/camera/' // call liff selfie
      })
    );
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('upload-photo', takePhoto);
  agent.handleRequest(intentMap);
});

