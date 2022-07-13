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
              type="is-danger"
              message="กรุณาใช้ NU Mail เพื่อง่ายต่อการตรวจสอบ">
              <b-input type="email" 
                id="email" 
                maxlength="30">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="หมายเลขบัตรประจำตัวประชาชน"
              type="is-danger"
              message="เพื่อใช้สำหรับการ Login เข้าสู่ระบบในครั้งแรก">
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
  import ListPrename from '../../modules/ListPrename.vue'
  import ListUserType from '../../modules/ListUserType.vue'
  import UploadPhoto from '../../modules/UploadPhoto.vue'
  export default {
    components: {
      ListPrename,
      ListUserType,
      UploadPhoto
    }
  }
</script>

