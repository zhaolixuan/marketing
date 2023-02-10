<template>
  <div id="go_authentic_ation">
    <div class="content_box">
      <div class="content_txt">您当前尚未进行企业账号认证，请先去认证，即可使用商家个人中心功能。</div>
      <el-button type="parmary" @click="goAuth">去认证</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    goAuth() {
      this.$router.push({path: '/cydn/userCenter/EnterpriseCertification'})
    }
  },
}
</script>
<style lang="scss" scoped>
#go_authentic_ation {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content_box {
    text-align: center;
    width: 360px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0D0D0D;
    line-height: 32px;
    .el-button {
      width: 152px;
      height: 48px;
      background: #0E67FF;
      border-radius: 10px;
      border: 1px solid #0E67FF;
      margin-top: 30px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #FFFFFF;
    }
  }
}  
</style>
