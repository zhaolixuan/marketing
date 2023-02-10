<template>
  <div id="authentication_form">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="308px" class="form_box">        
      <h3 class="content_com_tit" :style="approvStatus === 'unauth' ? 'margin-top: 0px;' : ''">商家信息</h3>
      <el-form-item :show-message='formData.companyLogo ? false : true' label="企业LOGO" prop="companyLogo" class="common_upload_form_item">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="listImgUrlSuccess"
          :before-upload="beforeImgUpload">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <div class="upload_icon_box" v-else>
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <span>点击上传</span>
          </div>
        </el-upload>
        <span class="upload_text">支持JPG、JPEG、PNG格式，大小10M以内</span>
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input
          placeholder="请输入企业名称"
          v-model="formData.companyName"
          maxlength="30"
          clearable
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="社会信用代码" prop="creditCode">
        <el-input
          placeholder="请输入社会信用代码"
          v-model="formData.creditCode"
          maxlength="18"
          clearable
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业地址" class="special_form_item area_wrapper" required>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item prop="provinceCode">
              <el-select v-model="formData.provinceCode" placeholder="省份" @change="provinceChange" class="addr_input">
                <el-option v-for="(item, index) in provinceList" :key="index+item.id" :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="cityCode">
              <el-select v-model="formData.cityCode" placeholder="城市" @change="cityChange" class="addr_input">
                <el-option v-for="(item, index) in cityList" :key="index+item.id" :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="areaCode">
              <el-select v-model="formData.areaCode" placeholder="县区" @change="countyChange" class="addr_input">
                <el-option v-for="(item, index) in countyList" :key="index + item.id" :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address">
              <el-input placeholder="详细地址" v-model="formData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="联系人" prop="contactsName">
        <el-input placeholder="请输入联系人" v-model="formData.contactsName" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="contactsTel">
        <el-input
          v-model="formData.contactsTel" 
          @blur="formData.contactsTel = $event.target.value"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
          placeholder="请输入手机号码"
          maxlength="11"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 如果商家信息变更的时候手机号没有修改就不显示验证码的输入框 -->
      <el-form-item label="短信验证码" prop="smsCode" v-if="formData.contactsTel !== authData.contactsTel">
        <el-input placeholder="请输入短信验证码" v-model="formData.smsCode"></el-input>
        <verification-code class="yzmBtn" :msgType="2" :phone="formData.contactsTel" key="2"></verification-code>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="contactsEmail">
        <el-input placeholder="请输入电子邮箱" v-model="formData.contactsEmail" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司介绍" prop="profile" class="special_form_item">
        <el-input type="textarea" :autosize="{minRows: 5, maxRows: 10}" :maxlength="5000" v-model="formData.profile" clearable></el-input>
      </el-form-item>
      <h3 class="content_com_tit">法人信息</h3>
      <el-form-item label="法人姓名" prop="legalPerson">
        <el-input placeholder="请输入法人姓名" v-model="formData.legalPerson" clearable></el-input>
      </el-form-item>
      <el-form-item label="法人联系电话" prop="legalPersonTel">
        <el-input 
          v-model="formData.legalPersonTel"
          @blur="formData.legalPersonTel = $event.target.value"
          onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"
          placeholder="请输入法人联系电话"
          maxlength="11"
          clearable
      ></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号码" prop="legalPersonId">
        <el-input placeholder="请输入法人身份证号码" maxlength="18" v-model="formData.legalPersonId" clearable></el-input>
      </el-form-item>
      <el-form-item label="法人电子邮箱" prop="legalPersonEmail">
        <el-input placeholder="请输入法人电子邮箱" v-model="formData.legalPersonEmail" clearable></el-input>
      </el-form-item>
      <h3 class="content_com_tit">认证信息</h3>
      <el-form-item label="营业执照" :show-message='formData.licensePic ? false : true' prop="licensePic" class="common_upload_form_item special_form_item">
        <el-upload
          class="avatar-uploader2"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="listImgUrlSuccess1"
          :before-upload="beforeImgUpload">
          <img v-if="imgUrl1" :src="imgUrl1" class="avatar2">
          <div class="upload_icon_box" v-else>
            <img src="../../../static/images/pz-icon.png" style="width:28px; height: 24px;" class="avatar-uploader-icon2">
            <span>点击上传营业执照</span>
          </div>
        </el-upload>
        <span class="upload_text special_item">将原件或盖章的复印件扫描、拍照后上传。图片格式：jpeg、jpg、png，大小10M以内</span>
      </el-form-item>
      <el-form-item label="法人身份证" required class="common_upload_form_item special_form_item">
        <el-form-item prop="legalPersonIdPics" :show-message='formData.legalPersonIdPics ? false : true'>
          <el-upload
            class="avatar-uploader2"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="listImgUrlSuccess2"
            :before-upload="beforeImgUpload">
            <img v-if="imgUrl2" :src="imgUrl2" class="avatar2">
            <div class="upload_icon_box" v-else>
              <img src="../../../static/images/gh-icon.png" style="width:26px; height: 28px;" class="avatar-uploader-icon2">
              <span>点击上传身份证国徽面</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="legalPersonIdPicsBehind" :show-message='formData.legalPersonIdPicsBehind ? false : true'>
          <el-upload
            class="avatar-uploader2"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="listImgUrlSuccess3"
            :before-upload="beforeImgUpload">
            <img v-if="imgUrl3" :src="imgUrl3" class="avatar2">
            <div class="upload_icon_box" v-else>
              <img src="../../../static/images/renxiang-icon.png" style="width:30px; height: 28px;" class="avatar-uploader-icon2">
              <span>点击上传身份证人像面</span>
            </div>
          </el-upload>
        </el-form-item>
        <span class="upload_text special_item">请上传法人身份证正反面，复印件需加盖企业。图片格式：jpeg、jpg、png，大小10M以内</span>
      </el-form-item>
    </el-form>
    <div class="content_btn">
      <el-button type="primary" @click="submitForm('formData')">提交</el-button>
      <el-button @click="resetForm('formData')">取消</el-button>
    </div>
  </div>
