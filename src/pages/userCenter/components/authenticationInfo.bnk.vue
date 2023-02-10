<template>
  <div id="authentication_info">
    <h3 class="content_com_tit">商家信息</h3>
    <div class="show_info_item padding_t_10">
      <span class="info_label special_info_label">企业LOGO</span>
      <div class="info_img">
        <el-image :src="imgUrl" fit="contain" class="img_box" :preview-src-list="[imgUrl]">
          <div slot="error" class="image-slot">
            <span v-if="!imgUrl" class="no_img">未上传</span>
          </div>
        </el-image>
      </div>
    </div>
    <div class="show_info_item">
      <span class="info_label">企业名称</span>
      <span class="info_val">{{authData.companyName || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">社会信用代码</span>
      <span class="info_val">{{authData.creditCode || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">企业地址</span>
      <span class="info_val">{{authData.provinceName + authData.cityName + authData.areaName + authData.address || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">联系人</span>
      <span class="info_val">{{authData.contactsName || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">手机号码</span>
      <span class="info_val">{{authData.contactsTel || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">电子邮箱</span>
      <span class="info_val">{{authData.contactsEmail || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">公司介绍</span>
      <span class="info_val">{{authData.profile || '未填写'}}</span>
    </div>
    <h3 class="content_com_tit">法人信息</h3>
    <div class="show_info_item padding_t_10">
      <span class="info_label">法人姓名</span>
      <span class="info_val">{{authData.legalPerson || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">法人联系电话</span>
      <span class="info_val">{{authData.legalPersonTel || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">法人身份证号码</span>
      <span class="info_val">{{authData.legalPersonId || '未填写'}}</span>
    </div>
    <div class="show_info_item">
      <span class="info_label">法人电子邮箱</span>
      <span class="info_val">{{authData.legalPersonEmail || '未填写'}}</span>
    </div>
    <h3 class="content_com_tit">认证信息</h3>
    <div class="show_info_item padding_t_10">
      <span class="info_label special_info_label">营业执照</span>
      <div class="info_img2">
        <el-image :src="imgUrl1" fit="contain" class="img_box" :preview-src-list="[imgUrl1]">
          <div slot="error" class="image-slot">
            <span v-if="!imgUrl1" class="no_img">未上传</span>
          </div>
        </el-image>
      </div>
    </div>
    <div class="show_info_item">
      <span class="info_label special_info_label">法人身份证</span>
      <div class="info_img2">
        <el-image :src="imgUrl2" fit="contain" class="img_box" :preview-src-list="[imgUrl2]">
          <div slot="placeholder" class="image-slot">
            <span v-if="!imgUrl2" class="no_img">未上传</span>
          </div>
        </el-image>
        <el-image :src="imgUrl3" fit="contain" class="img_box" :preview-src-list="[imgUrl3]">
          <div slot="error" class="image-slot">
            <span v-if="!imgUrl3" class="no_img">未上传</span>
          </div>
        </el-image>
      </div>
    </div>
    <!-- 子账号不允许变更企业信息，所以子账号不显示企业信息变更按钮 -->
    <div class="content_btn" v-if="$store.getters.userInfo.userGroup !== 'subaccount'">
      <el-button type="primary" @click="goEditAuth">商家信息变更</el-button>
    </div>
  </div>
</template>

<script>
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
        imgUrl: '',
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: '',
        imgConfigUrl: process.env.VUE_APP_IMG_URL,
      }
    },
    watch: {
      authData: {
        handler: function (val) {
          if(val.legalPersonIdPics) {
            let legalPersonIdPics = val.legalPersonIdPics.split(',')
            this.imgUrl = val.companyLogo ? this.imgConfigUrl + val.companyLogo : ''
            this.imgUrl1 = val.licensePic ? this.imgConfigUrl + val.licensePic : ''
            this.imgUrl2 = this.imgConfigUrl + legalPersonIdPics[0]
            this.imgUrl3 = this.imgConfigUrl + legalPersonIdPics[1]
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      goEditAuth() {
        this.$emit('goForm', 1)
      }
    },
  }
</script>

<style lang="scss" scoped>
#authentication_info {
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
  .show_info_item {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #595959;
    padding-top: 40px;
    display: flex;
    .info_label {
      display: inline-block;
      width: 308px;
      box-sizing: border-box;
      text-align: right;
      padding-right: 20px;
      margin-right: 22px;
    }
    .info_val {
      width: calc(100% - 616px);
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #0D0D0D;
    }
    .special_info_label {
      padding-top: 16px;
    }
    .info_img, .info_img2 {
      .img_box {
        width: 98px;
        height: 98px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #D9D9D9;
        border-radius: 10px;
        font-size: 12px;
        color: #0D0D0D;
        background-color: #fff;
        ::v-deep .el-image__inner {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 0;
        }
      }
    }
    .info_img2 {
      display: flex;
      .img_box {
        width: 202px;
        height: 115px;
        margin-right: 20px;
      }
    }
  }
  .padding_t_10 {
    padding-top: 10px;
  }
  .content_btn {
    height: 80px;
    border-top: 1px solid #D9D9D9;
    box-sizing: border-box;
    padding: 30px 0 0 330px;
    margin-top: 30px;
    .el-button {
      width: 168px;
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
</style>
