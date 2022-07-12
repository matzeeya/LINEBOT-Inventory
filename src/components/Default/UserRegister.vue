<template>
  <div class="container is-fluid">
    <div class="columns is-desktop">
      <div class="column">
        <b-field label="คำนำหน้า">
          <b-input v-model="pname"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="ชื่อ">
          <b-input v-model="fname"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="นามสกุล">
          <b-input v-model="lname"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns is-desktop">
      <div class="column">
        <b-field label="Email"
          type="is-danger"
          message="This email is invalid">
          <b-input type="email"
              maxlength="30">
          </b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="ชื่อผู้ใช้">
          <b-input v-model="username"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="รหัสผ่าน">
          <b-input v-model="password"></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="ยืนยันรหัสผ่าน">
          <b-input v-model="repassword"></b-input>
        </b-field>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      user: 'Mattareeya'
    }
  }
}
</script>
