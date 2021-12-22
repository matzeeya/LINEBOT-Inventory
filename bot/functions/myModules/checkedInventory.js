// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firebase
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function chkInventory(req, res, asset_id) {
    const event = req.body.events[0];
    const encodeAsset = btoa(asset_id);
    //await reply(event.replyToken, { type: "text", text: "หมายเลขครุภัณฑ์คือ " + asset_id});
    await reply(event.replyToken, { 
      type: "template",
      altText: "ไม่รองรับการแสดงผลบนอุปกรณ์นี้",
      template: {
        type: "carousel",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        columns: [
          {
            thumbnailImageUrl: "https://www.pngfind.com/pngs/m/337-3376455_brown-cony-sweet-love-line-brown-and-cony.png",
            imageBackgroundColor: "#FFFFFF",
            title: "หมายเลขครุภัณฑ์: " + asset_id,
            text: "ชื่อรายการ: คอมพิวเตอร์",
            actions: [
              {
                type: "uri",
                label: "ดูเพิ่มเติม",
                uri: `${config.LIFF_URL}/bot/functions/src/assetDetail.html?asset=${encodeAsset}`
              }
            ]
          }
        ]
      }
    });
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
  
  module.exports={ chkInventory};