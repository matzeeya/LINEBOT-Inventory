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
        type: 'flex',
        altText: 'ไม่รองรับการแสดงผลบนอุปกรณ์นี้',
        contents: {
          "type": "bubble",
          "direction": "ltr",
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "รายละเอียดครุภัณฑ์",
                "align": "center"
              }
            ]
          },
          "hero": {
            "type": "image",
            "url": "https://sites.google.com/site/cam5910122137024/_/rsrc/1479360435073/personal-computer/hp-pavilion-hpe-phoenix-pc_resized.jpeg",
            "size": "full",
            "aspectRatio": "1.51:1",
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "หมายเลขครุภัณฑ์: " + asset_id
              },
              {
                "type": "text",
                "text": "ชื่อรายการ:"
              },
              {
                "type": "text",
                "text": "S/N:"
              },
              {
                "type": "text",
                "text": "ยี่ห้อ:"
              },
              {
                "type": "text",
                "text": "สถานที่จัดเก็บ: "
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "ถูกต้อง",
                  "text": "บันทึกข้อมูลสำเร็จ"
                },
                "style": "primary"
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "แก้ไข",
                  "uri": `${config.LIFF_URL}/bot/functions/src/assetEdit.html?asset=${encodeAsset}`
                },
                "style": "secondary"
              }
            ]
          }
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