<template>
  <div class="dateil-wrap" v-loading="loading">
       <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 24px 0">
        <el-breadcrumb-item :to="{ path: '/cydn/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/cydn/activity'}">活动中心</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb> 
      <div class="top">
          <div class="banner">    
                    <img :src="handelBanner(0)" alt="" class="img">     
          </div>
          <div class="describe">
              <strong>{{ details.title }}</strong>
              <div v-if="flag">活动地点：<span>{{ details.activityPlace }}</span></div>
              <div>活动开始时间：<span>{{ details.beginTime&&details.beginTime.substr(0,10) }}</span></div>
              <div>活动结束时间：<span>{{ details.endTime&&details.endTime.substr(0,10) }}</span></div>
              <div  v-if="flag">报名截止时间：<span>{{ details.enterEndTime&&details.enterEndTime.substr(0,10) }}</span></div>
              <div  v-if="flag">现场报名：<span>{{details.isxcbm==='yes'?'支持':'不支持'}}</span></div>
              <div>主办单位：<span>{{ details.hostUnit }}</span></div>
              <div  v-if="flag">剩余名额：<span>{{ details.limitOfNumber?details.limitOfNumber-details.yibaoming:'无限制' }}</span></div>
              <div  v-if="flag">已报人数：<span>{{ details.yibaoming }}</span></div>
              <div class="openRegister" v-show="shoLink">
                  <el-button class='button' type="primary" :disabled="!(isSign()==0||isSign()==5)" size='medium' @click="openPopup">{{ btnLabel[isSign()] }}</el-button>
              </div>
          </div>
      </div>
          <subTitle style="font-weight:600;font-size:22px;margin:42px 0 24px 0">活动详情</subTitle>
      <div class="detail-body">
          <div class="content">
              <p>{{ details.title }}</p>
              <div v-html="details.content">
                        未来五年的重要演讲。在前两届峰会中，我们已邀请到海康威视、大华股份、华为安防、阿里城市大脑、腾讯优图、商汤、旷视等知名企业高管参会演讲。在本次峰会上，演讲企业将向行业首度解密他们奠定行业地位的产品、技术、业务方法论，积极与本市青年人才展开交流。北京人工智能安防峰会，现为中国最具影响力的"Al+安防” 论坛。本届峰会以「洗牌结束格局重构」为主题。邀请经过五年商业剧变与人工智能洗礼，从近干家AI &安防公司中突围，并成为引领行业下一个五年的15家最具生命力的企业，发表总结过去五年，展望未来五年的重要演讲。在前两届峰会中，我们已邀请到海康威视、大华股份、华为安防、阿里城市大脑、腾讯优图、商汤、旷视等知名企业高管参会演讲。在本次峰会上，演讲企业将向行业首度解密他们奠定行业地位的产品、技术、业务方法论，积极与本市青年人才展开交流北京人工智能安防峰会，现为中国最具影响力的"Al+安防” 论坛。本届峰会以「洗牌结束格局重构」为主题。邀请经过五年商业剧变与人工智能洗礼，从近干家AI &安防公司中突围，并成为引领行业下一个五年的15家最具生命力的企业，发表总结过去五年，展望未来五年的重要演讲。在前两届峰会中，我们已邀请到海康威视、大华股份、华为安防、阿里城市大脑、腾讯优图、商汤、旷视等知名企业高管参会演讲。在本次峰会上，演讲企业将向行业首度解密他们奠定行业地位的产品
              </div>
          </div>
      </div>
      <popup :isOpen.sync='isOpenPupop' :detail="details"></popup>
  </div>
</template>

