// เชื่อมต่อ firebase
var config = require('../config.js');

// สำหรับ network requests
const axios = require('axios');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_CONTENT_API = "https://api-data.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function userVertify(req, res) {
  const event = req.body.events[0];
  console.log("event: "+event);
  /*if (event.message.type === 'text' && event.message.type === 'ตรวจสอบผู้ใช้งาน') {
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
  }*/
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

module.exports={ userVertify};