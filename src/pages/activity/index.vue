<template>
  <div id="activity">
    <header>
      <div class="poster_box" v-if="showBig"  @click="toDetail(bigActivity.id)">
        <img :src="handelImg(bigActivity.posterIcon)" class="poster_img">
        <div class="poster_con">
          <div class="poster_con_left">
            <div><span>活动时间：</span><p>{{bigActivity.beginTime}}</p></div>
            <div v-if="bigActivity.activityPlace"><span>活动地点：</span><p>{{bigActivity.activityPlace}}</p></div>
            <div><span>主办单位：</span><p>{{bigActivity.hostUnit}}</p></div>
          </div>
          <div class="poster_con_right">
            <div class="poster_con_right_top" v-if="bigActivity.activityPlace">
              <div>
                <div>已报人数：</div>
                <div><span>{{ bigActivity.yibaoming }}</span>人</div>
              </div>
              <div>
                <div>剩余名额：</div>
                <div><span>{{ bigActivity.limitOfNumber?bigActivity.limitOfNumber-bigActivity.yibaoming+'人':'无限制' }}</span></div>
              </div>
            </div>
            <div class="poster_con_right_bottom">
              <el-button size="mini" class="btn" @click="toDetail(bigActivity.id)">查看详情</el-button>
              <el-button size="mini" class="btn btn1" @click="toDetail(bigActivity.id)">立即报名</el-button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="page_content"  v-loading="loading">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 24px 0">
        <el-breadcrumb-item :to="{ path: '/cydn/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动中心</el-breadcrumb-item>
      </el-breadcrumb> -->
      <section class="con_new" :style="{'marginTop':showBig?'225px':'20px'}">
        <subTitle style="font-weight:600;font-size:22px">最新活动</subTitle>
        <div class="view_more">
          <el-button class='btn' type="text" @click="more('活动列表',1)">查看更多<img :src="require('../../static/images/go.png')" alt=""></el-button>
        </div>
          <el-empty v-if="newActivityData.data&&newActivityData.data.length<1" description="暂无数据"></el-empty>
        <ul class="con_list_box"  v-if="newActivityData.data&&newActivityData.data.length" >
          <li v-for="item in newActivityData.data" :key="item.index">
            <list-item :itemData="item"></list-item>
          </li>
        </ul>
        <!-- <jd-pagination :pageSize="" :currentPage="" :total="" @handleCurrentChange="handleCurrentChange"></jd-pagination> -->
      </section>
       <section class="history">
        <subTitle style="font-weight:600;font-size:22px">往期活动回顾</subTitle>
        <div class="view_more">
          <el-button class='btn' type="text" @click="more('往期活动',2)">查看更多<img :src="require('../../static/images/go.png')" alt=""></el-button>
        </div>
        <el-empty v-if="historyActivityData.data&&historyActivityData.data.length<1" description="暂无数据"></el-empty>
        <ul class="con_list_box"  v-if="historyActivityData.data&&historyActivityData.data.length">
          <li v-for="item in historyActivityData.data" :key="item.index">
            <list-item :itemData="item"></list-item>
          </li>
        </ul>
        <!-- <jd-pagination :pageSize="" :currentPage="" :total="" @handleCurrentChange="handleCurrentChange"></jd-pagination> -->
      </section>
    </div>
  </div>
