<template>
  <div id="enterprise_certification">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">身份认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <auth-form v-if="isStatus == 'unauth'" :authData="authData" @updateAuthInfo="getBuyerAuthInfo()" @goInfo="changePage"></auth-form>
      <auth-info v-else :authData="authData" @goEditAuth="changePage"></auth-info>
    </div>
  </div>
</template>
<script>
import authForm from './components/authenticationForm.vue'
import authInfo from './components/authenticationInfo.vue'

import {getBuyerAuthInfo} from '@/api/userCenter';
export default {
  components: {
    authForm,
    authInfo
  },
  data() {
    return {
      isStatus:null,
      authData: {
        userId: null, //  修改时填写id
        headSculpt:null,// 个人头像
        userName:null, // 真实姓名
        creditCode:null,// 身份证号
        provinceCode: null, // 省份编码
        cityCode: null, // 城市编码
        areaCode: null, // 区域编码
        provinceName: null, // 省份名称
        cityName: null, // 城市名称
        areaName: null, // 区域名称
        address: null, // 地址
        occupation:null,// 职业
        contactsTel: null, // 手机号码
        contactsEmail: null, // 电子邮箱
        profile: null, // 个人简介
        legalPersonIdPics: null, // 法人身份证照片,多张图片逗号隔开图面id
      }
    }
  },
  created() {
    // unauth 未认证,approvaling 审核中, reject 未通过, success通过 buyer 买家 supplier 卖家
    this.isStatus = this.$store.getters.userInfo.buyerApprovalStatus;
    this.getBuyerAuthInfo()
  },
  methods: {
    changePage(pageType) {
      this.isStatus = pageType;
    },
    // 认证信息
    async getBuyerAuthInfo() {
      let res = await getBuyerAuthInfo();
      if(res.data.success) {
        this.authData = res.data.retData;
        this.isStatus = res.data.retData.buyerApprovalStatus;
      } else {
        this.$message.error(res.data.message);
      }
    },
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
    // background: #ffffff;
    // border-radius: 10px;
    // padding: 29px 30px 16px;
    // margin-top: 15px;
    // box-sizing: border-box;
    
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
