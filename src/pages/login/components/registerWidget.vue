<template>
  <div class="container">
    <header>
      <span class="left">注册</span>
      <span class="right" @click="goLogin">去登录</span>
    </header>
    <div class="login_box">
      <el-form
        :model="form"
        :rules="rules"
        class="form"
        label-width="80px"
        ref="ruleForm"
        :hide-required-asterisk="true"
      >
        <el-form-item prop="tel" label="用户名">
          <el-input
            v-model="form.tel"
            placeholder="用户名支持中文、英文、数字的组合，4-20个字符"
            maxlength="20"
            @blur="form.tel = $event.target.value"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <passwordInput
            v-model="form.password"
            placeholder="密码由8～16位,不能为纯字母或数字"
          ></passwordInput>
        </el-form-item>
        <el-form-item prop="confirm" label="确认密码">
          <passwordInput
            v-model="form.confirm"
            placeholder="请再次输入登录密码"
          ></passwordInput>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            v-model="form.phone"
            @blur="form.phone = $event.target.value"
            onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
            onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="smsCode" label="验证码">
          <el-input
            v-model="form.smsCode"
            autocomplete="new-password"
            placeholder="请输入验证码"
          ></el-input>
          <yzmBtn class="yzmBtn" :msgType="1" :phone="form.phone"></yzmBtn>
        </el-form-item>
      </el-form>
      <btnWidget
        :active="active"
        style="margin-left: 80px"
        @click="submitForm('ruleForm')"
      ></btnWidget>
    </div>
  </div>
</template>
<script>
import yzmBtn from "./yzmBtn.vue";
import btnWidget from "./btnWidget.vue";
import { getLoginRsaKey } from "@/api/baseApi";
import { register } from "@/api/loginApi";
import passwordInput from "./passwordInput.vue";
export default {
  components: {
    yzmBtn,
    btnWidget,
    passwordInput,
  },
  data() {
    const confirm = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      publicKey: "",
      rsakey: "",
      form: {
        tel: "",
        phone: "",
        password: "",
        confirm: "",
        smsCode: "",
      },
      rules: {
        tel: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
        ],
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
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 6,
            message: "验证码的长度为6位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/,
            message: "密码由8～16位,不能为纯字母或数字",
            trigger: "blur",
          },
        ],
        confirm: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            validator: confirm,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    active() {
      return !!(
        this.form.tel &&
        this.form.phone &&
        this.form.password &&
        this.form.confirm &&
        this.form.smsCode
      );
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
    goLogin() {
      this.$router.push("/login");
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let param = {
            loginName: this.form.tel,
            tel: this.form.phone,
            password: this.getRsaPassword(this.form.password),
            smsCode: this.form.smsCode,
            rsakey: this.rsakey,
          };
          let res = await register(param);
          const { success, message } = res.data;
          if (success) {
            this.$message.success(message);
            this.$router.push("/login");
          } else {
            this.$message.error(message);
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
    ::v-deep .el-form-item__label {
      //   width: 42px;
      //   height: 20px;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #0d0d0d;
      line-height: 48px;
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
    .form {
      margin-top: 20px;
    }
    // .yzmBtn {
    //   position: absolute;
    //   right: 0;
    //   top: 1px;
    //   width: 120px;
    //   height: 46px;
    //   border-radius: 0px 10px 10px 0px;
    //   background: rgba($color: #0d0d0d, $alpha: 0.06);
    //   font-size: 14px;
    //   font-family: "Microsoft YaHei";
    //   font-weight: 400;
    //   color: rgba($color: #0d0d0d, $alpha: 0.36);
    //   line-height: 46px;
    //   text-align: center;
    //   cursor: pointer;
    // }
  }
  .yzmBtn {
    right: 0;
    top: 1px;
  }
}
</style>
