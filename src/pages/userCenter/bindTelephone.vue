<template>
  <div id="bind_telephone">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">绑定新手机</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <h3 class="h3">绑定新手机</h3>
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px" class="form_box" hide-required-asterisk>
        <el-form-item label="当前手机号" prop="telOld">
          <el-input 
            v-model="formData.telOld"
            placeholder="当前手机号"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsCode1">
          <el-input
            v-model="formData.smsCode1"
            placeholder="请输入短信验证码"
          ></el-input>
          <verification-code class="yzmBtn" :msgType="2" :phone="formData.telOld" key="1"></verification-code>
        </el-form-item>
        <el-form-item label="新手机号" prop="telNew">
          <el-input 
            v-model="formData.telNew"
            @blur="formData.telNew = $event.target.value"
            onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
            onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
            placeholder="请输入新手机号"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsCode2">
          <el-input
            v-model="formData.smsCode2"
            placeholder="请输入短信验证码"
          ></el-input>
          <verification-code class="yzmBtn" :msgType="2" :phone="formData.telNew" key="2"></verification-code>
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
import verificationCode from './components/verificationCode.vue'
import {changePhone} from '@/api/userCenter';
export default {
  components: {
    verificationCode
  },
  props: {
  },
  data() {
    return {
      active: 1,
      formData: {
        telOld: null,
        smsCode1: null,
        telNew: null,
        smsCode2: null,
      },
      rules: {
        telOld: [
          { required: true, message: '请输入当前手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        smsCode1: [{ required: true, message: '请输入验证码', trigger: 'submit' }],
        telNew: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        smsCode2: [{ required: true, message: '请输入验证码', trigger: 'submit' }]
      },
    }
  },
  created () {
    this.formData.telOld = this.$store.getters.userInfo.tel
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePhone(this.formData).then(res => {
            if (res.data.success) {
              this.$message({
                message: '绑定成功',
                type: 'success'
              });
              this.resetForm('formData')
              this.$store.dispatch('getUserInfo').then(val => {
                this.formData.telOld = val.tel
              })
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
