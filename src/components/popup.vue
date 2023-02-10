
<template>
  <div class="popup">
    <!-- 预约弹框 -->
    <el-dialog center title="专家预约" :visible.sync="dialogFormVisible" @close="getClose">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="companyName" label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.companyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="contactName" label="联系人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.contactName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="座机电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
          <span style="display: inline-block;font-size:12px;">请按照区号-座机号（或区号-座机号-分机号）格式填写</span>
        </el-form-item>
        <el-form-item prop="mail" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="problemDemands" label="问题诉求" :label-width="formLabelWidth">
          <el-input
            :autosize="{ minRows: 4, maxRows: 6}"
            type="textarea"
            v-model="form.problemDemands"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="getClose">取 消</el-button> -->
        <el-button type="primary" @click="getSubmit('form')">立即预约</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/cyzjApi";
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    var checklandLine = (rule, value, callback) => {
      const reglandLine = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/;
      if (reglandLine.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的座机号码"));
    };
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: 100 + "px",
      id: "",
      form: {
        expertsId: "", //专家id
        expertsName: "", //专家姓名
        companyName: "", //公司名称
        contactName: "", //联系人姓名
        phone: "", //联系电话
        telephone: "", //座机号
        mail: "", //邮箱
        problemDemands: "" //问题诉求
      },
      rules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入座机号码", trigger: "blur" },
          { validator: checklandLine, trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        problemDemands: [
          { required: true, message: "请输入问题诉求", trigger: "blur" },
          {
            min: 5,
            max: 600,
            message: "长度在 5 到 600 个字符",
            trigger: "blur"
          }
        ]
      },
      btnShow:true
    };
  },
  props: {
    formShow: {
      type: Boolean,
      default: false
    },
    formId: {
      type: String
    },
    expertsName: {
      type: String
    }
  },
  mounted() {
    this.dialogFormVisible = this.formShow;
    this.form.expertsId = this.formId;
    this.form.expertsName = this.expertsName;
  },
  methods: {
    getClose() {
      this.$emit("close", false);
      this.dialogFormVisible = false;
    },
    getSubmit(formName) {
      if(!this.btnShow) return 
      this.btnShow = false 
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.getExpertsAppointment(this.form).then(res => {
            if (res.status == 200) {
              this.$message({
                message: "预约成功！",
                type: "success",
                duration: 2000
              });
              this.getClose();
            }
            this.btnShow = true
          });
        } else {
          this.btnShow = true
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  .el-dialog {
    .el-form {
      .el-input {
        width: 60%;
      }
    }
  }
}
</style>