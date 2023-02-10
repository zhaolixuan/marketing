<template>
  <div id="authentication_info">
    <div class="top">
      <h3>身份认证信息</h3>
      <ul>
        <li>
          <span class="name">提交时间</span>
          <span class="time">{{authData.submitTime | hendelDate}}</span>
        </li>
        <li>
          <span class="name">状态</span>
          <span class="statusing" v-if="authData.buyerApprovalStatus =='approvaling'">审核中</span>
          <span class="statusFail" v-if="authData.buyerApprovalStatus =='reject'">审核未通过</span>
          <span class="statusPass" v-if="authData.buyerApprovalStatus =='success'">已通过</span>
        </li>
        <li v-if="authData.buyerApprovalStatus =='reject'">
          <span class="name">原因</span>
          <span class="time">{{authData.approvalSuggestion}}</span>
        </li>
        <li v-if="authData.buyerApprovalStatus =='reject' || authData.buyerApprovalStatus =='success'">
          <span class="name">审核时间</span>
          <span class="time">{{authData.approvalTime | hendelDate}}</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <h3>身份信息</h3>
      <div class="list head_diff">
        <p class="p">个人头像</p>
        <p>
          <img :src="imgUrl" alt class="img" />
        </p>
      </div>
      <div class="list">
        <p class="p">真实姓名</p>
        <p class="word">{{authData.userName}}</p>
      </div>
      <div class="list">
        <p class="p">身份证号</p>
        <p class="word">{{authData.creditCode}}</p>
      </div>
      <div class="list">
        <p class="p">居住地址</p>
        <p class="word">{{authData.provinceName + authData.cityName + authData.areaName + authData.address}}</p>
      </div>
      <div class="list">
        <p class="p">职业</p>
        <p class="word">{{authData.occupation}}</p>
      </div>
      <div class="list">
        <p class="p">手机号码</p>
        <p class="word">{{authData.contactsTel}}</p>
      </div>
      <div class="list">
        <p class="p">电子邮箱</p>
        <p class="word">{{authData.contactsEmail}}</p>
      </div>
      <div class="list diffList">
        <p class="p">个人介绍</p>
        <p class="word">{{authData.profile}}</p>
      </div>
      <div class="line"></div>
      <h3>认证信息</h3>
      <div class="newList">
        <p class="p diff">法人身份证</p>
        <p class="word">
          <img :src="imgUrl2" alt class="img1" />
          <img :src="imgUrl3" alt class="img2" />
        </p>
      </div>
      <div class="line"></div>
       <div class="btn">
          <!-- 买家 -->
          <el-button type="info" disabled v-if="authData.buyerApprovalStatus =='approvaling'">身份信息变更</el-button>          
          <el-button type="primary" @click="goEditAuth" v-if="authData.buyerApprovalStatus =='success' || authData.buyerApprovalStatus =='reject'">身份信息变更</el-button>
          <!-- 卖家 -->
          <el-button type="primary" @click="getAuthEnterprise" class="enterprise" v-if="userAuth.supplierApprovalStatus === 'unauth'">认证为企业</el-button>
          <el-button type="primary" @click="getAuthEnterprise" class="enterprise" v-if="userAuth.supplierApprovalStatus == 'reject'">认证为企业</el-button>
          <el-button type="info" disabled class="enterprise" v-if="userAuth.supplierApprovalStatus =='success'">企业已认证</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate} from "@/common/util";

