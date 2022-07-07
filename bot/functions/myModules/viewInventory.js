// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firestore
const firestore = require("../database/firebase");
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function chkInventory(req, res, number, name, sn, brand, room, url) {
    const event = req.body.events[0];
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
            "url": url,
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
                "text": "หมายเลขครุภัณฑ์: " + number
              },
              {
                "type": "text",
                "text": "ชื่อรายการ: " + name
              },
              {
                "type": "text",
                "text": "S/N: " + sn
              },
              {
                "type": "text",
                "text": "ยี่ห้อ: " + brand
              },
              {
                "type": "text",
                "text": "สถานที่จัดเก็บ: " + room
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
                  "label": "ตกลง",
                  "text": "ตกลง"
                },
                "style": "primary"
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

  function getdata(req, res, uid){
    const inventory = firestore.collection('inventory')
    inventory.get()
    .then(snapshot =>{
      snapshot.forEach((doc)=>{
        if(doc.data().inventory_number === uid){
          const number = doc.data().inventory_number;
          const name = doc.data().inventory_name;
          const sn = doc.data().serial_number;
          const brand = doc.data().brand;
          const room = doc.data().room;
          const url = doc.data().photo;
          chkInventory(req, res, number, name, sn, brand, room, url);
        }
      })
    })
  }

  module.exports={ getdata };