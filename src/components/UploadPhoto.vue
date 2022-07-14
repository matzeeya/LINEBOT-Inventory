<template>
<b-field label="อัพโหลดรูปเพื่อยืนยันตัวตน"
  type="is-info"
  message="กรุณาถ่ายบัตรนักศึกษาหรือบัตรพนักงานเพื่อยืนยันตัวตน">
  <b-field class="file is-primary" :class="{'has-name': !!file}">
    <b-upload v-model="file" class="file-label" rounded>
      <span class="file-cta">
        <b-icon class="file-icon" icon="upload"></b-icon>
        <span class="file-label">{{ file.name || "Click to upload"}}</span>
      </span>
    </b-upload>
  </b-field>
</b-field>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      file: {}
    };
  },
};
</script>