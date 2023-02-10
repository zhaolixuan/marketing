<template>
  <div class="declare-immediately">
    <div class="content">
      <el-form
        label-position="right"
        :model="form"
        ref="form"
        label-width="163px"
      >
        <el-form-item label="申报政策：" prop="declarationPolicy">{{
          form.declarationPolicy
        }}</el-form-item>
        <el-form-item label="企业名称：" prop="companyName">{{
          form.companyName
        }}</el-form-item>
        <el-form-item label="统一社会信用代码：">
          {{ form.unifiedSocialCreditCode }}
        </el-form-item>
        <el-form-item
          label="上年度营业额(元)："
          prop="lastYearMoney"
          :rules="[
            { required: true, message: '请输入营业额', trigger: 'blur' },
            {
              pattern: /^([1-9]\d*(\.\d*[1-9])?)|(0.\d*[1-9])$/,
              message: '请输入正确的营业额',
              trigger: ['change', 'blur']
            }
          ]"
        >
          <el-input
            placeholder="请输入上年度营业额"
            v-model="form.lastYearMoney"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人："
          prop="contactPerson"
          :rules="{
            required: true,
            message: '请输入联系人名称',
            trigger: 'blur'
          }"
        >
          <el-input
            placeholder="请输入联系人名称"
            v-model="form.contactPerson"
          ></el-input> </el-form-item
        ><el-form-item
          label="联系电话："
          prop="contactTel"
          :rules="[
            {
              required: true,
              message: '请输入联系电话',
              trigger: 'blur'
            },
            ,
            {
              pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
              message: '请输入正确的手机号',
              trigger: ['change', 'blur']
            }
          ]"
        >
          <el-input
            placeholder="请输入联系电话"
            v-model="form.contactTel"
          ></el-input>
        </el-form-item>
        <el-form-item label="方便接听时间：" prop="contactTime">
          <el-radio-group v-model="form.contactTime">
            <el-radio label="随时"></el-radio>
            <el-radio label="工作日上午"></el-radio>
            <el-radio label="工作日下午"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div class="tip">
        *京东云金牌服务商稍后会再您方便接听的时间与您取得联系，以便详细沟通申报方案，请您留意接听。
        如果有任何疑问可在线咨询或致电京东云热线400-615-1212。您填写的信息仅用于政策申报，请放心填写。
      </div>
      <div class="btn-wrap">
        <div class="cancel" @click="cancel">取消</div>
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, submitUserInfo } from "@/api/hqzc";
import { to } from "@/common/util";
export default {
  data() {
    return {
      form: {
        policyId: "",
        // 申报政策
        declarationPolicy: "",
        // 企业名称
        companyName: "",
        // 统一社会信用代码
        unifiedSocialCreditCode: "",
        // 上半年营业额
        lastYearMoney: "",
        // 联系人
        contactPerson: "",
        // 联系电话
        contactTel: "",
        // 方便接听时间
        contactTime: "随时"
        // 注册资金
        // registeredCapital: ""
      }
    };
  },
  mounted() {
    this.form.policyId = this.$route.query?.id;
    this.form.declarationPolicy = this.$route.query?.title;
    this.getData();
  },
  methods: {
    async getData() {
      const [err, result] = await to(getUser());

      if (err) console.log(err);

      if (result?.status === 200) {
        const {
          companyInfo: { companyName, creditCode, contactsTel }
        } = result.data.retData;
        this.form.companyName = companyName;
        this.form.unifiedSocialCreditCode = creditCode;
        this.form.contactTel = contactsTel;
      }
    },
    cancel() {
      this.$router.back();
    },
    submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {

          const [err, result] = await to(submitUserInfo(this.form));

          if (err) console.log(err);

          if (result?.status === 200) {
            this.$alert("提交成功！工作人员将会在5个工作日内联系您", "提示", {
              confirmButtonText: "确定",
              callback: () => {
                this.cancel()
              },
              center: true,
              customClass: "alert",
              iconClass: "alert-icon",
              showClose: false
            });
          }

        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.declare-immediately {
  margin: 16px 0 0;
  min-height: calc(100vh - 60px - 240px - 15.6px);
  background: #f2f7fb;
  margin-bottom: 16px;
  .content {
    width: $w;
    padding: 100px 0 80px;
    margin: 0 auto;
    background-color: #fff;
    ::v-deep .el-form {
      width: 707px;
      margin: 0 auto;
      .el-form-item__label {
        padding: 0 10px 0 0;
      }
    }
    .tip {
      width: 671px;
      height: 42px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 22px;
      margin: 0 auto 117px;
    }
    .btn-wrap {
      display: flex;
      margin: 0 auto;
      width: 381px;
      .cancel,
      .submit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        height: 42px;
        border-radius: 2px;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
      }
      .cancel {
        border: 1px solid #c7c7c7;
        color: #999999;
        margin-right: 121px;
      }
      .submit {
        background: #0e67ff;
        color: #ffffff;
      }
    }
  }
}
::v-deep .el-radio__input.is-checked .el-radio__inner{
  border-color: #0e67ff;
  background: #0e67ff;
}
::v-deep .el-radio__inner:hover{
  border-color: #0e67ff;
}
::v-deep .el-radio__input.is-checked+.el-radio__label{
  color: #0e67ff;
}
</style>
