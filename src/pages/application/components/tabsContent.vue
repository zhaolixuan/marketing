<template>
  <div class="platform">
    <div class="win"> 
      <ul class="win-ul">
        <li v-if="code==='Windows'&&detailsData.windowsFreeUrl"> <!-- 免费版 windos -->
          <div class="logo">
            <div class="logo-img">
              <img src="../../../static/images/app-store-detail/mian.png" alt="">
              <!-- <img v-show="!item.isFree" src="../../../static/images/app-store-detail/free.png" alt=""> -->
            </div>
            <div class="price">
              <div>免费版</div>
              <div>{{ platfromName.winFree}}</div>
            </div>
          </div>
          <div class="use">
            <div @click="link(detailsData.windowsFreeUrl,true)">立即下载</div>
            <!-- <div v-if="!item.isFree" class="immediately">立即使用</div>
            <div v-if="!item.isFree">软件下载</div>     -->
          </div>
        </li>
        <li v-if="code==='Windows'&&detailsData.windowsPaidUrl"><!-- 付费版 win -->
          <div class="logo">
            <div class="logo-img">
              <img src="../../../static/images/app-store-detail/free.png" alt="">
            </div>
            <div class="price">
              <div>付费版</div>
              <div>{{ platfromName.winNoFree}}</div>
            </div>
          </div>
          <div class="use">
            <div  class="immediately" @click="getUse">立即使用</div>
            <div  @click="atDownload(detailsData.windowsPaidUrl)">软件下载</div>    
          </div>
        </li>
        <li v-if="code==='Windows'&&!detailsData.windowsPaidUrl&&!detailsData.windowsFreeUrl">
          <div>当前该应用暂未提供可下载资源，请填写购买意向或联系客服获取资源</div>
          <div  class="btn-No" @click="NoResources">填写购买意向</div>
        </li>
         <li v-if="code==='Linux'&&detailsData.linuxFreeUrl">                 <!-- 免费版 Linux -->
          <div class="logo">
            <div class="logo-img">
              <img src="../../../static/images/app-store-detail/mian.png" alt="">
              <!-- <img v-show="!item.isFree" src="../../../static/images/app-store-detail/free.png" alt=""> -->
            </div>
            <div class="price">
              <div>免费版</div>
              <div>{{ platfromName.liunxFree}}</div>
            </div>
          </div>
          <div class="use">
            <div @click="link(detailsData.linuxFreeUrl,true)">立即下载</div>
            <!-- <div v-if="!item.isFree" class="immediately">立即使用</div>
            <div v-if="!item.isFree">软件下载</div>     -->
          </div>
        </li>
        <li v-if="code==='Linux'&&detailsData.linuxPaidUrl">               <!-- 付费版 Linux -->
          <div class="logo">
            <div class="logo-img">
              <img src="../../../static/images/app-store-detail/free.png" alt="">
            </div>
            <div class="price">
              <div>付费版</div>
              <div>{{ platfromName.linuxNoFree }}</div>
            </div>
          </div>
          <div class="use">
            <div class="immediately" @click="getUse">立即使用</div>
            <div  @click="atDownload(detailsData.linuxPaidUrl)">软件下载</div>    
          </div>
        </li>
        <li v-if="code==='Linux'&&!detailsData.linuxPaidUrl&&!detailsData.linuxFreeUrl">
          <div>当前该应用暂未提供可下载资源，请填写购买意向或联系客服获取资源</div>
          <div  class="btn-No" @click="NoResources">填写购买意向</div>
        </li>
      </ul>
    </div>
    <div class="win" v-if="code==='MacOS'"> 
      <ul class="win-ul">
        <li>
          <div class="logo">
            <div class="logo-img">
              <!-- <img :src="handelImg(detailsData.appCoverPictureUrl)" alt=""> -->
              <img src="../../../static/images/app-store-detail/macOs.png" alt="">
            </div>
            <div class="price">
              <div>App Store</div>
              <div>MAC OS</div>
            </div>
          </div>
          <div class="use">
            <div  @click="link(detailsData.macosUrl,false)">立即使用</div>  
             <!-- <div v-if="isSave" @click="atDownload(detailsData.macosUrl)">立即下载</div> -->
          </div>
        </li>
      </ul>
    </div>
    <div class="mobile" v-if="code==='移动端'">
      <div class="text">移动端</div>
      <div class="box" v-for="item in goods.platfrom.mobile" :key="item.text">
          <div class="qrcode" v-if="item.qrcode">
            <img :src="item.qrcode" alt="">
          </div>
          <div  v-if="item.qrcode">{{ item.text }}</div>  
      </div>
    </div>
    <div class="h5" v-if="code==='H5'">
      <div class="text">H5 二维码</div>
      <div class="h5-box" v-if="detailsData.h5Url||detailsData.h5PictureUrl">
          <div class="qrcode">
            <img :src="handelImg(detailsData.h5PictureUrl)" alt=""></div>  
          <div class="link">
            <div style="word-break: break-all;">H5链接:  <a :href="detailsData.h5Url">{{detailsData.h5Url}}</a></div>
            <div>请用微信或手机浏览器扫码</div>
          </div>
      </div>
    </div>
    <div class="webPC" v-if="code==='PC-Web'"> <!--云应用-->
      <div class="pc-box">
          <div class="qrcode">
            <img src="../../../static/images/app-store-detail/yun.png" alt=""></div>  
          <div class="link">
             <div class="immediately" @click="PCWeblink(detailsData.webPcUrl,false)">立即使用</div>
            <!-- <div v-if="isSave"  @click="atDownload(detailsData.webPcUrl,true)">软件下载</div>     -->
          </div>
      </div>
    </div>
    <div style="line-height:26px;" v-if="code==='itroduce'" v-html="detailsData.appIntroduce">  <!-- 应用介绍 -->
    </div>
    <div style="line-height:26px;" v-if="code==='edition'" v-html="detailsData.versionTips"><!-- 版本说明 -->
    </div>
    <div style="line-height:26px;" v-if="code==='support'" v-html="detailsData.technicalSupport "> <!-- 技术支持 -->
    </div>
    <div v-if="code==='use'" class="file">
      <div v-for="file in goods.itroduce.file" :key="file.name">
        <div>{{ file.name }}</div>
        <div><a href="javascript:void(0)" @click="atDownload(file.url)">下载</a></div>
      </div>
    </div>
    <div v-if="code==='video'">
      <video :src="handelImg(detailsData.teachVideoUrl)||detailsData.VideoUrl" height="530" width="714" controls="controls" :poster='handelImg(detailsData.appCoverVideoUrl)'></video>
    </div>
     <popup ref="purchase" :linkUrl="linkUrl"></popup>
  </div>
