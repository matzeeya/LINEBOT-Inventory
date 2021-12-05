const functions = require('firebase-functions')

const  photo = require('./myModules/uploadPhoto');

exports.fulfillment = functions.https.onRequest(async(req, res) => {
  photo.uploadPhoto(req,res);
});