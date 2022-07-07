//const user = firestore.collection('userRegister')
  /*const menu = firestore.collection('richMenu')
  const userRegister = firestore.collection('userRegister')
  userRegister.get().then(snapshot => {
    snapshot.forEach(uid => {
      if(uid.data()){
        if(uid.id !== undefined) {
          if(uid.id === event.source.userId){
            menu.get().then(snapmenu => {
              snapmenu.forEach(richmenu => {
                if (richmenu.data()){
                  if(richmenu.id === uid.data().type){ //ถ้า id ของ richmenu เท่ากับ type ของ user
                    if(richmenu.id === "admin"){ // ถ้า type เท่ากับ admin
                      switch (event.message.text) {
                        case 'BackPage1': link(uid.id, richmenu.data().richMenuId); break
                        case 'NextPage2': link(uid.id, richmenu.data().richMenuId2); break
                        default: link(uid.id, richmenu.data().richMenuId); 
                      }
                    }else{
                      link(uid.id, richmenu.data().richMenuId); // ถ้า type ไม่ใช่ admin ให้ดึง richmenuid มาแสดงตาม type ได้เลย
                    }
                  }// end เช็ค ถ้า id ของ richmenu เท่ากับ type ของ user
                }
              })
            })//forEach richMenu วนลูป list menu
          }//if(uid.id === event.source.userId)
        }//if(uid.id !== undefined)
      }//if(uid.data())
    })
  })//forEach userRegister วนลูปหา user*/