export default {
  props: {
    authData: {
      type: Object,
      require: false,
      default: () => {}
    }
  },
  data() {
    return {
      disabled:true,
      uploadUrl:'',
      imgUrl: "",
      imgUrl2: "",
      imgUrl3: "",
      imgConfigUrl: process.env.VUE_APP_IMG_URL,
      userAuth:this.$store.getters.userInfo
    };
  },
  created(){
     this.uploadUrl = this.$config.imgUrlFile + localStorage.token;
  },
  mounted(){
    console.log(this.userAuth,'authDataauthData')
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
    }
  },
  watch: {
    authData: {
      handler: function(val) {
        if (val.legalPersonIdPics) {
          let legalPersonIdPics = val.legalPersonIdPics.split(",");
          this.imgUrl = val.headSculpt
            ? this.imgConfigUrl + val.headSculpt
            : "";
          this.imgUrl2 = this.imgConfigUrl + legalPersonIdPics[0];
          this.imgUrl3 = this.imgConfigUrl + legalPersonIdPics[1];
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    goEditAuth() {
      this.$emit("goEditAuth", 'unauth');
    },
    // 认证为企业
    getAuthEnterprise(){
        this.$router.push("/cydn/bmc/enterpriseAuth");
    }
  }
};
</script>

<style lang="scss" scoped>
#authentication_info {
  margin: 15px 0;
  .top {
    background: #ffffff;
    border-radius: 10px;
    padding: 30px 30px 0;
    margin-bottom: 31px;
    box-sizing: border-box;
    h3 {
      font-size: 20px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #0d0d0dff;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 156px;
      box-sizing: border-box;
      li {
        width: 50%;
        margin-bottom: 30px;
        span {
          font-size: 14px;
          font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
          font-weight: 500;
        }
        .name {
          display: inline-block;
          width: 58px;
          text-align: right;
          margin-right: 10px;
          color: #929292;
        }
        .time {
          color: #0d0d0d;
        }
        .statusing {
          color: #fb760e;
        }
        .statusFail{
          color: #EC0810FF;
        }
        .statusPass{
          color: #20C173FF;
        }
      }
    }
  }
  .content {
    background: #ffffff;
    border-radius: 10px;
    padding: 30px 28px 0;
    box-sizing: border-box;
    h3 {
      font-size: 20px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #0d0d0dff;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    .list {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      margin-left: 150px;
      &:first-child {
        margin-bottom: 30px;
      }
      .p {
        width: 73px;
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #595959;
        margin-right: 25px;
        text-align: right;
      }
      .word{
        font-weight: 400;
        color: #0d0d0d;
        font-size: 16px;
        flex: 1;
        line-height: 24px;
      }
      .diff{
        width: 73px;
        padding-top: 15px;
        box-sizing: border-box;
      }
      p {
        .img {
          width: 98px;
          height: 98px;
          border-radius: 10px;
          border: 1px solid #d9d9d9;
        }
        .img1{
          width: 190px;
          height: 120px;
          border-radius: 10px;
          border: 1px solid #D9D9D9;
          margin-right: 40px;
        }
        .img2{
          width: 190px;
          height: 120px;
          border-radius: 10px;
          border: 1px solid #D9D9D9;
        }
      }
    }
    .newList{
      margin-bottom: 40px;
      display: flex;
      // align-items: center;
      margin-left: 150px;
      &:first-child {
        margin-bottom: 30px;
      }
      .p {
        width: 73px;
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #595959;
        margin-right: 25px;
        text-align: right;
      }
      .word{
        font-weight: 400;
        color: #0d0d0d;
        font-size: 16px;
        flex: 1;
        line-height: 24px;
      }
      .diff{
        width: 73px;
        box-sizing: border-box;
      }
      p {
        .img {
          width: 98px;
          height: 98px;
          border-radius: 10px;
          border: 1px solid #d9d9d9;
        }
        .img1{
          width: 190px;
          height: 120px;
          border-radius: 10px;
          border: 1px solid #D9D9D9;
          margin-right: 40px;
        }
        .img2{
          width: 190px;
          height: 120px;
          border-radius: 10px;
          border: 1px solid #D9D9D9;
        }
      }
    }
    .head_diff{
      margin-bottom: 40px;
      display: flex;
      align-items: flex-start;
      margin-left: 150px;
    }
    .diffList{
      margin-bottom: 40px;
      display: flex;
      align-items: baseline;
      margin-left: 150px;
    }
    .line {
      margin-top: 40px;
      margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0ff;
    }
    .btn{
      margin-left: 256px;
      padding-bottom: 16px;
      box-sizing: border-box;
      .enterprise{
        margin-left: 20px;
      }
    }
  }
}
::v-deep .el-button--primary{
    width: 144px;
    border-radius: 8px;
    color: #FFF;
    height: 40px;
    background-color: #0078E3FF;
    border-color: #0078E3FF;
}
::v-deep .el-button--info{
    width: 144px;
    border-radius: 8px;
    height: 40px;
}
// ::v-deep .el-button:hover{
//   border-color: #0078E3FF;
//   background-color: none;
//   color: #0078E3FF;
// }
</style>
