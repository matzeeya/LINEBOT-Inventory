// สำหรับการเข้าถึง Cloud Storage
const admin = require("firebase-admin");
admin.initializeApp();

// สำหรับ network requests
const axios = require('axios');

// สำหรับสร้าง public url ใน Cloud Storage
const UUID = require("uuid-v4");

// เชื่อมต่อ firebase
var config = require('../config.js');

// bit.ly
const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient(config.bitly);

// สำหรับจัดการไฟล์
const path = require("path");
const os = require("os");
const fs = require("fs");

//resize image
const sharp = require('sharp');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_CONTENT_API = "https://api-data.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function selfie(req, res){
  //console.log("ok");
  const event = req.body.events[0];
  if (event.type === 'message' && event.message.type === 'image') {
    // เรียกฟังก์ชัน upload เมื่อเข้าเงื่อนไข
    const urls = await upload(event);
    const shortLink = await shortenUrl(urls);
    //console.log("shortenUrl: " + shortLink.link);
    // reply ตัว URL ที่ได้กลับไปยังห้องแชท
    //await reply(event.replyToken, { type: "text", text: "บันทึกสำเร็จ "+shortLink.link });
    await reply(event.replyToken, { 
      "type": "text",
      "text": "บันทึกสำเร็จ",
      "quickReply": {
        "items": [
          {
            "type": "action",
            "imageUrl": "https://icon-library.com/images/confirm-icon/confirm-icon-18.jpg",
            "action": {
              "type": "message",
              "label": "กดที่นี่เพื่อยืนยัน",
              "text": "สำเร็จ"
            }
          }
        ]
      }
    });
  }
  return res.end();
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

const shortenUrl = (url) => {
  return bitly.shorten(url);
};

const upload = async(event) => {
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

  await sharp(tempLocalFile)
    .resize({
      height: 280
    })
    .toFile('resize-'+filename);
  
  const resizeImage = path.dirname('resize-'+filename)+'/resize-'+filename;
  const uuid = UUID()

  const bucket = admin.storage().bucket()
  const file = await bucket.upload(resizeImage, {
    // กำหนด path ในการเก็บไฟล์แยกเป็นแต่ละ userId
    destination: `photos/${event.source.userId}/${filename}`,
    metadata: {
      cacheControl: 'no-cache',
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  })
  fs.unlinkSync(resizeImage);
  fs.unlinkSync(tempLocalFile);
  const prefix = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o`
  const suffix = `alt=media&token=${uuid}`
  return `${prefix}/${encodeURIComponent(file[0].name)}?${suffix}`
};

module.exports={ selfie };