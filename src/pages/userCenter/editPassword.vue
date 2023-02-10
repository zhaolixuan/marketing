<template>
  <div id="edit_password">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
    <h3 class="h3">修改密码</h3>
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px" class="form_box" hide-required-asterisk>
        <el-form-item label="当前密码" prop="oldPwd">
          <el-input
            v-model="formData.oldPwd"
            placeholder="请输入当前密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <password-input
            v-model="formData.newPwd"
            placeholder="请输入密码"
          ></password-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <password-input
            v-model="formData.checkPass"
            placeholder="再次确认新密码"
          ></password-input>
        </el-form-item>
      </el-form>
      <div class="line"></div>
      <div class="btn_box">
        <el-button type="primary" @click="submitForm('formData')">确认</el-button>
        <el-button @click="resetForm('formData')">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import passwordInput from '../login/components/passwordInput.vue'
import {changePassword} from '@/api/userCenter'
import { getLoginRsaKey } from "@/api/baseApi";
import { loginOut } from "@/api/loginApi";
export default {
  components: {
    passwordInput
  },
  data() {
    const confirm = (rule, value, callback) => {
      if (this.formData.newPwd !== value) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback()
      }
    }
    return {
      formData: {
        oldPwd: null,
        newPwd: null,
        checkPass: null
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/,
            message: "密码由8～16位,不能为纯字母或数字",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, message: '再次确认新密码', trigger: 'blur' },
          { validator: confirm, trigger: "blur" }
        ]
      },
    }
  },
  mounted() {
    // 加密处理
    getLoginRsaKey().then((res) => {
      if (res.data.success) {
        this.rsakey = res.data.retData.rsakey;
        this.publicKey = res.data.retData.publicKey;
      }
    });
  },
  methods: {
    // 加密处理
    getRsaPassword(input) {
      var publickey = this.publicKey;
      var encrypt = new this.$jsencrypt();
      encrypt.setPublicKey(publickey);
      return encrypt.encrypt(input);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            oldPwd: this.getRsaPassword(this.formData.oldPwd),
            newPwd: this.getRsaPassword(this.formData.newPwd),
            rsakey: this.rsakey
          }
          changePassword(params).then(res => {
            if(res && res.data && res.data.success) {
              this.$message({
                message: '修改成功, 请重新登录',
                type: 'success'
              });
              this.getOutBtn()
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getOutBtn() {
      let res = await loginOut();
      const currentOrgId = localStorage.currentOrgId;
      if (res.data.success) {
        localStorage.clear();
        localStorage.currentOrgId = currentOrgId;
        this.$store.commit("SET_TOKEN", "");
        this.$store.commit("SET_USERINFO", {});
        setTimeout(() => {
          this.$router.push({
            path: "/",
          });
        }, 500);
      } else {
        this.$message.error(res.data.message);
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.bread{
    ::v-deep .is-link {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #929292;
  }
  ::v-deep .diff {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #0d0d0d;
    .el-breadcrumb__inner {
      font-weight: 600;
    }
  }
}
.content_box {
  width: 100%;
  border-radius: 10px;
  margin: 15px 0;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 23px 36px 16px;
  box-sizing: border-box;
  .h3{
    font-size: 20px;
    font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
    font-weight: 600;
    color: #0D0D0D;
  }
  .form_box {
    width: 660px;
    margin-top: 23px;
    ::v-deep .el-form-item {
      .el-form-item__label {
        padding-right: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #595959;
      }
      .el-input__inner {
        height: 40px;
        border-radius: 10px;
      }
    }
  }
  .line{
    margin-top: 30px;
    box-sizing: border-box;
    border-top: 1px solid #F0F0F0;
  }
  .btn_box {
    padding-left: 180px;
    padding-top: 16px;
    .el-button {
      width: 128px;
      height: 40px;
      border-radius: 10px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 500;
      color: #0078E3FF;
      border-color: #0078E3FF;
      ::v-deep .el-button--primary{
          width: 77px;
          color: #FFF;
          background-color: #0078E3FF;
          border-color: #0078E3FF;
      }
      &:hover {
        border-color: rgba($color: #0078E3FF, $alpha: 0.08);
        background-color: rgba($color: #0078E3FF, $alpha: 0.08);
      }
    }
    ::v-deep .el-button--primary {
      background-color: #0078E3FF;
      &:hover {
        border-color: #0078E3FF;
        background-color: #0078E3FF;
      }
      span {
        color: #fff!important;
      }
    }
    ::v-deep .el-button--default:focus,
    ::v-deep .el-button--default:hover {
      border-color: #0078E3FF;
      background-color: #ffffff;
    }
  }
}
</style>
