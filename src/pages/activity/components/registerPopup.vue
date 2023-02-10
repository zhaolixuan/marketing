<template>
  <div class="register-popup">
    <el-dialog :visible.sync="openPopup" custom-class='dialog' width="528px"  :before-close="handleClose" :close-on-click-modal='false'>
        <div slot="title" class="title">{{flag?'报名成功':'报名信息'}}</div>
      <div class="form">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position='right'>
              <el-form-item label="姓名 : " :prop="flag?'':'contactPerson'" class='form-item'>
                <span v-show="flag">{{form.contactPerson||'未填写'}}</span>
                <el-input  v-show="!flag" v-model="form.contactPerson" class="public-style"  placeholder="请输入真实姓名"  maxlength='24' show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="手机号 : " :prop="flag?'':'contact'" class='form-item'>
                <span  v-show="flag">{{form.contact||'未填写'}}</span>
                 <el-input v-show="!flag" v-model="form.contact"  placeholder="请输入手机号"  class="public-style"></el-input>
              </el-form-item>  
              <el-form-item label="所属公司 : " :prop="flag?'':'company'" class='form-item'> 
                <span  v-show="flag">{{form.company||'未填写'}}</span>
                <el-input  v-show="!flag" type="text" placeholder="请输入公司" maxlength='60' show-word-limit v-model="form.company"  class="public-style"></el-input>  
              </el-form-item>  
              <el-form-item label="邮箱 : " :prop="flag?'':'email'" class='form-item'>
                <span  v-show="flag">{{form.email||'未填写'}}</span>
                 <el-input  v-show="!flag" v-model="form.email"  placeholder="请输入邮箱"  class="public-style"></el-input>
              </el-form-item>  
               <el-form-item label="参加人数 : " :prop="flag?'':'participants'" class='form-item'>
                 <span  v-show="flag">{{form.participants||'未填写'}}</span>
                 <el-input  v-show="!flag" v-model="form.participants"  placeholder="请输入参加人数"  type="number" class="public-style"></el-input>
              </el-form-item>  
               <el-form-item label="备注 : " :prop="flag?'':'note'" class='form-item'> 
                 <span  v-show="flag">{{form.note||'未填写'}}</span>
                <el-input  v-show="!flag" type="textarea" placeholder="请输入"   v-model="form.note"  class="public-style"></el-input>  
              </el-form-item>  
          </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-show="!flag">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitFrom('form')" class="submit-btn">确 定</el-button>
      </div>
       <div slot="footer" class="dialog-footer" v-show="flag">
        <el-button @click="handleClose">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postActivitySignData } from "@/api/activity.js"
export default {
  data() {
     var validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
      var checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      callback()
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  }
  　 const blurText = async(rule, value, callback) => {  
   　　   const boolean = String(value).includes('.')
  　　    if (boolean) {
    　　   callback(new Error('请输入正整数'))
    　　  }else{
            callback()
    }
          
   　　 }
    return {
        openPopup:false,
        form:{
          contactPerson:'',
          contact:'',
          company:'',
          email:'',
          participants:'',
          note:'',
          activityId:'',

        },
        rules:{
          contactPerson:[{required: true,message: '不能为空'}],
          contact:[{required: true, validator: validatorPhone, trigger: 'blur'}],
          email:[{validator: checkEmail, trigger: 'blur'}],
          company:[{required: false,message: '不能为空'}],
          participants:[{required: false,message: '不能为空'},{ validator: blurText, trigger: 'blur'}],
          note:[{required: false,message: '不能为空'}]
        },
        flag:0,//0填报  1成功
    };
  },
  props:{
      isOpen:{
          type:Boolean,
          default:false
      },
      detail:{
        required:true,
      }
  },
  watch:{
      isOpen:function(n,o){
          this.openPopup = n
      }
  },
  methods:{
      handleClose(){
          this.$refs.form.resetFields();
          this.flag =0
          this.$emit('update:isOpen',false)  
      },
      submitFrom(ref){
         this.$refs[ref].validate((valid) => {
          if (valid) {
            this.form.activityId = this.detail.id
            postActivitySignData(this.form).then(res=>{
              if(!res.data.success){
                this.$message(res.data.message);
                return
              }
               this.flag =1
               var msg = this.detail.isVerify?'报名成功':'报名成功,管理员审核中...'
                this.$message({
                  message: msg,
                  type: 'success'
                });
                this.$parent.updata()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style lang="scss" scoped>
.dialog{
  border-radius: 5px;
}
.title{
    text-align: center;
    color: #0D0D0D;
    font-size: 18px;
    font-weight: 600;
}
.dialog-footer{
    box-sizing: border-box;
    padding-left: 50px;
    text-align: center;
}
.submit-btn{
    width:200px ;
    background: #0E67FF;
    
}
.public-style{
  width: 86%;
  border-radius: 10px;
}
.form-item{
  margin-bottom: 24px;
}
</style>