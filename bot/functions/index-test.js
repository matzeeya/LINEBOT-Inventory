'use strict';
const functions = require('firebase-functions')
const region = 'asia-northeast1';

const  photo = require('./myModules/selfie');

exports.fulfillment = functions.region(region).https.onRequest(async(req, res) => {
  const events = req.body.events;
  for (const event of events) {
    if (event.type === "message") {
      if (event.message.type !== "text") {
        console.log(event.message.type);
        //photo.selfie(req,res);
      } else {
        console.log(event.message.text);
      }
    }
  };
  return res.end();
  //photo.uploadPhoto(req,res);
});