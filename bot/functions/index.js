const functions = require('firebase-functions');
var config = require('./config.js');
// สำหรับ network requests
const axios = require('axios');

// Google API
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

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
      }
    });
    //console.log("res: "+ response.data);
    var urls = "";
    var obj = response.data; // ข้อมูลไฟล์ที่ upload {name,id}
    for (var key in obj) {
      if (key == "id"){
        urls = "https://drive.google.com/open?id="+obj[key]; // url รูปที่ upload ขึ้น google drive
      }
      //console.log(' name=' + key + ' value=' + obj[key]);
    }
  } catch (error) {
    console.log(error.message);
  }

  fs.unlinkSync(tempLocalFile)
  return urls;
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