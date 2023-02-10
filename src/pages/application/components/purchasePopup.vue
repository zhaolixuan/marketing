<template>
  <div class="pup">
    <el-dialog
      title="购买意向"
      :visible.sync="dialogVisible"
      width="31%">
      <div class="content">
        <el-form :inline="false"  :model="formInline"  :rules="rules" ref="form">
            <el-form-item label="公司名称：" prop="companyName">
              {{ formInline.companyName }}
            </el-form-item>
            <el-form-item label="申请人姓名：" prop="applicantName">
              {{ formInline.applicantName }}
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone">
              {{ formInline. phone }}
            </el-form-item>
             <el-form-item label="我遇到的问题：" prop="problems">
              
              <el-input
                type="textarea"
                :rows="7"
                maxlength="300"
                show-word-limit
                resize='none'
                placeholder="请在此处预留您遇到的问题和使用的平台"
                v-model="formInline.problems">
              </el-input>
            </el-form-item>
        </el-form>
        <div class="submitBtn" >
           <div @click="submitEv('form')">提 交 </div>
        </div>
      </div>
     
    </el-dialog>

  </div>
</template>

<script>
import {addSave} from "../../../api/application"
export default {
  props:{
    linkUrl:{
      type:String,
      required:false,
      default:''
    }
  },
  data(){
    return{
      dialogVisible:false,
      formInline:{
        companyName:'企业',
        applicantName:'',
        phone:'',
        problems:''
      },
      rules:{
        companyName:[{required: true}],
        applicantName:[{required: true}],
         phone:[{required: true}],
        problems:[{required: true,message: '不能为空'}],
      },
      activeStore:{}
    }
  },
  mounted(){
    console.log(JSON.parse( localStorage.vuex).userInfo.tel)
    var obj = JSON.parse( localStorage.vuex).userInfo
    this.formInline.phone = obj.tel
    this.formInline.applicantName = obj.loginName
    if(obj.companyInfo){
      this.formInline.companyName = obj.companyInfo.companyName
    }
  },
  methods:{
    open(params){
      this.activeStore = params
      this.dialogVisible = true
    },
    close(){
       this.dialogVisible = false
    },
    submitEv(ref){
       this.$refs[ref].validate((valid)=>{
         if(valid){
           
            addSave(Object.assign(this.formInline,this.activeStore)).then(res=>{
               this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs[ref].resetFields();
              this.close()
              this.$parent.storeIsSave&&this.$parent.storeIsSave()
              if(this.linkUrl){
                 
                  window.open(this.linkUrl)
                  
              }
            })
         }else{
           return false
         }
       })
     
      
    }
  }
}
</script>

<style  lang="scss" scoped>
.pup{
  .content{
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 441px;
    background-color: #fff;
    .submitBtn{
      margin-top: 30px;
      div{
        width: 106px;
        height: 40px;
        background-color: #0E67FF;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-left: auto;
      }
    }
  }
  ::v-deep .el-dialog__header{
    background-color: rgba(237,244,255,1);
  }
   ::v-deep .el-dialog__title{
       color:rgba(14,103,255,1) !important;
       font-size: 33px;
       font-family: PingFangSC;
       font-weight: 600;
    }
    ::v-deep .el-dialog__body{
      background-color: rgba(237,244,255,1);
      padding-top: 8px;
    }
}
</style>