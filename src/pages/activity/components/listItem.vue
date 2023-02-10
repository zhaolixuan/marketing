<template>
  <div id="activity_list_item">
    <div class="item_box" @click="toDetail(itemData.id)">
      <div class="item_img_box">
        <img :src="handelImg(itemData.icon)" class="item_img">
      </div>
      <div class="item_con_box">
        <div class="con_title">
          <span class="title_name">{{ itemData.title||'-' }}</span>
          <!-- <span class="title_btn" @click="toDetail(itemData.id)">查看详情</span> -->
        </div>
        <!-- 没有标题 就意味着是线上活动,线上活动不显示报名人数 -->
        <div class="item_img_text" v-show="itemData.activityPlace">
          <span>已报人数：{{itemData.yibaoming}}人<slot></slot></span>
          <span>剩余名额：{{ itemData.limitOfNumber?itemData.limitOfNumber-itemData.yibaoming+'人':'无限制' }}</span>
        </div>
        <div class="con_item" v-show="itemData.activityPlace">
          <span class="item_l"><i class="el-icon-location-outline"></i>活动地点：</span>
          <div class="item_r address_r">{{ itemData.activityPlace||'-' }}</div>
        </div>
        <div class="con_item">
          <span class="item_l"><i class="el-icon-time"></i>活动时间：</span>
          <div class="item_r">{{ itemData.beginTime||'-' }}至{{ itemData.endTime||'-' }}</div>
        </div>
        <div class="con_item">
          <span class="item_l"><i class="el-icon-house"></i>主办单位：</span>
          <div class="item_r Company">{{ itemData.hostUnit||'-' }}</div>
        </div>
         <div class="state_box">
          <!-- <img src="../../../static/images/state-ybm.png" class="state_img"> -->
          <!-- <img v-if=" itemData.limitOfNumber&&itemData.limitOfNumber-itemData.yibaoming<1" src="../../../static/images/state-bm.png" class="state_img"> 
          <img v-if="new Date().getTime()>new Date(itemData.endTime).getTime()"  src="../../../static/images/state-yjs.png" class="state_img">  -->
          <span class="btn btn1"  v-if=" itemData.limitOfNumber&&itemData.limitOfNumber-itemData.yibaoming<1">报满</span>
          <span class="btn btn1"  v-else-if="new Date().getTime()>new Date(itemData.endTime).getTime()">已结束</span>
          <span class="btn btn2" v-else @click="toDetail(itemData.id)">立即报名</span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import config from '@/config'
export default {
  props: {
    itemData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {

    }
  },
  computed:{},
  mounted() {
    console.log(this.itemData)
  },
  methods: {
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
        }
  }
}
</script>
<style lang="scss" scoped>
#activity_list_item {
  .item_box {
    //width: 384px;
    //height: 380px;
    width: 389px;
    height: 490px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    &:hover {
      box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    }
    .item_img_box {
      width: 100%;
      //height: 216px;
      height: 210px;
      position: relative;
      .item_img {
        width: 100%;
        height: 100%;
        border-radius: 4px 4px 0 0;
      }
      
    }
    .item_img_text {
        //position: absolute;
        font-size: 12px;
        width: 100%;
        /* right: 0; */
        //text-align: right;
        //bottom: 0px;
        height: 20px;
        margin-bottom: 20px;
        //background-color: rgba(0,0,0,.3);
        span {
          //font-size: 14px;
          color: #999999;
          padding-left: 20px;
          line-height: 17px;
          box-sizing: border-box;
          &:first-child{  
            position: relative;
            &::before{
              content: "";
              position: absolute;
              top: 3px;
              left: 0px;
              width: 10px;
              height: 10px;
              background: #F9A908;
              border-radius: 50%;
            }
          }
          &:last-child{  
            position: relative;
            margin-left: 30px;
            &::before{
              content: "";
              position: absolute;
              top: 3px;
              left: 0px;
              width: 10px;
              height: 10px;
              background: #12B664;
              border-radius: 50%;
            }
          }
        }
      }
    .item_con_box {
      //height: 164px;
      height: 280px;
      padding: 30px 20px;
      box-sizing: border-box;
      position: relative;
      .con_title {
        font-size: 16px;
        //padding: 0 16px;
        //height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title_name {
          font-size: 20px;
          display: inline-block;
          //width: 260px;
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: #1D1D1F;
          line-height: 28px;
          margin-bottom: 10px;
        }
        //.title_btn {
        //  display: inline-block;
        //  width: 64px;
        //  height: 24px;
        //  font-size: 12px;
        //  text-align: center;
        //  line-height: 24px;
        //  cursor: pointer;
        //  background-color: #0E67FFFF;
        //  color: #fff;
        //  border-radius: 10px;
        //}
      }
      .con_item {
        display: flex;
        font-size: 14px;
        //padding: 0 16px 3px;
        color:#222222;
        margin-bottom: 10px;
        .item_l {
          width: 110px;
          line-height: 20px;
          i{
            color:#222222;
            font-size: 15px;
            margin-right: 10px;
          }
          
        }
        .item_r {
          width: calc(100% - 70px);
          line-height: 20px;
        }
        .Company{
          //height: 40px;
          //overflow:hidden;
          //display:-webkit-box;
          //-webkit-box-orient:vertical;
          //-webkit-line-clamp:2;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .address_r {
          //display: -webkit-box;
          //-webkit-box-orient: vertical;
          //-webkit-line-clamp: 1;
          //overflow: hidden;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
       .state_box {
        position: absolute;
        bottom: 30px;
        left:20px;
        width: 100%;
        .btn{
          display: inline-block;
          width: 349px;
          height: 40px; 
          text-align: center;
          line-height: 40px;
          font-size: 15px;
        }
        .btn1{
          background: #F0F0F2;
          color:#C8C8C8;
        }
        .btn2 {
          background: #0E67FF;
          color: #fff;
        }
        //width: 70px;
        //height: 70px;
        //.state_img {
        //  width: 100%;
        //  height: 100%;
        //}
      }

    }
  }
}
</style>