</template>

<script>
import axios from "axios";
import popup from './purchasePopup.vue'
import {  storeIsSave} from "../../../api/application"
export default {
  components:{popup},
  props:{
    code:{
      type:String,
      required:true,
      default:'Windows'
    },
    detailsData:{ // 详情
      type:Object,
      required:true,
      default:()=>{}
    },
    
  },
  computed:{
    returnLocalStrage:function(){
      return localStorage.token?localStorage.token:{}
    }
  },
  watch:{
    detailsData:function(n){
      this.goods.platfrom.mobile = [{qrcode:this.handelImg(n.wechatUrl),text:'微信小程序'},{qrcode:this.handelImg(n.iosUrl),text:'IOS App'},{qrcode:this.handelImg(n.androidUrl),text:'Android App'}]
      this.goods.itroduce.file = []
      this.getWindosFileName(true,n.windowsFreeUrl,'winFree')
      this.getWindosFileName(false,n.windowsPaidUrl,'winNoFree')
      this.getWindosFileName(true,n.linuxFreeUrl,'liunxFree')
      this.getWindosFileName(false,n.linuxPaidUrl,'linuxNoFree')
      // this.getWindosFileName(false,n.macosUrl,'OSX')
      // this.getWindosFileName(false,n.webPcUrl,'PCWeb')
      // this.getWindosFileName(false,n.H5PictureUrl,'WebH5')
      this.getFileName(n.instructions,0)
    }
  },
  mounted(){
    console.log(this.detailsData,'data')
    
  },
  data(){
    return{
      goods:{
        platfrom:{
          mobile:[]
        },
        itroduce:{
          file:[]
        }
      },
      platfromName:{
        winFree:'',
        winNoFree:'',
        liunxFree:'',
        linuxNoFree:'',
        OSX:'',
        PCWeb:'',
        WebH5:''
      },
      isSave:false,
      linkUrl:''
    }
  },
  methods:{
    getUse(){
      if(!(localStorage.token)){
         this.$message('您尚未登录,暂无法使用该应用');
        this.$router.push('/login')
        return
      }
       if(!(JSON.parse( localStorage.vuex).userInfo.companyInfo)){
          this.$message('当前账户未认证，请先认证');
          this.$router.push('/cydn/userCenter/EnterpriseCertification')
          return
        }
         this.storeIsSave()
    },
     storeIsSave(){ //获取是否 登记
        storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.detailsData.id}).then(res=>{
          this.isSave = res.data
          if(!res.data){
            this.$refs.purchase.open({appId:this.detailsData.id,appName:this.detailsData.appName})
          }else{
             this.$message({
          message: '您已提交过购买意向请直接点击下载',
          type: 'success'
        });
          }
        })
      },
    atDownload(src,Splicing){ //地址   是否需要拼接 true 不需要  false 需要
     if(!(localStorage.token)){
         this.$message('您尚未登录,暂无法使用该应用');
        this.$router.push('/login')
        return
      }
       if(!(JSON.parse( localStorage.vuex).userInfo.companyInfo)){
          this.$message('当前账户未认证，请先认证');
          this.$router.push('/cydn/userCenter/EnterpriseCertification')
          return
        }
         storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.detailsData.id}).then(res=>{
          if(res.data){
             let url = Splicing?src:this.handelImg(src)
              let a = document.createElement('a')
              a.href  = url
              a.click()
          }else{
            this.$refs.purchase.open({appId:this.detailsData.id,appName:this.detailsData.appName})
          }
         })
    },
    handelImg(img){
      if(img){
        return process.env.VUE_APP_IMG_URL+img
      }
       return ''     
    },
    getFileName(fileStr,n){
      if(!fileStr) return
       var file = fileStr.split(',')[n]
       if(file){
         axios.get(this.$config.imgUrlFileInfo +file). then( res=>{
          this.goods.itroduce.file.push({url:file,name:res.data[0].oldName})   
          this.getFileName(fileStr,n+1)
        })
       }
    },
    getWindosFileName(iSmianfei,url,key){
      if(!url) return
       axios.get(this.$config.imgUrlFileInfo +url). then( res=>{
          if(iSmianfei){
             this.platfromName[key] = res.data[0].oldName
          }else{
             this.platfromName[key] = res.data[0].oldName
          }
        })
    },
    NoResources(){
       storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.detailsData.id}).then(res=>{
         if(res.data){
            this.$message({
              message: '您已提交过购买意向请联系客服',
              type: 'success'
            });
         }else{
           this.$refs.purchase.open({appId:this.detailsData.id,appName:this.detailsData.appName})
         }
       })
    },
    link(url,is){ //免费版 直接下载
    //  storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.detailsData.id}).then(res=>{
    //    if(res.data){
    //       let src = is?this.handelImg(url):url
    //       let a = document.createElement('a')
    //       a.href  = src
    //       a.click()
    //    }else{
    //      this.$refs.purchase.open({appId:this.detailsData.id,appName:this.detailsData.appName})
    //    }
    //  })
    if(!url){
       this.$message('当前应用没有配置下载链接，请联系客服人员');
       return
    } 
      let src = is?this.handelImg(url):url
              let a = document.createElement('a')
              a.href  = src
              a.click()

       
    },
    PCWeblink(url,is){
        storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.detailsData.id}).then(res=>{
        if(res.data){
            let src = is?this.handelImg(url):url
            let a = document.createElement('a')
            a.href  = src
            a.click()
        }else{
          this.linkUrl = is?this.handelImg(url):url
          this.$refs.purchase.open({appId:this.detailsData.id,appName:this.detailsData.appName})
        }
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.platform{
  box-sizing: border-box;
  padding: 10px 30px;
  .win{
    .win-ul{
      li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        .logo{
          width: 350px;
          display: flex;
          .logo-img{
            width: 56px;
            height: 56px;
            margin-right: 15px;
            display: flex;
            img{
              width: 100%;
            }
          }
          .price{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            &>:nth-child(1){
              font-size: 24px;
              color: rgba(29,29,31,1);
            }
             &>:nth-child(2){
              font-size: 16px;
              color: rgba(13,13,13,0.7);
            }
          }
        }
        .use{
          cursor: pointer;
          display: flex;
          div{
            width: 106px;
            height: 40px;
            background-color:rgba(14,103,255,1) ;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            margin-left: 15px;
          }
          .immediately{
            cursor: pointer;
            background-color: rgba(255,103,0,1);
          }
        }
      }
      li+li{
        border-top: 1px dashed rgba(0,0,0,0.1) ;
      }
    }
  }
  .mobile{
    .text{
      font-size: 24px;
      color: #1D1D1F;
      margin-bottom: 20px;
    }
    .box{
      display: inline-block;
      text-align: center;
      margin-right: 20px;
      color: rgba(13,13,13,0.7);
      .qrcode{
        width: 122px;
        height: 122px;
        background-color: #D8D8D8;
        margin-bottom: 15px;
        img{
           width: 122px;
        height: 122px;
        }
      }
    }
  }
  .h5{
     .text{
      font-size: 24px;
      color: #1D1D1F;
      margin-bottom: 20px;
    }
    .h5-box{
      display: flex;
      .qrcode{
        width: 122px;
        height: 122px;
        background-color: #D8D8D8;
        margin-bottom: 15px;
        margin-right: 20px;
        img{
           width: 122px;
           height: 122px;
        }
      }
      .link{
        height: 122px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        div{
          max-width: 588px;
    word-break: break-all;
          margin-top: 10px;
          color: rgba(13,13,13,0.7);
        }
      }
    }
  }
  .webPC{
    .pc-box{
      display: flex;
      align-items: center;

      .qrcode,.link{
        margin-right: 30px;
        display: inline-block;
      }
      .link{
        &>div{
            width: 106px;
            height: 40px;
            background-color:rgba(14,103,255,1) ;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            margin-left: 15px;
          }
          .immediately{
            cursor: pointer;
            background-color: rgba(255,103,0,1);
          }
      }
    }
  }
  .file{
    &>div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 5px;
      height: 30px;
      color: #999;
      font-size: 14px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
  }
  .btn-No{
     width: 106px;
            height: 40px;
            background-color:rgba(14,103,255,1) ;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
  }
}
</style>