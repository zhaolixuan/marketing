<template>
  <div class="authentication-wrap">
    <div class="authentication-content">
      <ul class="authentication-line">
        <li v-for="(item,index) in lineData" :key="index">
          <i :class="{'active':activeIndex == item.id,'already-active':alreadyAtiveIndex>=item.id}">{{item.name}}</i>
          <em :class="{'already-active':alreadyAtiveIndex>=item.id}">---------</em>
        </li>
      </ul>
      <div class="authentication-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
          <template v-if="activeIndex == 0">
            <el-form-item label="企业名称">
              <el-input v-model="form.name" placeholder="请输入企业全称"></el-input>
            </el-form-item>
            <el-form-item label="营业执照">
              <single-upload v-model="form.license"></single-upload>
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input v-model="form.corpName" placeholder="此处应为识别接口返回信用代码"></el-input>
            </el-form-item>
            <el-form-item label="企业地址">
              <el-input v-model="form.address" placeholder="请输入企业地址"></el-input>
            </el-form-item>
            <el-button type="primary" @click="nextStep(1)">下一步</el-button>
          </template>
          <template v-if="activeIndex == 1">
            <div class="idCard-img-box">
              <el-form-item label="法人身份证人像面">
                <single-upload v-model="form.idCardFront"></single-upload>
              </el-form-item>
              <el-form-item label="法人身份证 国徽面">
                <single-upload v-model="form.idCardBack"></single-upload>
              </el-form-item>
            </div>
            <el-form-item label="姓名">
              <el-input v-model="form.code" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.IdNumber" placeholder="请输入法人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="证件有效期">
              <el-date-picker
                v-model="form.validity"
                type="date"
                placeholder="请选择证件有效期">
              </el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="nextStep(2)">下一步</el-button>
          </template>
          <template v-if="activeIndex == 2">
            <el-form-item label="手机号">
              <el-input v-model="form.tell" placeholder="请输入法人手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码"> 
              <el-input v-model="form.authCode" placeholder="请输入验证码"></el-input>
              <div class="authBtn" @click="getAuth">{{authText}}</div>
            </el-form-item>
            <el-form-item class="auth-small-btn">
              <el-button>取消</el-button>
              <el-button>提交认证</el-button>
            </el-form-item>
          </template>
        </el-form>
      </div> 
    </div> 
  </div> 
</template>
<script> 
import SingleUpload from '@/components/singleUpload'

export default {
  components:{SingleUpload},
    data() {
      return {
        alreadyAtiveIndex: -1,
        activeIndex: 0, //步骤条 
        lineData:[{
           id: '0',
           name: '企业认证',
           end: false,
        },{
          id:  '1',
          name: '企业法人认证',
          end: false,
        },{
          id:'2',
          name:'法人手机认证',
          end: false,
        }],
        form: {
          name: '', //企业名称
          code: '',//统一社会信用代码
          address: '',//企业地址
          corpName: '',//法人姓名
          IdNumber: '',//法人身份证号
          validity: '',//有效期
          tell: '',//手机号
          authCode: '',//验证码
          //营业执照
          license: '',
          licenseImage: '',
          idCardFront: '',
          idCardBack: '',
        },
        authText:'获取验证码',
        rules: { //校验规则
          phone: [
            { required: true, message: "请输入手机号", trigger: "blur" },
          ],
        },
        hideUpload: false,
        uploadUrl: "",
      };
    },
    methods: {
      //获取验证码
      getAuth() {
        if (!this.form.tell) {
          this.$message.warning("请填写手机号");
          return;
        }
        this.authText = 60;
        this.timer = setInterval(() => {
          this.authText--;
          if (this.authText === 0) {
            clearInterval(this.timer);
            this.timer = false;
            this.authText = "重新发送";
          }
        }, 1000);
      },
      //下一步
      nextStep(index) {
        this.alreadyAtiveIndex = index - 1;
        this.activeIndex = index;
      },
    }
  };
  