</template>
<script>
import listItem from './components/listItem.vue'
import subTitle from './components/subClassTitle'
import {getActivityData,getActivityRecommendData} from '@/api/activity'
import { formatDate } from "@/common/util";
export default {
  name:'activityIndex',
  components: {
    listItem,
    // JdPagination,
    subTitle
  },
  data() {
    return {
      newActivityData:[],
      historyActivityData:[],
      bigActivity:{},
      loading:false,
      showBig:true
    }
  },
  created(){
    this.getHomePageData(1)
    this.getHomePageData(2)
     this.getRecommend()
  },
  methods: {
    getHomePageData(n){
      this.loading = true
      getActivityData({type:n,curPage:1,pageSize:6}).then(res=>{
        console.log(res,'看看数据长啥样')
        this.loading=false
        n===1?this.newActivityData = res.data.retData[0]:this.historyActivityData = res.data.retData[0]   
      })
    },
     getRecommend(){
       this.loading = true
          getActivityRecommendData().then(res=>{
            console.log(res,'推荐数据')
            this.loading = false
            if(!res.data.retData){
                this.showBig = false
                this.bigActivity = {}
                return
            }
            if(!res.data.success){
             
              this.$message.error(res.data.message);
              return
            }
            this.bigActivity = res.data.retData
          })
        },
    //更多
    more(text,type){
      this.$router.push({
        path:'/cydn/activity/list',
        query:{
          text,type
        }
      })
    },
    toDetail(id){
      this.$router.push({
        path:'/cydn/activity/detail',
        query:{
          id
        }
      })
    },
    handelImg(img){
            return process.env.VUE_APP_IMG_URL+img
    },
    handelDate(time){
      if(!time){
        return '-'
      }
      return formatDate(time,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
#activity {
  background-color: #F6FAFFFF;
  min-height: 100vh;
  header {
      .poster_box {
        cursor: pointer;
        position: relative;
        .poster_img {
          width: 100%;
          height: 500px;
        }
        .poster_con {
          //display: flex;
          //justify-content: space-between;
          //align-items: center;
          position: absolute;
          left: 50%;
          bottom: -165px;
          transform: translateX(-50%);
          width: 1200px;
          height: 260px;
          background: #FFFFFF;
          box-shadow:  0 2px 40px 5px rgba(194,194,210,0.3);
          border-radius: 0px;
          padding: 30px 0px 0px 32px;
          box-sizing: border-box;
          .poster_con_left{
            overflow: hidden;
            &>div{
              float: left;
              width: 357px;
              height: 110px;
              margin-right: 32px;
              padding: 12px 22px 0px;
              box-sizing: border-box;
              span{
                width: 100%;
                display: block;
                font-size: 22px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                line-height: 30px;
              }
              p{
                width: 100%;
                line-height: 22px;
                font-size: 16px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                margin-top: 10px;
              }
              &:first-child{
                background: url("../../static/images/active_time.png") no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(2){
                background: url("../../static/images/active_address.png") no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(3){
                background: url("../../static/images/active_sponsor.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            //padding-left: 15px;
            //&>div{
            //  line-height: 40px;
            //  color: #0D0D0D;
            //  span{
            //    font-size: 16px;
            //    color: #929292;
            //  }
            //}
          }
          .poster_con_right{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 40px;
            margin-right: 33px;
            .poster_con_right_top{
              display: flex;
              //height: 75px;
              //padding-right: 10px;
              &>div{
                display: flex;
                line-height: 22px;
                font-size: 16px;
                font-weight: normal;
                color: rgba(102,102,102,1);
                padding-left: 27px;
                box-sizing: border-box;
                position: relative;
              }
              &>div:first-child{
                margin-right: 40px;
                &::before{
                  content: "";
                  position: absolute;
                  top: 4px;
                  left: 0px;
                  width: 14px;
                  height: 14px;
                  background: #F9A908;
                  border-radius: 50%;
                }
              }
              &>div:last-child{
                 &::before{
                  content: "";
                  position: absolute;
                  top: 4px;
                  left: 0px;
                  width: 14px;
                  height: 14px;
                  background: #12B664;
                  border-radius: 50%;
                }
              }
            }
            .poster_con_right_bottom{
              display: flex;
              justify-content: center;
              .btn{
                width: 98px;
                height: 40px;
                font-size: 15px;
                border-radius: 0px;
                color: rgba(14,103,255,1);
                background: rgba(255,255,255,1);
                border: 1px solid rgba(17,76,255,1);
              }
              .btn1{
                background: rgba(14,103,255,1);
                color: #fff;
                margin-right: 30px;
              }
            }
          }
        }
      }
    }
  .page_content {
    width: 1200px;
    min-height: 100vh;
    margin: 0 auto;
    
    .con_new {
      margin-top: 116px;
    }
    .history,.con_new{
      .view_more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .btn{
           color: #0E67FF;
           font-size: 14px;
           img{
                 width: 16px;
                  vertical-align: text-top;
              }
        }
       
      }
      .con_list_box {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 16px;
          margin-bottom: 30px;
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
    .history{
      
      .con_list_box{

      }
    }
  }
}
</style>
