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
              v-bind:type="isEmailType"
              v-bind:message="isEmailMsg">
              <b-input type="email" 
                id="email" 
                name="email"
                v-model="email"
                maxlength="30"
                placeholder="email@nu.ac.th">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="หมายเลขบัตรประจำตัวประชาชน"
              v-bind:type="isPidType"
              v-bind:message="isPidMsg">
              <b-input id="pid"
                name="pid"
                v-model="pid"
                maxlength="13">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <ListPrename />
          </div>
          <div class="column">
            <b-field label="ชื่อ">
              <b-input id="fname"
                name="fname">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="นามสกุล">
              <b-input id="lname"
                name="lname">
              </b-input>
            </b-field>
          </div>
          <ListUserType />
          <div class="column">
            <b-field label="เบอร์ติดต่อ"
              v-bind:type="isPhoneType"
              v-bind:message="isPhoneMsg">
              <b-input id="phone"
              name="phone"
              v-model="phone"
              maxlength="10">
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
    components: {
      ListPrename,
      ListUserType,
      UploadPhoto
    },
    data(){
      return {
        email:null,
        pid:null,
        phone:null,
        isEmailType: "is-info",
        isEmailMsg: "กรุณาใช้ NU Mail เพื่อง่ายต่อการตรวจสอบ",
        isPidType: "is-info",
        isPidMsg: "เพื่อใช้สำหรับการ Login เข้าสู่ระบบในครั้งแรก",
        isPhoneType: null,
        isPhoneMsg:null
      }
    },
    watch:{
      email(){
        if(!this.email){
          this.isEmailType = "is-info"
          this.isEmailMsg = "กรุณาใช้ NU Mail เพื่อง่ายต่อการตรวจสอบ"
        }else{
          this.isEmailType = "is-danger"
          this.isEmailMsg = "กรุณาใส่ @ ลงในอีเมล"
        }
        
      },
      pid(){
        if(this.pid.length < 13){
          this.isPidType = "is-info"
          this.isPidMsg = "เพื่อใช้สำหรับการ Login เข้าสู่ระบบในครั้งแรก"
        }else{
          this.isPidType = "is-danger"
          this.isPidMsg = "กรอกข้อมูลไม่ถูกต้อง"
        }
      },
      phone(){
        if(this.phone < '0' || this.phone >'9'){
          this.isPhoneType = "is-danger"
          this.isPhoneMsg = "กรุณากรอกเฉพาะตัวเลข"
        }else{
          this.isPhoneType =  null
          this.isPhoneMsg = null
        }
      }
    }
  }
</script>

