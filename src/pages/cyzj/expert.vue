<template>
  <div class="expert">
    <header>
      <el-carousel trigger="click" height="490px">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img style="width:100%;height:100%" :src=" imgurl + item.pics" alt>
          <p>{{item.title}}</p>
        </el-carousel-item>
      </el-carousel>
    </header>
    <section>
      <div class="left">
        <div class="left_top">
          <div class="left_name">
            <img src="../../static/images/icon_one.png">
            <p>专家风采</p>
          </div>
          <div class="left_more" @click="getMoreMore(1)">
            <p>查看全部</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="left_content">
          <ul>
            <li v-for="(item,index) in list1" :key="index" @click="getDetail(item)">
              <div class="introduce_left">
                <!-- <img :src="item.expertsPhotos" alt> -->
                <el-image style="width: 127px; height: 168px" :src="item.expertsPhotos" fit="cover"></el-image>
                <div class="contact" @click.stop="getContact(item)">
                  <img src="../../static/images/info_icon3.png" alt>
                  <p>联系专家</p>
                </div>
              </div>
              <div class="introduce_right">
                <h5>{{item.expertsName}}</h5>
                <div>
                  <p>职称：</p>
                  <span>{{item.theTitle}}</span>
                </div>
                <div>
                  <p>职务：</p>
                  <span>{{item.position}}</span>
                </div>
                <div>
                  <p>擅长领域：</p>
                  <ul>
                    <li v-for="(items,indexs) in item.goodAtFieldArr" :key="indexs">{{items}}</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="right_name">
            <img src="../../static/images/icon_two.png">
            <p>专家推荐</p>
          </div>
          <div class="right_more" @click="getRecommendList">
            <p>换一批</p>
            <i style="color:#0F92FF;margin-left:6px;" class="el-icon-refresh"></i>
          </div>
        </div>
        <div class="right_content">
          <ul>
            <li v-for="(item,index) in list2" :key="index" @click="getDetail(item)">
              <div class="introduce_left">
                <!-- <img :src="item.expertsPhotos" alt> -->
                <el-image style="width: 127px; height: 168px" :src="item.expertsPhotos" fit="cover"></el-image>
                <h5>{{item.expertsName}}</h5>
              </div>
              <div class="introduce_right">
                <p>擅长领域：</p>
                <div>
                  <ul>
                    <li v-for="(items,indexs) in item.goodAtFieldArr" :key="indexs">{{items}}</li>
                  </ul>
                </div>
                <div>
                  <p>职务：</p>
                  <span>{{item.position}}</span>
                </div>
                <div class="contact" @click.stop="getContact(item)">
                  <img src="../../static/images/info_icon3.png" alt>
                  <p>联系专家</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <div class="footer_left">
        <div class="left_top">
          <div class="left_name">
            <img src="../../static/images/icon_four.png">
            <p>产业要闻</p>
          </div>
          <div class="left_more" @click="getMoreMore(3)">
            <p>查看全部</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="msg">
          <ul>
            <li v-for="(item,index) in newsList" :key="index" @click="getYWDetail(item)">
              <div class="msg_left">
                <img :src="item.coverUrl" alt>
              </div>
              <div class="msg_right">
                <h5>{{item.title}}</h5>
                <p>{{item.description}}</p>
                <span>{{item.createTime | hendelDate}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer_right">
        <div class="left_top">
          <div class="left_name">
            <img src="../../static/images/icon_three.png">
            <p>阀门资料库</p>
          </div>
          <div class="left_more" @click="getMoreMore(2)">
            <p>查看全部</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="data">
          <ul>
            <li v-for="(item,index) in dataList" :key="index" @click="getFMDetail(item)">
              <div class="data_div">
                <p>{{item.title}}</p>
                <div v-if="item.fileUrl" @click.stop="getUpload(item)">
                  <i class="el-icon-download"></i>
                  <span>下载</span>
                </div>
                <div v-else @click.stop="getUpload1(item)">
                  <i style="color:rgba(0,0,0,0.2);cursor: no-drop;" class="el-icon-download"></i>
                  <span style="color:rgba(0,0,0,0.2);cursor: no-drop;">下载</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <popup
      v-if="formShow"
      :expertsName="expertsName"
      :formShow="formShow"
      :formId="formId"
      @close="getClose"
    ></popup>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
import api from "@/api/cyzjApi";
import { getBanner } from "@/api/baseApi";
import popup from "@/components/popup";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      list1: [],
      list2: [],
      newsList: [],
      dataList: [],
      bannerList: [],
      recommendId: "",
      formShow: false,
      formId: "",
      expertsName: ""
    };
  },
  components: {
    popup
  },
  mounted() {
    this.getselectInformationList();
    this.getSelectIndustryList();
    this.getRecommendList();
    this.getFCList();
    //头部banner
    getBanner({
      search_EQ_type: "cyzj"
    }).then(res => {
      if (res.status == 200) {
        this.bannerList = res.data.rows;
      }
    });
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
      this.$forceUpdate();
    }
  },
  methods: {
    //专家风采
    getFCList() {
      api
        .getFCList({
          isPlacedTop: 1,
          curPage: 1,
          pageSize: 6
        })
        .then(res => {
          if (res.status == 200) {
            this.list1 = res.data.retData[0].data;
            this.total = res.data.retData[0].total;
            for (let i = 0; i < this.list1.length; i++) {
              if (this.list1[i].expertsPhotos) {
                this.list1[i].expertsPhotos =
                  this.imgurl + this.list1[i].expertsPhotos;
              }
              if (this.list1[i].goodAtField) {
                this.list1[i].goodAtFieldArr = this.list1[i].goodAtField.split(
                  ","
                );
              } else {
                this.list1[i].goodAtFieldArr = [];
              }
            }
          }
        });
    },
    //专家推荐
    getRecommendList() {
      api
        .getRecommendList({
          id: this.recommendId
        })
        .then(res => {
          if (res.status == 200) {
            this.list2 = res.data.retData[0].data;
            for (let i = 0; i < this.list2.length; i++) {
              if (this.list2[i].expertsPhotos) {
                this.list2[i].expertsPhotos =
                  this.imgurl + this.list2[i].expertsPhotos;
              }
              if (this.list2[i].goodAtField) {
                this.list2[i].goodAtFieldArr = this.list2[i].goodAtField.split(
                  ","
                );
              } else {
                this.list2[i].goodAtFieldArr = [];
              }
            }
            this.recommendId = this.list2[this.list2.length - 1].id;
          }
        });
    },
    //查看全部
    getMoreMore(type) {
      this.$emit("fathre", type);
    },
    //产业要闻
    getselectInformationList() {
      api
        .getselectInformationList({
          categoryId: "",
          curPage: 1,
          pageSize: 3
        })
        .then(res => {
          if (res.status == 200) {
            this.newsList = res.data.retData[0].data;
            for (var i = 0; i < this.newsList.length; i++) {
              this.newsList[i].coverUrl =
                this.imgurl + this.newsList[i].coverUrl;
            }
          }
        });
    },
    //阀门资料库
    getSelectIndustryList() {
      api
        .getSelectIndustryList({
          categoryId: "",
          curPage: 1,
          pageSize: 10
        })
        .then(res => {
          console.log(res, "ressss");
          if (res.status == 200) {
            this.dataList = res.data.retData[0].data;
          }
        });
    },
    //产业要闻详情
    getYWDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: { type: "2", id: item.id }
      });
    },
    //阀门资料库详情
    getFMDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: { type: "1", id: item.id }
      });
    },
    //下载
    getUpload(item) {
      window.open(this.imgurl + item.fileUrl);
    },
    getUpload1(){},
    //是否首次预约
    getOrder(item) {
      api
        .getOrder({
          expertsId: item.id
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.retData) {
              this.formShow = true;
              this.formId = item.id;
              this.expertsName = item.expertsName;
            } else {
              api
                .getRepeatedly({
                  expertsId: item.id
                })
                .then(res => {
                  if (res.status == 200) {
                    this.$confirm(
                      "系统已经收到您的反馈，请耐心等待，谢谢 ^-^",
                      "预约结果",
                      {
                        confirmButtonText: "确定",
                        type: "success",
                        showClose: false,
                        showCancelButton: false,
                        center: true
                      }
                    ).then(() => {});
                  }
                });
            }
          }
        });
    },
    //联系专家
    getContact(item) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$message({
          message: "请先进行登录！",
          type: "error",
          duration: 2000
        });
        this.$router.push({
          path: "/login"
        });
        return;
      } else {
        this.getOrder(item);
      }
    },
    getClose(val) {
      this.formShow = val;
    },
    //查看专家
    getDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/particulars",
        query: { id: item.id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.expert {
  margin: 0 auto;
  width: 1200px;
  header {
    margin-bottom: 25px;
    .el-carousel__item {
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 60px;
        text-shadow: 0px 2px 4px rgb(0 0 0 / 30%);
        font-size: 24px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: #fff;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(1, 21, 53, 0.37) 100%
        );
      }
    }
  }
  section {
    display: flex;
    .left {
      width: 793px;
      margin-right: 22px;
      .left_top {
        display: flex;
        justify-content: space-between;
        .left_name {
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 48px;
            height: 48px;
          }
          p {
            margin-left: 20px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
          }
        }
        .left_more {
          align-items: center;
          display: flex;
          cursor: pointer;
          p {
            height: 17px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #0e67ff;
          }
          i {
            color: #0e67ff;
          }
        }
      }
      .left_content {
        margin-top: 25px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          li {
            &:hover {
              box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
            }
            cursor: pointer;
            margin-bottom: 16px;
            width: 384px;
            height: 240px;
            display: flex;
            background: linear-gradient(179deg, #eaf1ff 0%, #fcfdfe 100%);
            border-radius: 8px;
            border: 1px solid #fff;
            box-sizing: border-box;
            padding: 12px 5px 16px 7px;
            .introduce_left {
              margin-right: 16px;
              justify-content: space-between;
              display: flex;
              flex-direction: column;
              img {
                width: 127px;
                height: 168px;
              }
              .contact {
                display: flex;
                cursor: pointer;
                align-items: center;
                line-height: 28px;
                justify-content: center;
                width: 127px;
                height: 28px;
                background: #0e67ff;
                border-radius: 4px;
                border: 1px solid #0e67ff;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 3px;
                }
                p {
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #ffffff;
                }
              }
            }
            .introduce_right {
              h5 {
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: 600;
                color: #000000;
                line-height: 25px;
              }
              div {
                height: 40px;
                line-height: 20px;
                margin-top: 8px;
                display: flex;
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.7);
                p {
                  width: 50px;
                }
                span {
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
              }
              div:last-child {
                display: block;
                height: auto;
                margin-top: 4px;
                p {
                  width: 100px;
                }
                ul {
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    box-shadow: none;
                    box-sizing: border-box;
                    margin: 8px 5px 0 0;
                    padding: 1px 5px;
                    box-sizing: border-box;
                    width: auto;
                    height: auto;
                    line-height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(14, 103, 255, 0.05);
                    border-radius: 2px;
                    border: 1px solid rgba(14, 103, 255, 0.16);
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #0e67ff;
                  }
                }
              }
            }
          }
          li:nth-child(odd) {
            margin-right: 16px;
          }
        }
      }
    }
    .right {
      width: 384px;
      .right_top {
        display: flex;
        justify-content: space-between;
        .right_name {
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 48px;
            height: 48px;
          }
          p {
            margin-left: 16px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
          }
        }
        .right_more {
          align-items: center;
          display: flex;
          cursor: pointer;
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #0e67ff;
          }
          i {
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .right_content {
        margin-top: 25px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          li {
            &:hover {
              box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
            }
            cursor: pointer;
            position: relative;
            display: flex;
            padding: 12px 5px 16px 7px;
            width: 384px;
            height: 240px;
            box-sizing: border-box;
            margin-bottom: 16px;
            background: linear-gradient(179deg, #eaf1ff 0%, #fcfdfe 100%);
            border-radius: 8px;
            border: 1px solid #ffffff;
            background-image: url("../../static/images/cy_background.png");
            .introduce_left {
              margin-right: 16px;
              img {
                width: 127px;
                height: 168px;
              }
              h5 {
                width: 120px;
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: 600;
                color: #000000;
                text-align: center;
                margin-top: 16px;
              }
            }
            .introduce_right {
              p {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.7);
              }
              div {
                display: flex;
                flex-direction: column;
                margin-bottom: 16px;
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.7);
                p {
                  width: 50px;
                  margin-bottom: 5px;
                }
                span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  line-height: 17px;
                }
                ul {
                  border: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  padding: 0;
                  li {
                    box-shadow: none;
                    box-sizing: border-box;
                    padding: 0;
                    margin: 8px 5px 0 0;
                    padding: 1px 5px;
                    box-sizing: border-box;
                    width: auto;
                    height: auto;
                    line-height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(15, 146, 255, 0.06);
                    border-radius: 2px;
                    border: 1px solid rgba(15, 146, 255, 0.34);
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #0e67ff;
                  }
                }
              }
              .contact {
                position: absolute;
                bottom: 0;
                right: 5px;
                display: flex;
                flex-direction: inherit;
                cursor: pointer;
                align-items: center;
                line-height: 28px;
                justify-content: center;
                width: 127px;
                height: 28px;
                background: #0e67ff;
                border-radius: 2px;
                border: 1px solid #0e67ff;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 3px;
                }
                p {
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #ffffff;
                  width: 60px;
                  margin: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  footer {
    display: flex;
    .footer_left {
      width: 793px;
      margin-right: 20px;
      .left_top {
        display: flex;
        justify-content: space-between;
        .left_name {
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 48px;
            height: 48px;
          }
          p {
            margin-left: 20px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
          }
        }
        .left_more {
          align-items: center;
          display: flex;
          cursor: pointer;
          p {
            height: 17px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #0e67ff;
          }
          i {
            color: #0e67ff;
          }
        }
      }
      .msg {
        margin-top: 25px;
        ul {
          li {
            &:hover {
              box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
            }
            cursor: pointer;
            width: 784px;
            height: 178px;
            background: linear-gradient(179deg, #eaf1ff 0%, #fcfdfe 100%);
            border-radius: 8px;
            border: 1px solid #fff;
            box-sizing: border-box;
            margin-bottom: 16px;
            display: flex;
            padding: 18px 34px 19px 16px;
            .msg_left {
              margin-right: 16px;
              img {
                width: 218px;
                height: 141px;
              }
            }
            .msg_right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              h5 {
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: 500;
                color: #000000;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.7);
                line-height: 20px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                margin: 12px 0;
              }
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.5);
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    .footer_right {
      width: 384px;
      .left_top {
        display: flex;
        justify-content: space-between;
        .left_name {
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 48px;
            height: 48px;
          }
          p {
            margin-left: 16px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
          }
        }
        .left_more {
          align-items: center;
          display: flex;
          cursor: pointer;
          p {
            height: 17px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #0e67ff;
          }
          i {
            color: #0e67ff;
          }
        }
      }
      .data {
        margin-top: 25px;
        ul {
          width: 384px;
          height: 566px;
          box-sizing: border-box;
          padding: 15px 8px;
          background: linear-gradient(180deg, #eaf1ff 0%, #fcfdfe 100%);
          border-radius: 8px;
          border: 1px solid #ffffff;
          li {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            width: 366px;
            height: 40px;
            position: relative;
            .data_div {
              position: absolute;
              top: 0px;
              left: -20px;
              width: 406px;
              height: 40px;
              background: rgba(255, 255, 255, 0.07);
              border-radius: 8px;
              &:hover {
                box-shadow: 0px 0px 7px 2px rgb(12 56 130 / 5%);
                p {
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 600;
                  color: rgba(0, 0, 0, 0.7);
                }
              }
            }
            p {
              cursor: pointer;
              width: 300px;
              height: 40px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(0, 0, 0, 0.7);
              line-height: 40px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              margin-right: 20px;
            }
            div {
              display: flex;
              justify-content: center;
              align-items: center;
              color: #0f92ff;
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              i{
                font-size: 14px;
                font-weight: bold;
              }
              span {
                margin-left: 3px;
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 600;
                color: #0e67ff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