<script>
import {getActivityDetailData} from '@/api/activity'
import subTitle from './components/subClassTitle'
import popup from './components/registerPopup'
export default {
    name:'activityDetail',
    components:{subTitle,popup},
    data(){
        return{
            banners:[],
            isOpenPupop:false,
            details:{},
            flag:1,//1 线下  0 线上
            isNotlogin:1,//是否需要登录 1 需要  2不需要
            isVerify:1,//是否需要审核  0需要  1不需要
            btnLabel:['活动报名','报名成功','已报名,待审核','活动已结束','爆满','活动地址'],
            loading:false,
            shoLink:false
        }
    },
    computed:{
        
        },
    created(){
        this.getData()
    },
    mounted(){

    },
    methods:{
      isshow(){
                if(this.flag==0&&!this.details.link){
                    this.shoLink = false
                }else{
                     this.shoLink = true
                }
              
            },
        openPopup(){
            //判断报名是否需要登录
            //判断当前是否登录
            if(!this.flag){ //如果是线上活动 直接跳走

                this.details.link?(window.open(this.details.link)): this.$message('该活动没有配活动地址')
                return
            }
          
            if(this.isNotlogin == 1){
                if(window.localStorage.token){
                    this.isOpenPupop = true
                }else{
                     this.$message('您尚未登录,无法报名');
                       this.$router.push('/login')
                }
            }else{
                 this.isOpenPupop = true
            }
            
        },
        getData(){
               this.loading = true
            getActivityDetailData({id:this.$route.query.id}).then(res=>{
                console.log(res,'详情')
                this.loading = false
                if(!res.data.success){
                     this.details = {}
                      this.$message.error(res.data.message);
                     return 
                }
                this.details = res.data.retData
                this.banners = res.data.retData.icon.split(',')
                this.flag = this.mapKey(this.details.activityLeibie)
                this.isVerify = this.details.isVerify
                this.isNotlogin = this.details.isnotdenglu
                this.isshow()
            })
        },
        handelBanner(index){
            return process.env.VUE_APP_IMG_URL+this.banners[index]
        },
        mapKey(str){ // 线上和线下 字段转化
            var result; 
            switch (str) {
                case 'xianshang':
                    result=0
                    break; 
                default:
                    result = 1
                    break;
            }
            return result
        },
        updata(){
            this.getData()
        },
        //是否可以报名的逻辑
        isSign(){
            if(new Date().getTime()>new Date(this.details.endTime).getTime()){ //当前时间 大于活动结束时间 =活动已结束
                return 3
            }
            if(!this.flag){
                 return 5
            }
            // if(this.details.limitOfNumber<1){//无限制
            //      return 0
            // }
            if((this.details.limitOfNumber-this.details.yibaoming<1)&&this.details.limitOfNumber>0){ //爆满
                return 4
            }
            if(window.localStorage.token){ //如果当前是登录态  
                if(this.details.recordStatus==''||this.details.recordStatus=='jujue'){//未报过名
                    return 0
                }else if(this.details.recordStatus=='wait'){ //已报名待审核
                     return 2
                }else if(this.details.recordStatus=='weiqiandao'){ //报名成功
                     return 1
                }         
            }else{
                return 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dateil-wrap{
    width: 1200px;
    min-height: 100vh;
    margin: 0 auto;
    .top{
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        .banner{
            width: 806px;
            height: 452px;
            img{
                width: 806px;
                height: 452px;
            }
        }
        .describe{
            box-sizing: border-box;
            background-color: #fff;
            width: 372px;
            height: 452px;
            padding: 24px 16px;
            border-radius: 4px;
            &>div{
                line-height: 30px;
                color: #929292;
                font-size: 16px;
                 text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                &>span{
                    color: #595959;
                }
            }
            strong{
                display: inline-block;
                line-height: 30px;
                font-weight: 500;
                color: #0D0D0D;
                font-size: 20px;
                margin-bottom: 15px;
                 text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .openRegister{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 52px;
                .button{
                    border-radius: 10px;
                    background-color: #0E67FF;
                }
            }
        }
    }
    .detail-body{
        margin-top: 24px;
        background-color: #fff;
        margin-bottom: 24px;
        .content{
             padding:24px ;
             &>p{
                text-align: center;
                color: #0D0D0D;
                margin-bottom: 24px;
                font-size: 18px;
            }
            div{
                line-height: 28px;
                color: #595959;
                img{
                    max-width: 1000px;
                }
            }
        }
       
    }
}
::v-deep .el-carousel__indicators{
    left:85%
}

</style>
