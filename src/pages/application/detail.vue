
<template>
  <div class="application">
    <!-- 详情介绍 -->
      <div class="detail">
        <div class="main-img">
          <img :src="handelImg(detailData.appCoverPictureUrl)" alt="">
        </div>
        <div class="explain">
          <div class="name-price">
            <div class="name-score">
              <div class="text">{{ detailData.appName }}</div>
              <div><el-rate v-model="score" disabled allow-half :max=5></el-rate></div>
            </div>
            <div class="price">
              <div v-if="detailData.isFree == '1'" class="at">现价：￥<span>{{ detailData.presentPrice ? detailData.presentPrice : '--'}}</span>元</div>
              <div style="font-size:20px;" v-else class="at">免费</div>
              <del v-if="detailData.isFree == '1'">市场价：￥{{ detailData.marketPrice ? detailData.marketPrice : '--' }}元</del>
            </div>
          </div>
          <div class="up-date">
            上架时间：{{ handelDate(detailData.shelvesTime)||'时间' }}
          </div>
          <div class="use-class">
            适用群体：{{ detailData.customerGroup||'群体' }}
          </div>
          <div class="supplier">
            供应商：{{ detailData.supplierInformation||'供应商' }}
          </div>
          <div class="tm">
            开发者：{{ detailData.developInformation||'研发团队' }}
          </div>
          <div class="platform">
            适用平台:
            <img v-for="srcU in detailData.operatingSystemName&&detailData.operatingSystemName.split(',')" :key="srcU" :src="platformIcon[srcU]" alt="">
          </div>
          <div class="get" @click="getUse">
            立即使用
          </div>
        </div>
      </div>
      <!-- 截图介绍 -->
      <div class="img-explain">
        <div class="title">软件截图</div>
        <div class="scroll">
           <div class="img-wrap swiper-wrapper" v-for="item in detailData.softwareScreenshots&&detailData.softwareScreenshots.split(',')" :key="item">
          <!-- <img class="swiper-slide" :src="handelImg(item)" alt="" > -->
           <el-image 
            class="swiper-slide"
            style="width: 288px;
      height: 218px;
      margin-right: 15px;"
            :src="handelImg(item)" 
            :preview-src-list="srcList">
          </el-image>
        </div>
        </div>
       
      </div>
      <!-- 操作系统 + 推荐 -->
      <div class="sys-recommed">
        <div class="sys-left">
          <div class="title" ref="sys">操作系统</div>
          <div class="platform-tabs">
               <el-tabs v-model="platformName">
                <el-tab-pane v-for="item in detailData.sysTabs&&detailData.sysTabs.split(',')" :key="item" :label="item" :name="item"></el-tab-pane>
              </el-tabs>
              <tabs-content :code='platformName'  :detailsData="detailData" />
              <div class="pay-explain-wrap">
                <div class="title-small">付费说明</div>
                <div class="content">
                  {{ detailData.payTips }}
                </div>
              </div>
          </div>
          <div class="explain">
               <el-tabs v-model="explainName">
                 <el-tab-pane v-for="item in detailiItroduce" :key="item.value" :label="item.label" :name="item.value" />
              </el-tabs>
              <tabs-content :code="explainName" :detailsData="detailData"/>
          </div>
        </div>
        <div class="recommed-right" v-if="recommedList.length">
          <div class="change">
            <div class="title">
            相关应用推荐
            </div>
             <span @click="changeABatch()" v-if="recommedList.length>0" style="cursor:pointer;">换一批<i class="el-icon-refresh-left"></i></span>
          </div>
          <ul class="recommed-list" v-if="recommedList.length>0">
            <li v-for="item in recommedList.slice(0,3)" :key="item.id">
              <div class="logo">
                <img :src="handelImg(item.appCoverPictureUrl)" alt="">
              </div>
              <div class="describe-wrap">
                <div class="name">{{ item.appName }}</div>
                <div class="describe-text" v-html="item.basicInformation">
                </div>
                <div class="go-detail" @click="getDetail(item.id)">
                  查看详情<i class="el-icon-right"></i>
                </div>
              </div>
            </li>
          </ul>
          <div v-else style="wdith:80px;height:300px;background:#fff;text-align:center;line-height:300px;color:rgba(29, 29, 31, 0.6);font-size:18px;" class="noMore">
            暂无数据
          </div>
        </div>
      </div>
      <popup ref="purchase"></popup>
  </div> 
