// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firebase
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function userVertify(req, res) {
  const event = req.body.events[0];
  const userId = "U526d4";
  await reply(event.replyToken, { 
    type: "template",
      altText: "ไม่รองรับการแสดงผลบนอุปกรณ์นี้",
      template: {
        type: "carousel",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        columns: [
          {
            thumbnailImageUrl: "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
            imageBackgroundColor: "#FFFFFF",
            title: "Name: ecpe-software",
            text: "description",
            actions: [
              {
                type: "uri",
                label: "ดูรายละเอียด",
                uri: `https://matzeeya.github.io/liff-inventory/bot/functions/src/userVertify.html?param=${userId}`
              }
            ]
          }
        ]
      }
  });
  return res.end();
  /*{
    type: "message",
    label: "ดูรายละเอียด",
    text: "expe-software@nu.ac.th"
    
  }*/
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