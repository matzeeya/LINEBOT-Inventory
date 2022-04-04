// สำหรับ network requests
const axios = require('axios');

// เชื่อมต่อ firebase
var config = require('../config.js');

const LINE_MESSAGING_API = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.accessToken}`
};

async function userMenu() {
  await menu({
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": true,
    "name": "RichMenuUser",
    "chatBarText": "เมนู",
    "areas": [
      {
        "bounds": {
          "x": 30,
          "y": 30,
          "width": 972,
          "height": 801
        },
        "action": {
          "type": "uri",
          "uri": "https://liff.line.me/1656639524-loJjd1JV/bot/functions/src/scanCode.html"
        }
      },
      {
        "bounds": {
          "x": 1035,
          "y": 34,
          "width": 1435,
          "height": 380
        },
        "action": {
          "type": "uri",
          "uri": "https://liff.line.me/1656639524-loJjd1JV/bot/functions/src/borrow.html"
        }
      },
      {
        "bounds": {
          "x": 1036,
          "y": 459,
          "width": 1432,
          "height": 376
        },
        "action": {
          "type": "uri",
          "uri": "https://liff.line.me/1656639524-loJjd1JV/bot/functions/src/return.html"
        }
      },
      {
        "bounds": {
          "x": 34,
          "y": 868,
          "width": 791,
          "height": 788
        },
        "action": {
          "type": "message",
          "text": "ดูรายการยืมคืนของฉัน"
        }
      },
      {
        "bounds": {
          "x": 857,
          "y": 870,
          "width": 788,
          "height": 786
        },
        "action": {
          "type": "message",
          "text": "ข้อมูลของฉัน"
        }
      },
      {
        "bounds": {
          "x": 1677,
          "y": 868,
          "width": 788,
          "height": 790
        },
        "action": {
          "type": "message",
          "text": "ติดต่อแอดมิน"
        }
      }
    ]
  });
}

const menu = (payload) => {
  axios({
    Headers: LINE_HEADER,
    Endpoint: `${LINE_MESSAGING_API}/richmenu`,
    Method: "post",
    Body: JSON.stringify({payload})
  })
};

module.exports={ userMenu};