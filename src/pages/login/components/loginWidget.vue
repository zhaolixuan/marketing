<template>
  <div class="container">
    <header>
      <span class="left">登录</span>
      <span class="right" @click="goRegister">免费注册</span>
    </header>
    <div class="login_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号登录" name="first">
          <el-form
            :model="form"
            :rules="rules"
            class="form"
            ref="ruleForm"
            :hide-required-asterisk="true"
          >
            <el-form-item prop="phone" label="用户名/手机号">
              <!-- <el-input
                v-model="form.phone"
                placeholder="请输入账号"
                onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5]/g, '')"
                onafterpaste="this.value=this.value.replace(/[\u4E00-\u9FA5]/g, '')"
                @blur="form.tel = $event.target.value"
              ></el-input> -->
              <el-input
                v-model="form.phone"
                minlength="4"
                maxlength="20"
                placeholder="请输入用户名或手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <passwordInput
                v-model="form.password"
                placeholder="请输入密码"
              ></passwordInput>
            </el-form-item>
          </el-form>
          <btnWidget
            :active="active"
            :width="400"
            @click="submitForm('ruleForm')"
            >登录</btnWidget
          >
          <div class="forget-password" @click="goModify">忘记密码</div>
        </el-tab-pane>
        <el-tab-pane label="快捷登录" name="second">
          <el-form
            class="form"
            :model="form1"
            :rules="rules1"
            ref="ruleForm1"
            :hide-required-asterisk="true"
          >
            <el-form-item prop="phone" label="手机号">
              <el-input
                v-model="form1.phone"
                @blur="form1.phone = $event.target.value"
                onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
                onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <input name="txtPassword" type="test" style="display: none" />
            <el-form-item prop="smsCode" label="验证码">
              <el-input
                v-model="form1.smsCode"
                autocomplete="new-password"
                placeholder="请输入验证码"
              ></el-input>
              <yzmBtn
                class="yzmBtn"
                :msgType="2"
                :isLogin="true"
                :phone="form1.phone"
              ></yzmBtn>
            </el-form-item>
          </el-form>
          <btnWidget
            :active="active1"
            :width="400"
            @click="submitForm('ruleForm1')"
            >登录</btnWidget
          >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import yzmBtn from "./yzmBtn.vue";

import { getLoginRsaKey } from "@/api/baseApi";
import { login, codelogin } from "@/api/loginApi";
import btnWidget from "./btnWidget.vue";
import passwordInput from "./passwordInput.vue";

export default {
  components: { yzmBtn, btnWidget, passwordInput },
  data() {
    return {
      activeName: "first",
      publicKey: "",
      rsakey: "",
      form: {
        phone: "",
        password: "",
      },
      form1: {
        phone: "",
        smsCode: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入用户名或手机号", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/,
            message: "密码由8～16位,不能为纯字母或数字",
            trigger: ["blur"],
          },
        ],
      },
      rules1: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        smsCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "验证码的长度为6位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    active() {
      return !!(this.form.phone && this.form.password);
    },
    active1() {
      return !!(this.form1.phone && this.form1.smsCode);
    },
  },
  mounted() {
    getLoginRsaKey().then((res) => {
      if (res.data.success) {
        this.rsakey = res.data.retData.rsakey;
        this.publicKey = res.data.retData.publicKey;
      }
    });
  },
  methods: {
    getRsaPassword(input) {
      var publickey = this.publicKey;
      var encrypt = new this.$jsencrypt();
      encrypt.setPublicKey(publickey);
      return encrypt.encrypt(input);
    },
    goModify() {
      this.$router.push("/modify");
    },
    goRegister() {
      this.$router.push("/register");
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.$refs.ruleForm.resetFields();
      this.$refs.ruleForm1.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let param, res;
          if (formName === "ruleForm") {
            param = {
              tel: this.form.phone,
              password: this.getRsaPassword(this.form.password),
              rsakey: this.rsakey,
            };
            res = await login(param);
          } else {
            param = {
              tel: this.form1.phone,
              smsCode: this.form1.smsCode,
            };
            res = await codelogin(param);
          }

          console.log(res);

          if (res.data.success) {
            console.log(res.data);
            // let userObj = {
            //   tel: res.data.tel,
            //   userName: res.data.userName,
            // };
            localStorage.setItem("token", res.data.token);
            // localStorage.setItem("userObj", JSON.stringify(userObj));
            // TODO 增加userGroup 目前写死
            // localStorage.setItem("userGroup", "admin");
            // this.$store.commit("SET_TOKEN", res.data.token);
            this.$store.dispatch("getUserInfo").then((res) => {
              this.$message.success("登录成功");
              console.log("userInfo", res);
              localStorage.setItem("userGroup", res.userGroup);
              localStorage.setItem("userId", res.userId);
              // TODO 这里目前只处理了只处理了 query 传参
              if (this.$route.query?.returnUrl) {
                const { returnUrl } = this.$route.query;
                delete this.$route.query.returnUrl;
                this.$router.push({
                  path: returnUrl,
                  query: {
                    ...this.$route.query,
                  },
                });
              } else {
                this.$router.push("/");
              }
            });
            // this.$config = Object.assign(this.$config, userObj);
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 675px;
  height: 675px;
  display: flex;
  //   justify-content: center;
  align-items: center;
  flex-direction: column;
  header {
    width: 515px;
    height: 48px;
    display: flex;
    margin-top: 44px;
    justify-content: space-between;
    align-items: flex-end;
    font-family: "Microsoft YaHei";
    .left {
      font-size: 34px;
      font-weight: bold;
      color: #0d0d0d;
      line-height: 48px;
    }
    .right {
      font-size: 16px;
      font-weight: 400;
      color: #0e67ff;
      line-height: 22px;
      cursor: pointer;
    }
  }
  .login_box {
    width: 400px;
    margin-top: 40px;
    ::v-deep .el-tabs__item {
      font-size: 18px;
      color: #0d0d0d;
    }
    ::v-deep .el-tabs__item.is-active {
      font-weight: bold;
      color: #0e67ff;
    }
    ::v-deep .el-form-item__label {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #0d0d0d;
      // line-height: 48px;
    }
    ::v-deep .el-input--small .el-input__inner {
      height: 48px;
      border-radius: 10px;
      border-color: rgba($color: #0d0d0d, $alpha: 0.16);
    }
    ::v-deep .el-form-item.is-error .el-input__inner,
    .el-form-item.is-error .el-input__inner:focus,
    .el-form-item.is-error .el-textarea__inner,
    .el-form-item.is-error .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      border-color: #f56c6c !important;
    }
    ::v-deep .el-form-item__error {
      right: 0;
      left: auto;
    }
    ::v-deep .el-input__inner:focus {
      outline: none;
      border-color: #0e67ff;
    }
    .login-btn {
      width: 400px;
      height: 48px;
      box-sizing: border-box;
      background: rgba($color: #0e67ff, $alpha: 0.36);
      border-radius: 10px;
      border: none;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
      margin-top: 40px;
      cursor: pointer;
    }
    .form {
      margin-top: 30px;
    }
    .forget-password {
      width: 100%;
      text-align: right;
      margin-top: 20px;
      height: 20px;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #0d0d0d;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
.active {
  background: #0e67ff !important;
  border-color: #0e67ff !important;
}
.yzmBtn {
  right: 0;
  top: 33px;
}
</style>