</script>
<style lang="scss" scoped>
// @import '../../static/css/common.css';
.authentication-wrap{
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-color: #ffffff;
  ::v-deep .el-form-item__content::after, ::v-deep .el-form-item__content::before,.el-button--defaul::before, .el-button--defaul::after, .el-form-item::after, .el-form-item::before,.el-menu:after,.el-menu:before {
    content: none;
  }
  .authentication-content{
    width: 556px;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    margin: auto;
    font-family: "Microsoft YaHei";
    .authentication-line{
      display: flex;
      justify-content: space-between;
      font-size: 22px;
      font-weight: 500;
      color: #0D0D0D;
      line-height: 30px;
      background: none;
      border-bottom: 0;
      li:last-child em{
        display: none ;
      }
      li{
        height: 68px;
        line-height: 68px;
        font-size: 22px;
        font-weight: 500;
        color: rgba($color: #0d0d0d, $alpha: 0.36);
        .active{
          padding: 18px 0;
          border-bottom: 2px solid #409EFF;
          color: #303133;
        }
        .already-active{
          color: #6ED303;
        }
      }
    }
    .el-menu-item:hover {
      background: none;
    }
    .authentication-form{
      margin: 48px auto;
      .el-form-item--small ::v-deep .el-form-item__label{
        font-size: 14px;
        color: #0D0D0D;
        height: 48px;
        margin-top: 14px;
        line-height: 20px;
        padding: 0 20px 0 0;
      }
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 30px;
      }
      ::v-deep .el-form-item__content{
        position: relative;
        overflow: hidden;
        .el-input__prefix{
          display: none;
        }
        .el-input__inner{
          padding: 0 20px;
        }
      }
      .el-date-editor{
        width: 100%;
      }
      ::v-deep .el-input{
        height: 48px;
        border-radius: 10px;
        input{
          height: 100%;
          border-radius: 10px;
          box-sizing: border-box;
        }
      }
      .upload-demo{
        width: 158px;
        height: 88px;
        border-radius: 10px;
        border: none;
        float: left;
        ::v-deep .el-upload{
          line-height: 17px;
        }
        .el-upload--picture-card{
          .el-icon-circle-plus{
            font-size: 24px;
            color: rgba($color: #0E67FF, $alpha: 0.68);
            margin: 0 0 6px;
          }
        }
        ::v-deep .el-upload--picture-card{
          width: 158px;
          height: 88px;
          background-color: rgba(13,13,13,0.06);
          border-radius: 10px;
          padding: 13px 0 0;
        }
        .el-upload--picture-card .el-upload__text{
          line-height: 17px;
          font-size: 12px;
          color: rgba($color: #0d0d0d, $alpha: 0.36);
        }
      }
      .upload-title{
        font-size: 12px;
        color: rgba($color: #0d0d0d, $alpha: 0.36);
        float: left;
        margin: 10px 0 0 20px;
      }
    }
    .el-button{
      width: 466px;
      height: 48px;
      background: rgba(14, 103, 255, 1);
      border-radius: 10px;
      display: block;
      margin: 40px 0 0 90px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
    }
    .idCard-img-box{
      display: flex;
      justify-content: space-between;
    }
    .auth-small-btn{
      ::v-deep .el-form-item__content{
        display: flex;
        justify-content: space-between;
        button{
          width: 226px;
          height: 48px;
          border-radius: 10px;
          border: 1px solid #C1C1C1;
          box-sizing: border-box;
          background: #fff;
          font-size: 16px;
          font-weight: 500;
          color: rgba($color: #0d0d0d, $alpha: 0.36);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 22px 0;
        }
        button:last-child{
          background: rgba(14, 103, 255, 1);
          border-radius: 10px;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          border: none;
        }
      }
    }
    .authBtn{
      width: 120px;
      height: 48px;
      background: rgba(13, 13, 13, 0.06);
      border-radius: 0px 10px 10px 0px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      color: rgba($color: #0d0d0d, $alpha: 0.36);
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
