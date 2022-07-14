<template>
  <div class="container is-fluid">
    <article class="panel is-primary">
      <p class="panel-heading">
        ลงทะเบียนผู้ใช้ใหม่
      </p> 
      <div class="panel-block">
        <div class="columns is-desktop">
          <div class="column">
            <b-field label="อีเมล"
              :type=isEmailType
              :message=isEmailMsg>
              <b-input type="email" 
                id="email" 
                maxlength="30"
                placeholder="email@nu.ac.th">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="หมายเลขบัตรประจำตัวประชาชน"
              :type=isPidType
              :message=isPidMsg>
              <b-input id="pid"
                maxlength="13">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <ListPrename />
          </div>
          <div class="column">
            <b-field label="ชื่อ">
              <b-input id="fname"></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="นามสกุล">
              <b-input id="lname"></b-input>
            </b-field>
          </div>
          <ListUserType />
          <div class="column">
            <b-field label="เบอร์ติดต่อ">
              <b-input id="phone"
              maxlength="11"
              placeholder="000-0000000">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <UploadPhoto />
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="buttons">
          <button class="button is-primary">ตกลง</button>
          <button class="button is-danger">ยกเลิก</button>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import ListPrename from '../../components/ListPrename.vue'
  import ListUserType from '../../components/ListUserType.vue'
  import UploadPhoto from '../../components/UploadPhoto.vue'
  export default {
    name:'App',
    data(){
      return {
        isEmailType: 'is-info',
        isEmailMsg: 'กรุณาใช้ NU Mail เพื่อง่ายต่อการตรวจสอบ',
        isPidType: 'is-info',
        isPidMsg: 'เพื่อใช้สำหรับการ Login เข้าสู่ระบบในครั้งแรก',
      }
    },
    /*computed:{
      chkEmail(){
        this.isEmailType = 'is-danger'
        this.isEmailMsg = 'กรุณากรอกข้อมูลให้ถูกต้อง'
      }
    },*/
    components: {
      ListPrename,
      ListUserType,
      UploadPhoto
    }
  }
</script>