</template>
<script>
import verificationCode from './verificationCode.vue'
import {queryArea, sendAuthInfo} from '@/api/userCenter'
import {basicQuery} from '@/api/hqzc'
export default {
  components: {
    verificationCode
  },
  props: {
    authData: {
      type: Object,
      require: false,
      default: () => {}
    }
  },
  data() {
    return {
      approvStatus: '',
      uploadUrl: '',
      provinceList: [],
      cityList: [],
      countyList: [],
      imgConfigUrl: process.env.VUE_APP_IMG_URL,
      imgUrl: "",
      imgUrl1: "",
      imgUrl2: "",
      imgUrl3: "",
      formData: {
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
        legalPersonIdPicsBehind: null, // 法人身份证照片国徽面
        licensePic: null, // 营业执照
      },
      rules: {
        companyLogo: [{ required: true, message: "请上传企业LOGO", trigger: "change" }],
        companyName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        creditCode: [{ required: true, message: "请输入统一社会信用代码", trigger: "blur" }],
        provinceCode: [{ required: true, message: "请选择省份", trigger: "change" }],
        cityCode: [{ required: true, message: "请选择城市", trigger: "change" }],
        areaCode: [{ required: true, message: "请选择区域", trigger: "change" }],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        contactsName: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        contactsTel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
        contactsEmail: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: "blur" }
        ],
        profile: [{ required: true, message: "请输入公司介绍", trigger: "blur" }],
        legalPerson: [{ required: true, message: "请输入法人姓名", trigger: "blur" }],
        legalPersonId: [
          { required: true, message: "请输入法人身份证号", trigger: "blur" },
          { pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: "blur" }
        ],
        legalPersonTel: [
          { required: true, message: "请输入法人联系电话", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        legalPersonEmail: [
          { required: true, message: "请输入法人电子邮箱", trigger: "blur" },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: "blur" }
        ],
        licensePic: [{ required: true, message: "请上传营业执照", trigger: "blur" }],
        legalPersonIdPics: [{ required: true, message: "请上传身份证国徽面", trigger: "change" }],
        legalPersonIdPicsBehind: [{ required: true, message: "请上传身份证人像面", trigger: "change" }],
      },
      disabled: false
    }
  },
  created () {
    // 判断是不是从企业详情跳转来的
    let query = this.$route.query;
      this.approvStatus = this.$store.getters.userInfo.supplierApprovalStatus
      this.getAreaData();
      this.uploadUrl = process.env.VUE_APP_IMG_URL_FILE + localStorage.token;
      if(this.approvStatus !== 'unauth') {
        if(this.authData && Object.keys(this.authData).length > 0) {
          this.formData = Object.assign(this.formData, this.authData)
          // 身份证正反面的处理
          console.log(this.formData.legalPersonIdPics)
          let legalPersonIdPics = (this.formData.legalPersonIdPics).split(',')
          this.formData.legalPersonIdPics = legalPersonIdPics[0]
          this.formData.legalPersonIdPicsBehind = legalPersonIdPics[1]
          // 图片回显处理
          this.imgUrl = this.imgConfigUrl + this.formData.companyLogo
          this.imgUrl1 = this.imgConfigUrl + this.formData.licensePic
          this.imgUrl2 = this.imgConfigUrl + this.formData.legalPersonIdPics
          this.imgUrl3 = this.imgConfigUrl + this.formData.legalPersonIdPicsBehind
        }
      }
    if(query.companyName && this.approvStatus === 'unauth'){
      this.disabled = true;
      this.getCompanyDetail(query.companyName);
    }
    
  },
  methods: {
    //上传品牌图片成功
    listImgUrlSuccess: function(res, file) {
      this.formData.companyLogo = res.id;
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    listImgUrlSuccess1: function(res, file) {
      this.formData.licensePic = res.id;
      this.imgUrl1 = URL.createObjectURL(file.raw);
    },
    listImgUrlSuccess2: function(res, file) {
      this.formData.legalPersonIdPics = res.id;
      this.imgUrl2 = URL.createObjectURL(file.raw);
    },
    listImgUrlSuccess3: function(res, file) {
      this.formData.legalPersonIdPicsBehind = res.id;
      this.imgUrl3 = URL.createObjectURL(file.raw);
    },
    //图片上传相关方法
    beforeImgUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isJPEG = testmsg === "jpeg";
      const isPNG = testmsg === "png";
      const isJPG = testmsg === "jpg";
      const isSize = file.size / 1024 / 1024 <= 10;
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("图片只能是JPG格式、JPEG格式或PNG格式!");
      }
      if (!isSize) {
        this.$message.error(`图片大小不能超过 10MB!`);
      }
      console.log((isJPG || isPNG || isJPEG) && isSize)
      return (isJPG || isPNG || isJPEG) && isSize;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = this.formData
          let params = {
            id: obj.id,
            ifChangeTel: obj.contactsTel !== this.authData.contactsTel,
            smsCode: obj.smsCode,
            companyName: obj.companyName,
            creditCode: obj.creditCode,
            provinceCode: obj.provinceCode,
            cityCode: obj.cityCode,
            areaCode: obj.areaCode,
            provinceName: obj.provinceName,
            cityName: obj.cityName,
            areaName: obj.areaName,
            address: obj.address,
            contactsName: obj.contactsName,
            contactsTel: obj.contactsTel,
            contactsPhone: obj.contactsPhone,
            contactsEmail: obj.contactsEmail,
            companyLogo: obj.companyLogo,
            profile: obj.profile,
            legalPerson: obj.legalPerson,
            legalPersonId: obj.legalPersonId,
            legalPersonTel: obj.legalPersonTel,
            legalPersonEmail: obj.legalPersonEmail,
            legalPersonIdPics: `${obj.legalPersonIdPics},${obj.legalPersonIdPicsBehind}`,
            licensePic: obj.licensePic
          }
          sendAuthInfo(params).then(res => {
            if(res && res.data && res.data.success) {
              // TODO: 还要改一下
              this.$message({
                message: '提交成功',
                type: 'success'
              }); 
              this.$store.dispatch('getUserInfo').then(res => {
                this.$emit('updateAuthInfo')
              })
              this.disabled = false;
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
      });
    },
    resetForm(formName) {
      if(this.approvStatus !== 'unauth') {
        this.$emit('goInfo', 0)
      }
      this.$refs[formName].resetFields()
    },
    // 获取省市区数据
    getAreaData () {
      queryArea().then(res => {
        if(res.data.success) {
          this.provinceList = res.data.retData
          // 处理编辑时省市区回显
          if(this.$store.getters.userInfo.supplierApprovalStatus !== 'unauth') {
            this.provinceChange(this.formData.provinceCode)
            this.cityChange(this.authData.cityCode)
            this.countyChange(this.authData.areaCode)
          }
        }
      })
    },
    provinceChange (e) {
      this.$set(this.formData, 'cityCode', '')
      this.$set(this.formData, 'areaCode', '')
      this.$set(this.formData, 'cityName', '')
      this.$set(this.formData, 'areaName', '')
      this.provinceList.forEach(item => {
        if (item.id === e) {
          this.formData.provinceName = item.name
          this.formData.provinceCode = e
          this.cityList = item.children
          return false
        }
      })
    },
    cityChange (e) {
      this.$set(this.formData, 'areaCode', '')
      this.$set(this.formData, 'areaName', '')
      this.cityList.forEach(item => {
        if (item.id === e) {
          this.formData.cityName = item.name
          this.formData.cityCode = e
          this.countyList = item.children
          return false
        }
      })
    },
    countyChange (e) {
      this.countyList.forEach(item => {
        if (item.id === e) {
          this.formData.areaName = item.name
          this.formData.areaCode = e
          return false
        }
      })
    },
    async getCompanyDetail(companyName){
      const res = await basicQuery({
        companyName: companyName
      });
      const { retData, success } = res.data;
      if(success){
        const retDataKeys = ['entName','creditCode','dom','phoneNumber','email','frName'];
        const formDataKeys = ['companyName','creditCode','address','contactsPhone','contactsEmail','legalPerson'];
        formDataKeys.forEach((key, index) => this.formData[key] = retData[retDataKeys[index]] || "");
      }
    }
  },
}
</script>
<style lang="scss" scoped>
#authentication_form {
  .yellow {
    color: #FA8600;
  }
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
        color: #929292;
      }
      .special_item {
        width: 260px;
      }
    }
  }
  .form_box {
    ::v-deep .el-form-item {
      width: 788px;
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
      }
    }
    .special_form_item {
      width: 1278px;
      ::v-deep .el-form-item__content {
        .el-form-item {
          width: auto;
        }
      }
    }
    .area_wrapper {
      ::v-deep .el-col {
        width: 153px;
        padding: 0 !important;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        .el-form-item--small {
          width: 153px;
        }
      }
      ::v-deep .el-col-12 {
        width: 480px;
        .el-form-item {
          width: 100%!important;
        }
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 0 !important;
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
  .avatar-uploader,.avatar-uploader2 {
    margin-right: 20px;
    ::v-deep .el-upload {
      .upload_icon_box {
        width: 98px;
        height: 98px;
        background-color: #fff;
        border: 1px solid #D9D9D9;
        border-radius: 10px;
        font-size: 12px;
        color: #929292;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .avatar-uploader-icon, .avatar-uploader-icon2 {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #0E67FF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }
  .avatar-uploader2 {
    margin-right: 20px;
    ::v-deep .el-upload {
      .upload_icon_box {
        width: 202px;
        height: 115px;
      }
    }
  }
  .avatar-uploader-icon2 {
    border-radius: 0;
    background-color: transparent;
  }
  .avatar2 {
    width: 202px;
    height: 115px;
    display: block;
  }
}  
</style>
