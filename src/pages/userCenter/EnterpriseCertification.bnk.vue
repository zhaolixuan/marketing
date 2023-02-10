<template>
  <div id="enterprise_certification">
    <h3>商家认证</h3>
    <div class="content_box">
      <div v-if="$store.getters.userInfo.supplierApprovalStatus !== 'unauth'">
        <h3 class="content_com_tit" style="margin-top: 0;">商家认证信息</h3>
        <div class="show_info_item" style="padding-top: 20px;">
          <span class="info_label">状态</span>
          <span :class="['info_val', stateObj.color]">{{stateObj.stateName}}</span>
        </div>
        <div class="show_info_item" v-if="stateObj.stateCode === 'reject'">
          <span class="info_label">原因</span>
          <span class="info_val">{{authData.approvalSuggestion}}</span>
        </div>
        <div class="show_info_item" v-if="stateObj.stateCode !== 'unauth'">
          <span class="info_label">提交时间</span>
          <span class="info_val">{{ authData.submitTimeStr }}</span>
        </div>
        <div class="show_info_item" v-if="stateObj.stateCode === 'success' || stateObj.stateCode === 'reject'">
          <span class="info_label">审核时间</span>
          <span class="info_val">{{authData.approvalTimeStr}}</span>
        </div>
      </div>
      <auth-form v-if="isForm" :authData="authData" @updateAuthInfo="getAuthInfo(true)" @goInfo="changePage"></auth-form>
      <auth-info v-if="!isForm" :authData="authData" @goForm="changePage"></auth-info>
    </div>
  </div>
</template>
<script>
import authForm from './components/authenticationForm.vue'
import authInfo from './components/authenticationInfo.vue'
import {getAuthInfo} from '@/api/userCenter';
export default {
  components: {
    authForm,
    authInfo
  },
  data() {
    return {
      isForm: null,
      authData: {
        id: null, //  修改时填写id
        ifChangeTel: null, // 是否修改过手机号,Boolean 修改时填写,避免再次发短信
        smsCode: null, // 短信验证码
        companyName: null, // 公司名称
        creditCode: null, // 统一社会信用码
        provinceCode: null, // 省份编码
        cityCode: null, // 城市编码
        areaCode: null, // 区域编码
        provinceName: null, // 省份名称
        cityName: null, // 城市名称
        areaName: null, // 区域名称
        address: null, // 地址
        contactsName: null, // 联系人
        contactsTel: null, // 手机号码
        contactsPhone: null, // 电话
        contactsEmail: null, // 邮箱
        companyLogo: null, // 企业logo
        profile: null, // 公司简介
        legalPerson: null, // 法人姓名
        legalPersonId: null, // 法人身份证
        legalPersonTel: null, // 法人联系电话
        legalPersonEmail: null, // 法人邮箱
        legalPersonIdPics: null, // 法人身份证照片,多张图片逗号隔开图面id
        licensePic: null, // 营业执照
      }
    }
  },
  created() {
    // unauth 未认证, approvaling 审核中, reject 未通过, success 已通过
    this.isForm = this.$store.getters.userInfo.supplierApprovalStatus === 'unauth'
    this.getAuthInfo()
  },
  computed: {
    stateObj() {
      let obj = {
        stateCode: '',
        stateName: '',
        color: ''
      }
      switch (this.authData.approvalStatus) {
        case 'approvaling':
          obj = {
            stateCode: 'approvaling',
            stateName: '审核中',
            color: 'yellow'
          }
          break;
        case 'reject':
          obj = {
            stateCode: 'reject',
            stateName: '审核未通过',
            color: 'red'
          }
          break;
        case 'success':
          obj = {
            stateCode: 'success',
            stateName: '审核通过',
            color: 'green'
          }
          break;
        default:
          break;
      }
      return obj
    }
  },
  methods: {
    changePage(pageType) {
      this.isForm = pageType
    },
    async getAuthInfo(isUpdate) {
      let res = await getAuthInfo()
      if(res.data.success) {
        this.authData = res.data.retData
        // 判断是不是企业变更触发的
        if(isUpdate) {
          this.isForm = false
        }
      } else {
        this.$message.error(res.data.message);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#enterprise_certification {
  .red {
    color: #EC0810!important;
  }
  .yellow {
    color: #FA8600!important;
  }
  .green {
    color: #00B578!important;
  }
  h3 {
    padding-bottom: 20px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0d0d0d;
  }
  .content_box {
    background-color: #F8F8F8;
    border-radius: 12px;
    padding: 20px 30px;
    box-sizing: border-box;
    
    .content_com_tit {
      height: 40px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #595959;
      margin-bottom: 20px;
      margin-top: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #D9D9D9;
    }
    .common_upload_form_item {
      ::v-deep .el-form-item__content {
        display: flex;
        line-height: normal;
        .upload_text {
          display: inline-block;
          padding: 16px 0;
          font-size: 12px;
          font-family: "Microsoft YaHei";
          color: #0D0D0D;
        }
        .special_item {
          width: 260px;
        }
      }
    }
    .content_btn {
      height: 80px;
      border-top: 1px solid #D9D9D9;
      box-sizing: border-box;
      padding: 30px 0 0 300px;
      .el-button {
        width: 128px;
        height: 40px;
        border-radius: 10px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0E67FF;
        &:hover {
          border-color: rgba($color: #0E67FF, $alpha: 0.08);
          background-color: rgba($color: #0E67FF, $alpha: 0.08);
        }
      }
      ::v-deep .el-button--primary {
        background-color: #0E67FF;
        &:hover {
          border-color: #0E67FF;
          background-color: #0E67FF;
        }
        span {
          color: #fff!important;
        }
      }
    }
  }
  .show_info_item {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #595959;
    padding-top: 40px;
    .info_label {
      display: inline-block;
      width: 308px;
      box-sizing: border-box;
      text-align: right;
      padding-right: 20px;
      margin-right: 22px;
    }
    .info_val {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #0D0D0D;
    }
  }
}  
</style>
