/*async function uploadPhoto(req, res){
  let event = req.body.events[0]
  if (event.type === 'message' && event.message.type === 'image') {
    // เรียกฟังก์ชัน upload เมื่อเข้าเงื่อนไข
    let urls = await upload(event)
    
    // reply ตัว URL ที่ได้กลับไปยังห้องแชท
    await reply(event.replyToken, { type: "text", text: urls })
  }
}*/

const uploadPhoto = async (req, res) => {
  let event = req.body.events[0]
  if (event.type === 'message' && event.message.type === 'image') {
    // เรียกฟังก์ชัน upload เมื่อเข้าเงื่อนไข
    let urls = await upload(event)
    
    // reply ตัว URL ที่ได้กลับไปยังห้องแชท
    await reply(event.replyToken, { type: "text", text: urls })
  }
}

const upload = async (event) => {
  // ดาวน์โหลด binary จาก LINE 
  const LINE_CONTENT_API = 'https://api-data.line.me/v2/bot/message'
  let url = `${LINE_CONTENT_API}/${event.message.id}/content`
  let buffer = await request.get({
    headers: LINE_HEADER,
    uri: url,
    encoding: null // กำหนดเป็น null เพื่อให้ได้ binary ที่สมบูรณ์
  })

  // สร้างไฟล์ temp ใน local โดยใช้ timestamp ที่ได้จาก webhook เป็นชื่อไฟล์
  let filename = `${event.timestamp}.jpg`
  let tempLocalFile = path.join(os.tmpdir(), filename)
  await fs.writeFileSync(tempLocalFile, buffer)

  // generate ตัว uuid
  let uuid = UUID()
  
  // อัพโหลดไฟล์ขึ้น Cloud Storage
  let bucket = admin.storage().bucket()
  let file = await bucket.upload(tempLocalFile, {
    // กำหนด path ในการเก็บไฟล์แยกเป็นแต่ละ userId
    destination: `photos/${event.source.userId}/${filename}`,
    metadata: {
      cacheControl: 'no-cache',
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  })
  
  // ลบไฟล์ temp เมื่ออัพโหลดเรียบร้อย
  fs.unlinkSync(tempLocalFile)

  // วิธีลัดในการสร้าง download url ขึ้นมา
  let prefix = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o`
  let suffix = `alt=media&token=${uuid}`
  return `${prefix}/${encodeURIComponent(file[0].name)}?${suffix}`
}

const reply = (replyToken, payload) => {
  request.post({
    uri: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [payload]
    })
  })
}

module.exports={ uploadPhoto };