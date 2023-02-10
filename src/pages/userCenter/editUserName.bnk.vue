<template>
  <div id="edit_user_name">
    <h3>修改用户名</h3>
    <div class="content_box">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="180px" class="form_box" hide-required-asterisk>
        <el-form-item label="修改用户名" prop="nowPass">
          <el-input v-model="formData.nowPass"></el-input>
        </el-form-item>
        <el-form-item label="验证码验证" prop="nowPass">
          <el-input v-model="formData.nowPass"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn_box">
        <el-button type="primary" @click="submitForm('formData')">确认</el-button>
        <el-button @click="resetForm('formData')">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        nowPass: null,
      },
      rules: {
        nowPass: [{ required: true, message: '请输入当前密码', trigger: 'blur' }]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>
<style lang="scss" scoped>
@import './components/formCommon.scss';
</style>