</template>
<script> 
import tabsContent from './components/tabsContent'
import popup from './components/purchasePopup.vue'
import { getStoreDetail, storeIsSave,storeRecommed} from "../../api/application"
import moment from 'moment'
import "../../static/js/swiper.min.js";
export default {
  components:{
    tabsContent,
    popup
  },
    data() {
      return {
        score:4.5,
        detailiItroduce:[
          {label:'应用介绍',value:'itroduce'},
          {label:'版本说明',value:'edition'},
          {label:'使用说明书',value:'use'},
          {label:'教学视频',value:'video'},
          {label:'技术支持',value:'support'},
        ],
        platformIcon: {
        'Android': require("../../static/images/app-store-detail/list-android.png"),
        'H5': require("../../static/images/app-store-detail/list-h5.png"),
        'iOS': require("../../static/images/app-store-detail/list-ios.png"),
        'Linux': require("../../static/images/app-store-detail/list-linux.png"),
        "MacOS": require("../../static/images/app-store-detail/list-mac.png"),
        '微信小程序': require("../../static/images/app-store-detail/list-mini.png"),
        "PC-Web": require("../../static/images/app-store-detail/list-pc.png"),
        'Windows': require("../../static/images/app-store-detail/list-win.png")
        },
        platformName:'',
        explainName:'itroduce',
        detailData:{},
        isSave:false, //是否登记过
        recommedList:[],
        srcList:[] //图片
      };
    },
    computed:{
     
    },
    mounted(){
      this.getDetail(this.$route.query.id)
      this.getRecommedList();
    },
    methods: {
      changeABatch(){
        // this.recommedList
        console.log(this.recommedList,'recommedList')
        console.log(this.detailData,'detailData')
        let params = {
          appId:this.detailData.id,
          lastId:this.recommedList[this.recommedList.length -1].id
        }
        storeRecommed(params).then(res=>{
          this.recommedList = res.data.retData[0]?.data
        })
      },
      handelBigImg(){
        var imgArr = this.detailData.softwareScreenshots?this.detailData.softwareScreenshots.split(','):[]
        for(let i=0;i<imgArr.length;i++){
          this.srcList.push(this.handelImg(imgArr[i]))
        }
      },
      getDetail(id){
        var that = this;
        this.srcList = []
        getStoreDetail({id}).then(res=>{
          console.log(res)
           //因为 ios和android和微信小程序属于同一个页签内容故处理成 移动端页签
          var _p = ['iOS','Android','微信小程序'] 
          var _arr = res.data.operatingSystemName?res.data.operatingSystemName.split(','):[]
          if(_arr.length){
            _arr.filter((element,index,arr) => {
              if(_p.includes(element)){
                _arr.splice(index,1)
                _arr.push('移动端')
              }  
            });
          res.data.sysTabs = [...new Set(_arr)].join()
          this.platformName = res.data.sysTabs.split(',')[0]
          }
          this.detailData = res.data
          if(that.detailData.appIntroduce){ //下面 三个if 是处理富文本 里面图片
            that.detailData.appIntroduce = that.detailData.appIntroduce.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
          }
          if(that.detailData.versionTips){
            that.detailData.versionTips = that.detailData.versionTips.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
          }
          if(that.detailData.technicalSupport){
            that.detailData.technicalSupport = that.detailData.technicalSupport.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
          }
          setTimeout(() => {
        const swiper = new Swiper(".scroll", {
           // 垂直切换选项
           direction:'horizontal',
          loop: false, // 循环模式选项
          autoplay: 2000,
          slidesPerView: 4,
          spaceBetween: 16,
          autoplayDisableOnInteraction : false,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
    }, 100);
          this.handelBigImg()
        //  this.storeIsSave()
        //  this.getRecommedList()
        })
      },
      getRecommedList(lastId){
        storeRecommed({appId:this.$route.query.id,lastId:lastId||''}).then(res=>{
          console.log(res,'推荐数据')
          this.recommedList = res.data.retData[0]?res.data.retData[0].data:[]
        })
      },

      getUse(){
          //获取是否 登记
          if(this.detailData.isFree==1){
            if(!localStorage.token){
               this.$message('您尚未登录,暂无法使用该应用');
              this.$router.push('/login')
              return
            }
             if(!(JSON.parse( localStorage.vuex).userInfo.companyInfo)){
              this.$message('当前账户未认证，请先认证');
              this.$router.push('/cydn/userCenter/EnterpriseCertification')
              return
            }
            storeIsSave({userId:JSON.parse( localStorage.vuex).userInfo.userId,appId:this.$route.query.id}).then(res=>{
              this.isSave = res.data
              if(!res.data){
                this.$refs.purchase.open({appId:this.$route.query.id,appName:this.detailData.appName})
              }else{
                this.$message({
                  message: '您已提交购买申请，请联系客服',
                  type: 'success'
                });
                }
            })
          }else{
            this.$refs.sys.scrollIntoView()
          }
      },
      handelImg(img){
            return process.env.VUE_APP_IMG_URL+img
      },
       handelDate:function(str){
        return moment(str).format('YYYY年MM月DD日')
      }
    }
  };
  
</script>
<style lang="scss" scoped>
.application{
  width: 1200px;
  margin: 0 auto;
  .detail{
    display: flex;
    box-sizing: border-box;
    padding: 38px 0 31px 44px;
    background-color: #fff;
    .main-img{
      width: 288px;
      height: 288px;
      border: 1px solid rgba(0,0,0,0.08);
      margin-right: 30px;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .explain{
      width: 822px;
      font-size: 14px;
      line-height: 34px;
      color: rgba(29,29,31,0.6);
      .name-price{
        display: flex;
        justify-content: space-between;
        .name-score{
          .text{
            font-size: 23px;
            font-weight: 600;
            // margin-bottom: 3px;
          }
        }
        .price{
          text-align: right;
          line-height: 24px;
          .at{
            color:rgba(255,103,0,1) ;
            font-size: 18px;
            font-weight: 600;
            // margin-bottom: 5px;
            span{
              font-size: 24px;
            }
          }
          del{
            font-size: 14px;
            color: rgba(29,29,31,0.3);
          }
        }
      }
      .up-date{
        color: rgba(29,29,31,0.6);
      }
      .platform{
        img{
          margin-left: 10px;
          vertical-align: middle;
        }
      }
      .get{
        cursor: pointer;
        width: 181px;
        height: 40px;
        background-color:rgba(255,103,0,1) ;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-top: 24px;
      }
    }
  }
  .img-explain{
    // width: 1200px;
    overflow: hidden;
.scroll{
      display: flex;
  &>div{
    display: inline-block;
  }
  .swiper-wrapper{
    width: auto;
  }
}
    .img-wrap{
      display: flex;
      // width: 1200px;
      height: 218px;    
    }
    img{
      width: 288px;
      height: 218px;
      margin-right: 15px;
      &:nth-child(4){
        margin-right: 0;
      }
    }
  }
  .sys-recommed{
    display: flex;
    margin-bottom: 15px;
    .sys-left{
      width: 774px;
      margin-right: 16px;
      .platform-tabs{
        padding-bottom: 17px;
        box-sizing: border-box;
        background-color: #fff;
        .pay-explain-wrap{
          box-sizing: border-box;
          padding: 0 30px;
          .title-small{
            font-size: 20px;
            color: rgba(29,29,31,1);
            margin: 10px 0 20px 0;
            font-weight: 600;
          }
          .content{
            line-height: 27px;
            color: rgba(29,29,31,0.6);
          }
        }
      }
      .explain{
        background-color: #fff;
        margin-top: 5px;
      }
       ::v-deep .el-tabs__nav {
          padding: 0 20px;
        }
        ::v-deep .el-tabs__active-bar{
          padding: 0 20px;
        }
    }
    .recommed-right{
      width: 410px;
      .change{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          font-size: 12px;
          color:#0E67FF ;
        }
      }
      .recommed-list{
        li{
          display: flex;
          max-height: 225px;
          margin-bottom: 2px;
          background: #fff;
          box-sizing: border-box;
          padding: 20px;
          .logo{
            display: flex;
            width: 80px;
            height: 80px;
            border: 1px solid rgba(0,0,0,0.05);
            margin-right: 15px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .describe-wrap{
            flex:1;
            .name{
              width: 270px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .describe-text{
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              font-size: 14px;
              color: rgba(29,29,31,0.6);
              line-height: 21px;
              margin-bottom: 13px;
            }
            .go-detail{
              text-align: right;
              font-size: 14px;
              color: rgba(14,103,255,1);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
   .title{
      font-size: 35px;
      font-weight: 600;
      margin: 25px 0 20px 0;
    }
}
</style>
