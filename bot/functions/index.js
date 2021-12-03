const functions = require('firebase-functions');

// สำหรับ network requests
const axios = require('axios');

// Google API
const { google } = require('googleapis');

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

// เชื่อมต่อ firebase
var config = require('./config.js');

// สำหรับจัดการไฟล์
const path = require("path");
const os = require("os");
const fs = require("fs");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_CONTENT_API = "https://api-data.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

exports.fulfillment = functions.https.onRequest(async (request, response) => {
  const event = request.body.events[0];

  if (event.type === 'message' && event.message.type === 'image') {
    // เรียกฟังก์ชัน upload เมื่อเข้าเงื่อนไข
    const img = await getImage(event);
    //console.log("upload:" + img);

    await reply(event.replyToken, { type: "text", text: img });
    
  }
});

const getImage = async(event) => {
  const url = `${LINE_CONTENT_API}/${event.message.id}/content`;
  const buffer = await axios({
    method: "get",
    headers: LINE_HEADER,
    url: url,
    responseType: "arraybuffer"
  });

  const filename = `${event.timestamp}.jpg`;
  const tempLocalFile = path.join(os.tmpdir(), filename);
  await fs.writeFileSync(tempLocalFile, buffer.data);

  const filePath = path.join(tempLocalFile);
  console.log(filePath);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename, //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }

  fs.unlinkSync(tempLocalFile)
  return filename;
};

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