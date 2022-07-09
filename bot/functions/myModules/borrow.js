// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firebase
const firestore = require("../database/firebase");
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function chkInventory(req, res, number, name, brand, room, url) {
    const event = req.body.events[0];
    const encodeAsset = btoa(number);
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
                "text": "ยี่ห้อ: " + brand
              },
              {
                "type": "text",
                "text": "สถานะ: " + "ปกติ"
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
  }

  async function notBorrow(req, res, id, number, name, status, brand, room, url) {
    const event = req.body.events[0];
    const encodeId = btoa(id);
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
                "text": "ยี่ห้อ: " + brand
              },
              {
                "type": "text",
                "text": "สถานะ: " + status
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
                  "type": "uri",
                  "label": "ดูรายละเอียด",
                  "uri": `${config.LIFF_URL}/bot/functions/src/viewBorrowDetail.html?id=${encodeId}`
                },
                "style": "secondary"
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

  function getdata(req, res, id){
    const item = firestore.collection('item')
    const query = item
    .where("item_number","==",id)
    query
    .get()
    .then(snapshot =>{
      snapshot.forEach((doc)=>{
        if(doc.data().item_number === id){
          const item_id = doc.id;
          const number = doc.data().item_number;
          const name = doc.data().item_name;
          const brand = doc.data().brand;
          const room = doc.data().room;
          const url = doc.data().photo;
          const status = doc.data().status;
          if(status === "1"){
            chkInventory(req, res, number, name , brand, room, url);
          }else if(status === "2"){
            notBorrow(req, res, item_id, number, name, "ถูกยืม", brand, room, url);
          } 
        }
      })
    })
    .catch(err =>{
      console.log(err);
    })
  }

  module.exports={ getdata };