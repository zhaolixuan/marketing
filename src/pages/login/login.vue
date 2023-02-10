<template>
  <div class="login-wrap">
    <header>
      <router-link to="/" class="logo">
        <img style="cursor: pointer" :src="$config.logoHomeUrl" />
      </router-link>
    </header>
    <div class="login">
      <div class="left"></div>
      <div class="right">
        <loginWidget></loginWidget>
      </div>
    </div>
  </div>
</template>

<script>
import loginWidget from "./components/loginWidget.vue";
export default {
  components: { loginWidget },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
  overflow: hidden;
  header {
    box-shadow: 0px 14px 24px 0px rgba(31, 38, 50, 0.07);
    width: 100%;
    background-color: #fff;
    padding-left: 30px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    .logo {
      height: 40px;
      img {
        width: auto;
        height: 40px;
      }
    }
  }
  .login {
    margin: 3% auto 0;
    width: 1200px;
    height: 675px;
    background: #ffffff;
    box-shadow: 0px 14px 24px 18px rgba(58, 71, 94, 0.07);
    border-radius: 16px;
    display: flex;
    .left {
      width: 525px;
      height: 100%;
      background-image: url("../../static/images/login.png");
      background-size: cover;
      // background: linear-gradient(45deg, #0e67ff 0%, #32c5ff 100%);
      border-radius: 16px 0px 0px 16px;
      // opacity: 0.07;
    }
  }
}
</style>
