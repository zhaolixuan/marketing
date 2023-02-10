<template>
  <div class="information_content">
    <!-- <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          class="myColor"
          :to="{ path: '/cydn/home' }"
        >首页</el-breadcrumb-item>
        <el-breadcrumb-item class="myColor" @click.native="getBack">资讯</el-breadcrumb-item>
        <el-breadcrumb-item class="diffColor">{{navTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="nav">
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="item.index"
          :class="{'active':index==activeIndex}"
          @click="navClick(item,index)"
        >{{ item.category }}</li>
      </ul>
    </div>
    <div class="fixWidth">
      <div class="containter">
        <div class="top" v-if="navShow > 0">
          <div class="left">
            <el-carousel :height="bannerHeight + 'px'">
              <el-carousel-item
                v-for="(item, index) in img_list"
                :key="index"
                @click.native="getDetails(item)"
              >
                <img style="width: 100%; height: 100%" :src="item.coverUrl" alt />
                <div class="mask">
                  <p class="maskTitle">{{item.title}}</p>
                  <p class="maskDesc">{{item.description}}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right">
            <h5 class="h5">
              <el-image :src="imgLeft"></el-image>
              最新资讯
              <!-- <el-image :src="imgRight"></el-image> -->
            </h5>
            <ul>
              <li v-for="(item,index) in infoList" :key="index" @click="getDetails(item)">
                <!-- <span class="span"></span> -->
                <p>{{item.title}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div
            class="content"
            v-for="(item,index) in bottomCont"
            :key="index"
            @click="getDetails(item)"
          >
            <div class="space">
              <h6 class="h6">{{item.title}}</h6>
              <div class="time">{{item.releaseTime}}</div>
            </div>
            <div class="word">{{item.description}}</div>
          </div>
          <!-- v-if="!dataNone" -->
          <div
            :class="moreBtnClick ? 'load-more' : 'nothing'"
            @click="loadMore"
          >{{moreBtnText}}<i class="el-icon-arrow-down" style="font-size:18px;margin-left:10px;" v-if="moreBtnClick"></i></div>
          <!-- <div class="nothing" v-show="nothing">暂无数据</div> -->
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import {
  getCategory,
  informationImg,
  informationList
} from "@/api/information.js";
import { formatDate } from "@/common/util";

export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      imgLeft: require("../../static/images/beat_left1.png"),
      imgRight: require("../../static/images/beat_right.png"),
      bannerHeight: 480,
      activeIndex: 0,
      navTitle: "",
      navShow: "",
      navList: [],
      categoryId: "",
      img_list: [],
      total: 0,
      moreBtnText: "点击加载更多资讯",
      moreBtnClick: true,
      currentPage: 1,
      pageSize: 16,
      infoList: [],
      bottomCont: []
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    loadMore() {
      if (this.pageSize * this.currentPage < this.total) {
        this.currentPage++;
        this.getInformationList(this.categoryId);
      }
    },
    // 分类列表
    getCategoryList() {
      getCategory().then(res => {
        this.navList = res.data.rows;
        this.navTitle = res.data.rows[0].category;
        this.categoryId = res.data.rows[0].id;
        this.getInformationImg(this.categoryId);
      });
    },
    // 轮播图
    async getInformationImg(id) {
      this.img_list = [];
      await informationImg({ categoryId: id }).then(res => {
        this.img_list = res.data.retData[0].data;
        for (var i = 0; i < this.img_list.length; i++) {
          if (this.img_list[i].coverUrl.indexOf('http') != -1 || this.img_list[i].coverUrl.indexOf('https') != -1) {
            this.img_list[i].coverUrl = this.img_list[i].coverUrl;
          } else {
            this.img_list[i].coverUrl = this.imgurl + this.img_list[i].coverUrl;
          }
        }
        this.navShow = Number(res.data.retData[0].total);
        this.getInformationList(this.categoryId);
      });
    },
    // 获取资讯列表
    getInformationList(id) {
      informationList({
        categoryId: id,
        curPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.$nextTick(() => {
          if (this.currentPage == 1 && this.navShow > 0) {
            this.infoList = res.data.retData[0].data.splice(0, 6);
          }
          this.bottomCont = this.bottomCont.concat(res.data.retData[0].data);
          this.total = Number(res.data.retData[0].total);
          if (Math.ceil(this.total / this.pageSize) == this.currentPage) {
              if(this.total == 1){
                this.moreBtnText = "资讯加载完成";
              }else {
                this.moreBtnText = "暂无数据";
              }
            this.moreBtnClick = false;
          } else {
            if(this.total == 0){
              this.moreBtnText = "暂无数据";
              this.moreBtnClick = false;
            } else {
                this.moreBtnText = "点击加载更多资讯";
                this.moreBtnClick = true;
            } 
          }
          
          for (var i = 0; i < this.bottomCont.length; i++) {
            this.bottomCont[i].releaseTime = formatDate(
              this.bottomCont[i].releaseTime,
              "yyyy.MM.dd"
            );
          }
        });
      });
    },
    getDetails(item) {
      this.$router.push({
        path: "/cydn/information/detali",
        query: {
          id: item.id,
          title: item.title,
          navTitle: this.navTitle
        }
      });
    },
    navClick(item, index) {
      this.activeIndex = index;
      this.navTitle = item.category;
      this.categoryId = item.id;
      this.bottomCont = [];
      this.infoList = [];
      this.currentPage = 1;
      this.moreBtnText = "查看更多";
      this.moreBtnClick = true;
      this.navShow = '';
      this.getInformationImg(this.categoryId);
    },
    getBack() {
      this.$router.push({
        path: "/cydn/information"
      });
      this.getCategoryList();
      this.activeIndex = 0;
      this.bottomCont = [];
      this.infoList = [];
      this.currentPage = 1;
      this.moreBtnText = "查看更多";
      this.moreBtnClick = true;
      this.navShow = '';
    },
  }
};
</script>
<style lang="scss" scoped>
.information_content {
  //background: #fff;
  //padding: 24px;
  box-sizing: border-box;
  //width: 1200px;
  width:100%;
  margin: 0 auto;
  //.bread {
  //  padding: 5px 0;
  //  box-sizing: border-box;
  //  .myColor ::v-deep .el-breadcrumb__inner{
  //    font-size: 14px;
  //    font-family: "Microsoft YaHei";
  //    font-weight: 600;
  //    color: #C0C0C0;
  //    cursor: pointer;
  //  }
  //  .diffColor ::v-deep .el-breadcrumb__inner{
  //    font-size: 14px;
  //    font-family: "Microsoft YaHei";
  //    font-weight: 600;
  //    color: #0D0D0D;
  //  }
  //}
  .nav {
    width: 100%;
    background: #fff;
    box-shadow:  0 10px 10px 0 rgba(96,112,149,0.12);
    ul {
      width: 1200px;
      padding: 0px 24px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid #ececec;
      box-sizing: border-box;
      li {
        padding: 28px 23px 13px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0d0d0d;
      }
      .active {
        border-bottom: 2px solid #0e67ff;
      }
    }
  }
  .fixWidth{
    width: 1200px;
    margin: 0 auto;
  }
  .containter {
    margin-top: 30px;
    .top {
      display: flex;
      .left {
        flex: 1;
        position: relative;
        ::v-deep .el-carousel__button {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        //::v-deep .el-carousel__indicators--horizontal {
        //  left: 85%;
        //}
        .mask {
          position: absolute;
          bottom: 0px;
         //background: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
         background: #085EE5;
          width: 100%;
          //height: 100px;
          height: 144px;
          // line-height: 44px;
          color: #fff;
          text-indent: 15px;
          cursor: pointer;
          padding: 0px 40px;
          box-sizing: border-box;
          
          .maskTitle{
            width: 100%;
            margin: 18px 0px 10px;
            font-size: 23px;
            font-weight: 500;
            color: rgba(255,255,255,1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .maskDesc{
            font-size: 18px;
            font-weight: normal;
            color: rgba(255,255,255,1);
            line-height: 27px;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal!important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .right {
        // flex: 1;
        //width: 408px;
        width: 495px;
        height:480px;
        padding: 20px 30px;
        box-sizing: border-box;
        //background: rgba(245, 250, 255, 0.8);
        background: #fff;
        border-radius: 4px 4px 4px 4px;
        margin-left: 15px;
        .h5 {
          height: 30px;
          font-family: "Microsoft YaHei";
          font-size: 22px;
          font-weight: 600;
          color: rgba(29,29,31,1);
          display: flex;
          align-items: center;
          //justify-content: center;
          .el-image {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            //&:first-child {
            //  margin-right: 10px;
            //}
           // &:last-child {
            //  margin-left: 10px;
            //}
          }
        }
        ul li {
          display: flex;
          align-items: center;
          padding: 20px 0px 0px;
          box-sizing: border-box;
          cursor: pointer;
          //.span {
          //  display: inline-block;
          //  width: 8px;
          //  height: 8px;
          //  background: #0e67ff;
          //  border-radius: 50%;
          //  margin-right: 10px;
          //}
          p {
            flex: 1;
            line-height: 27px;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color: rgba(29,29,31,1);
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .bottom {
      margin-top: 16px;
      min-height: 500px;
      background: #fff;
      padding: 40px 70px;
      box-sizing: border-box;
      margin-bottom: 60px;
      .content {
        padding: 20px 0px 30px;
        border-bottom: 1px solid rgba(225,225,225,1);
        box-sizing: border-box;
        cursor: pointer;
        
        .space {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .h6 {
            font-family: "Microsoft YaHei";
            font-size: 23px;
            font-weight: 500;
            color: rgba(37,37,39,1);
            line-height: 32px;
          }
          .time {
            font-size: 14px;
            font-weight: 400;
            color: rgba(153,153,153,1);
          }
        }
        .word {
          //width: 994px;
          margin-top: 10px;
          width: 100%;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 24px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(102,102,102,1);
        }
        &:hover{
          background: rgba(246,248,254,1);
          .h6 {
            color: #0E67FF;
          }
        }
      }
      .load-more {
        text-align: center;
        font-size: 15px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: rgba(14,103,255,1);
        font-weight: 500;
        margin-top: 55px;
        margin-bottom: 35px;
        cursor: pointer;
      }
      .nothing {
        text-align: center;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: #0d0d0d;
        font-weight: 500;
        margin-top: 40px;
      }
    }
  }
}
</style>
