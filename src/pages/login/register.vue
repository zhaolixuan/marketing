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
        <registerWidget></registerWidget>
      </div>
    </div>
  </div>
</template>

<script>
import registerWidget from "./components/registerWidget.vue";
export default {
  components: { registerWidget },
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
    .right {
    }
  }
  // .content {
  //   padding: 34px 25px 62px 25px;
  //   width: 100%;
  //   height: 412px;
  //   box-sizing: border-box;

  //   ::v-deep .el-input--small .el-input__inner {
  //     width: 409px;
  //     height: 50px;
  //     background: rgba(29, 74, 212, 0.02);
  //     border-radius: 4px;
  //     border: 1px solid rgba(29, 74, 212, 0.45);
  //   }
  //   ::v-deep .el-form-item--mini.el-form-item,
  //   .el-form-item--small.el-form-item {
  //     margin-bottom: 19px;
  //   }

  //   .forget-password-wrap {
  //     overflow: hidden;
  //     .forget-password {
  //       float: right;
  //       color: rgba(0, 0, 0, 0.65);
  //       font-size: 14px;
  //       cursor: pointer;
  //     }
  //   }

  //   .login-btn {
  //     width: 100%;
  //     height: 66px;
  //     text-align: center;
  //     margin: 18px 0 37px;
  //     background: linear-gradient(180deg, #4ea6ff 0%, #2670ff 100%);
  //     font-size: 20px;
  //     font-family: "Microsoft YaHei";
  //     font-weight: 400;
  //     color: rgba(255, 255, 255, 1);
  //     line-height: 66px;
  //     border-radius: 3px;
  //     box-shadow: 0px 7px 10px 0px rgba(51, 119, 255, 0.44);
  //     cursor: pointer;
  //   }
  //   .register-wrap {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     overflow: hidden;
  //     .toggle {
  //       font-size: 16px;
  //       font-family: "Microsoft YaHei";
  //       font-weight: 600;
  //       color: rgba(29, 74, 212, 0.68);
  //       line-height: 22px;
  //       letter-spacing: 2px;
  //       cursor: pointer;
  //     }
  //     .register {
  //       font-size: 16px;
  //       font-family: "Microsoft YaHei";
  //       font-weight: 600;
  //       color: rgba(29, 74, 212, 0.68);
  //       line-height: 22px;
  //       letter-spacing: 2px;
  //       cursor: pointer;
  //     }
  //   }
  // }
}
</style>
