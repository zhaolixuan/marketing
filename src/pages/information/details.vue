<template>
  <div class="information_content">
    <!-- <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: '/cydn/home' }"
         class="myColor"
        >首页</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="getBack" class="myColor">资讯</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="getBack" class="myColor" v-show="navTitle">{{navTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item class="diffColor">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="bottom">
      <div :class="flag ? 'left' : 'leftDiff'">
        <div class="top">
          <h4>{{this.title}}</h4>
          <div class="view">
            <div class="data_Author">
                <div class="date">
                  <span>
                    <i class="el-icon-time"></i>
                    {{date}}
                  </span>
                </div>
                <div class="date">
                  <span>
                    <i class="el-icon-user"></i>
                    {{author||"暂无"}}
                  </span>
                </div>
                <div class="num">
                  <span>
                    <i class="el-icon-view"></i>
                    {{readNum}} 次
                  </span>
                </div>
            </div>
            <!-- <div class="num">
              <span>
                <i class="el-icon-view"></i>
                {{readNum}} 次
              </span>
            </div> -->
          </div>
        </div>
        <div class="container" v-html="content"></div>
        <div class="page">
          <div class="prev" v-if="beforeObj.id" @click="getOtherDetail(beforeObj)">
            <span ><i class="el-icon-caret-left"></i>上一篇</span>
            <span>{{beforeObj.title}}</span>
          </div>
          <div class="next" v-if="afterObj.id" @click="getOtherDetail(afterObj)">
            <span>下一篇<i class="el-icon-caret-right"></i></span>
            <span>{{afterObj.title}}</span>
          </div>
        </div>
      </div>
      <div class="right" v-if="img_list.length>0">
        <h5 class="h5">
          <el-image :src="imgLeft"></el-image>相关推荐
          <!-- <el-image :src="imgRight"></el-image> -->
        </h5>
        <el-carousel :height="bannerHeight + 'px'">
          <el-carousel-item v-for="(item, index) in img_list" :key="index" @click.native="getOther(item)">
            <img style="width: 100%; height: 100%" :src="item.coverUrl" alt />
            <div class="mask">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
        <div class="boxDev">
          <div
            class="content"
            v-for="(item,index) in bottomCont"
            :key="index"
            @click="getOther(item)"
          >
            <!-- <div class="circle"></div> -->
            <div class="title">
              <h6 class="h6">
                <div class="h6_title">{{item.title}}</div>
                <div class="time">{{item.releaseTime}}</div>
              </h6>
              <div class="word">{{item.description}}</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { informationDeatils } from "@/api/information.js";
import { formatDate } from "@/common/util";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      title: "",
      navTitle: "",
      date: "",
      author:"",
      readNum: "",
      content: "",
      id: "",
      beforeObj: {
        title: "",
        id: ""
      },
      afterObj: {
        title: "",
        id: ""
      },
      flag:true,
      imgLeft: require("../../static/images/beat_left1.png"),
      imgRight: require("../../static/images/beat_right.png"),
      bannerHeight: 246,
      img_list: [],
      contList: [],
      bottomCont: []
    };
  },
  mounted() {
    // this.title = this.$route.query.title;
    this.navTitle = this.$route.query.navTitle;
    this.id = this.$route.query.id;
    this.getDetails(this.id);
  },
  watch: {
    $route(n, o) {
      if (n.fullPath !== o.fullPath) {
        //监听路由参数是否变化
        this.id = this.$route.query.id;
        this.getDetails(this.id); //methods中封装的加载数据函数
      }
    }
  },
  methods: {
    loadMore() {},
    getDetails(id) {
      informationDeatils({ informationId: id }).then(res => {
        if (res.status == 200) {
          this.beforeObj = {};
          this.afterObj = {};
          this.img_list = [];
          
          if(res.data.retData.recommendList.length !== 0){
            this.bottomCont = res.data.retData.recommendList; // 相关推荐
            for (var i = 0; i < this.bottomCont.length; i++) {
              this.bottomCont[i].releaseTime = formatDate(
                  this.bottomCont[i].releaseTime,
                  "yyyy.MM.dd"
                );
                if (this.bottomCont[i].coverUrl.indexOf('http') != -1 || this.bottomCont[i].coverUrl.indexOf('https') != -1) {
                  this.bottomCont[i].coverUrl = this.bottomCont[i].coverUrl;
                } else {
                  this.bottomCont[i].coverUrl = this.imgurl + this.bottomCont[i].coverUrl;
                }
            }
            this.img_list.push(this.bottomCont[0]);
          } else {
            this.flag = false;
          }
          this.contList = res.data.retData.detailsList; // 详情

          
          for (var i = 0; i < this.contList.length; i++) {
            this.contList[i].releaseTime = formatDate(
              this.contList[i].releaseTime,
              "yyyy.MM.dd hh:mm"
            );
            if (this.contList[i].sort == 1) {
              // 当前页
              this.date = this.contList[i].releaseTime;
              this.readNum = this.contList[i].readNum;
              this.author = this.contList[i].author;
              this.title = this.contList[i].title;
              this.content = this.contList[i].content;
              this.content = this.content.replace(
                /\<img/gi,
                '<img style="width:100%;"'
              );
              this.content = this.content.replace(
                /\<p/gi,
                '<p style="display:inline;"'
              );
            }
            if (this.contList[i].sort == 0) {
              // 上一页
              this.beforeObj = {
                title: this.contList[i].title,
                id: this.contList[i].id
              };
            }
            if (this.contList[i].sort == 2) {
              // 下一页
              this.afterObj = {
                title: this.contList[i].title,
                id: this.contList[i].id
              };
            }
            // console.log(this.bottomCont, "右边数据");
            // console.log(this.contList, "左边数据");
          }
        }
      });
    },
    getOtherDetail(obj) {
      this.id = obj.id;
      this.$router.push({
        path: "/cydn/information/detali",
        query: { title: obj.title, id: obj.id, navTitle: this.navTitle }
      });
    },
    getBack() {
      this.$router.push({
        path: "/cydn/information"
      });
    },
    getOther(item) {
      this.id = item.id;
      this.$router.push({
        path: "/cydn/information/detali",
        query: { title: item.title, id: item.id, navTitle: this.navTitle }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.information_content {
  //background: #fff;
  //padding: 24px;
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
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
  //    cursor: pointer;
  //  }
  //}
  .bottom {
    //margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    .left {
      // width: 700px;
      background: #fff;
      padding: 60px 50px 50px;
      box-sizing: border-box;
      flex: 1;
      .top {
        //padding: 26px 24px;
        //box-sizing: border-box;
        h4 {
          font-family: "Microsoft YaHei";
          font-size: 38px;
          font-weight: 500;
          color: rgba(37,37,39,1);
          line-height: 53px;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .view {
          display: flex;
          padding: 10px 0px 20px;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          .data_Author{
            display: flex;
            flex: 1;
            .date {
            margin-right: 40px;
            span {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(153,153,153,1);
                i {
                  color: #979797;
                  font-size: 15px;
                  margin-right: 4px;
                }
              }
            }
          }
          .num {
            //width: 48px;
            span {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: #c0c0c0;
              i {
                color: rgba(192, 192, 192, 1);
                font-size: 15px;
                margin-right: 4px;
              }
            }
          }
        }
      }
      .container {
        text-indent: 15px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(51,51,51,1);
        line-height: 27px;
      }
      .page {
        //display: flex;
        //justify-content: space-between;
       // align-items: center;
        cursor: pointer;
        margin-top: 64px;
        .prev {
          //text-align: center;
          float: left;
          span {
            line-height: 21px;
            font-size: 15px;
            i{
              margin-right: 10px;
              font-size: 22px;
            }
            &:first-child {
              display: flex;
              align-items: center;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(153,153,153,1);
            }
            &:last-child {
              display: inline-block;
              width: 270px;
              font-weight: 500;
              color: #0E67FF;
              //margin-left: 16px;
              vertical-align: middle;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
            }
          }
        }
        //.prev:hover {
        //  span {
        //    display: inline-block;
        //    font-size: 15px;
        //    &:first-child {
        //      font-family: "Microsoft YaHei";
        //      font-weight: 500;
        //      color: rgba(153,153,153,1);
        //    }
        //  }
        //}
        .next {
          float: right;
          span {
            line-height: 21px;
            font-size: 15px;
            i{
              margin-left: 10px;
              font-size: 22px;
            }
            &:first-child {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(153,153,153,1);
            }
            &:last-child {
              display: inline-block;
              width: 270px;
              font-weight: 500;
              color: #0E67FF;
              //margin-left: 16px;
              vertical-align: middle;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
              text-align: right;
            }
          }
        }
        //.next:hover {
        //  span {
        //    display: inline-block;
        //    font-size: 14px;
        //    &:first-child {
        //      font-family: "Microsoft YaHei"; 
        //      font-weight: 500;
        //      color: #0e67ff;
        //    }
        //  }
        //}
      }
    }
    .leftDiff{
      width: 100%;
      background: #fff;
      padding: 60px 50px;
      box-sizing: border-box;
      .top {
        //padding: 26px 24px;
        //box-sizing: border-box;
        h4 {
          font-family: "Microsoft YaHei";
          font-weight: 500;
          font-size: 38px;
          color: #252527;
          line-height: 53px;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .view {
          display: flex;
          padding: 10px 0px 20px;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          .data_Author{
            display: flex;
            flex: 1;
              .date {
                margin-right: 60px;
                span {
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 500;
                  color: #999999;
                  i {
                    color: #979797;
                    font-size: 15px;
                    margin-right: 4px;
                  }
                }
              }
          }
          .num {
            //width: 48px;
            span {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: #999999;
              i {
                color: #979797;
                font-size: 15px;
                margin-right: 4px;
              }
            }
          }
        }
      }
      .container {
        text-indent: 15px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #595959;
        line-height: 24px;
      }
      .page {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        margin-top: 64px;
        .prev {
          //text-align: center;
          float: left;
          span {
            line-height: 21px;
            font-size: 15px;
            i{
              margin-right: 10px;
              font-size: 22px;
            }
            &:first-child {
              display: flex;
              align-items: center;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(153,153,153,1);
            }
            &:last-child {
              display: inline-block;
              width: 270px;
              font-weight: 500;
              color: #0E67FF;
              //margin-left: 16px;
              vertical-align: middle;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
            }
          }
        }
        //.prev:hover {
        //  span {
        //    display: inline-block;
        //    font-size: 15px;
        //    &:first-child {
        //      font-family: "Microsoft YaHei";
        //      font-weight: 500;
        //      color: rgba(153,153,153,1);
        //    }
        //  }
        //}
        .next {
          float: right;
          span {
            line-height: 21px;
            font-size: 15px;
            i{
              margin-left: 10px;
              font-size: 22px;
            }
            &:first-child {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(153,153,153,1);
            }
            &:last-child {
              display: inline-block;
              width: 270px;
              font-weight: 500;
              color: #0E67FF;
              //margin-left: 16px;
              vertical-align: middle;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 10px;
              text-align: right;
            }
          }
        }
        //.next:hover {
        //  span {
        //    display: inline-block;
        //    font-size: 14px;
        //    &:first-child {
        //      font-family: "Microsoft YaHei"; 
        //      font-weight: 500;
        //      color: #0e67ff;
        //    }
        //  }
        //}
      }
    }
    .right {
      //width: 360px;
      width: 384px;
      margin-left: 16px;
      padding: 20px 30px 60px;
      box-sizing: border-box;
      position: relative;
      //background: rgba(245, 250, 255, 0.8);
      background: #fff;
      border-radius: 4px 4px 4px 4px;
      .h5 {
        margin-bottom: 20px;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0d0d0d;
        display: flex;
        align-items: center;
        //justify-content: center;
        .el-image {
          width: 30px;
          height: 30px;
          &:first-child {
            margin-right: 10px;
          }
          //&:last-child {
          //  margin-left: 10px;
          //}
        }
      }
      .el-carousel {
        cursor: pointer;
      }
      ::v-deep .el-carousel__indicators--horizontal {
        // left: 85%;
        display: none;
      }
      ::v-deep .el-carousel__arrow {
        display: none;
      }
      .mask {
        position: absolute;
        bottom: 0px;
        background: linear-gradient(360deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 100%);
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-indent: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .boxDev{
        margin-top: 10px;
      }
      .content {
        margin-top: 16px;
        //display: flex;
        cursor: pointer;
        padding: 20px 0px;
        border-bottom: 1px solid rgba(225,225,225,1);
        box-sizing: border-box;
        &:first-child {
          margin-top: 0;
        }
        .circle {
          width: 8px;
          height: 8px;
          background: #0e67ff;
          border-radius: 50%;
          margin-right: 10px;
          margin-top: 3px;
        }
        .title {
          flex: 1;
          .h6 {
            font-size: 15px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color: #252527;
            line-height: 21px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .h6_title{
              width: 240px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              
            }
          }
          .time {
            //display: flex;
            //justify-content: flex-end;
            //margin-top: 10px;
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #929292;
          }
          .word {
            width: 100%;
            margin-top: 10px;
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #666666;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 18px;
          }
        }
        &:hover{
          background: rgba(246,248,254,1);
          .h6{
            .h6_title{
              color: #0E67FF;
            }
          }
        }
      }
    }
  }
}
</style>
