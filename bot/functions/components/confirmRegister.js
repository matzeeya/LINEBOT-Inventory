// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firebase
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function userRegister(req, res) {
    const event = req.body.events[0];
    //const encodeAsset = btoa(asset_id);
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
              "text": "ข้อมูลของคุณถูกต้องหรือไม่?",
              "align": "center",
              "contents": []
            }
          ]
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
            {
              "type": "text",
              "text": "ชื่อผู้ใช้:",
              "align": "start",
              "contents": []
            },
            {
              "type": "text",
              "text": "รหัสผ่าน:",
              "contents": []
            },
            {
              "type": "text",
              "text": "อีเมล:",
              "contents": []
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
              "text": "ถูกต้อง"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "ไม่ถูกต้อง",
                "uri": "https://liff.line.me/1656639524-loJjd1JV/bot/functions/src/register.html"
              }
            }
          ]
        }
      }
    });
    return res.end();
  }
  
  async function selfie(req, res) {
    const event = req.body.events[0];
    //const encodeAsset = btoa(asset_id);
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
              "text": "กรุณาถ่ายเซลฟี่เพื่อยืนยันตัวตน",
              "align": "center",
              "contents": []
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://png.pngtree.com/png-clipart/20190726/ourlarge/pngtree-fashion-youth-girl-selfie-png-image_1516241.jpg",
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
              "text": "กรุณาถอดแมสขณะถ่ายรูป",
              "align": "center",
              "contents": []
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
                "type": "uri",
                "label": "กดปุ่มเพื่อถ่ายรูป",
                "uri": "https://line.me/R/nv/camera/"
              }
            }
          ]
        }
      }
    });
    return res.end();
  }

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

  module.exports={ userRegister,selfie};