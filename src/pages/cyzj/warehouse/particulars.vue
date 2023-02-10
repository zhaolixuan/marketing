<template>
  <div class="detail">
    <div class="left">
      <header>
        <div class="left_top">
          <el-image
            style="width:228px;height:304px;margin-right:16px;"
            :src="infoObj.expertsPhotos"
            fit="cover"
          ></el-image>
          <div class="msg">
            <h5>{{infoObj.expertsName}}</h5>
            <p class="over">
              服务次数：
              <span>{{infoObj.serviceTimes ? infoObj.serviceTimes : 0 }}</span>
            </p>
            <p class="over">擅长领域：</p>
            <ul>
              <li v-for="(item,index) in infoObj.goodAtField" :key="index">{{item}}</li>
            </ul>
            <p class="over over1">职务：{{infoObj.position}}</p>
            <p class="over over1">职称：{{infoObj.theTitle}}</p>
            <div
              v-if="tokenShow && repeatedlyShow"
              class="contact"
              @click.stop="getContact(infoObj)"
            >
              <!-- <i class="el-icon-phone"></i> -->
              <img src="../../../static/images/info_icon3.png" alt>
              <p>立即预约</p>
            </div>
            <div v-if="tokenShow && !repeatedlyShow" class="contact" @click.stop="getRepeatedly">
              <img src="../../../static/images/info_icon3.png" alt>
              <p>再次预约</p>
            </div>
          </div>
        </div>
        <div class="left_bottom">
          <div class="achievement">
            <p>主要成就：</p>
            <span>
              {{infoObj.achievements}}
              <!-- <span>展开全部</span> -->
            </span>
          </div>
        </div>
      </header>
      <section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="专家介绍" name="first">
            <p v-html="infoObj.introduce" class="word"></p>
          </el-tab-pane>
          <el-tab-pane label="项目案例" name="second">
            <ul class="project_list" v-loading="projectLoading" v-if="activeName == 'second'">
              <li
                v-for="(item,index) in projectList"
                :key="index"
                @click="getProjectDetail(item,'3','3')"
              >
                <img :src="imgurl + item.columns.cover">
                <h5>{{item.columns.projectName}}</h5>
                <p>
                  内容简介：
                  <span v-html="item.columns.content"></span>
                </p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="学术成果" name="third">
            <ul class="learning" v-loading="learnLoading" v-if="activeName == 'third'">
              <li
                v-for="(item,index) in learnList"
                :key="index"
                :class="{'aaa':(index+1)%2==0}"
                @click="getProjectDetail(item,'3','1')"
              >
                <p>
                  {{item.columns.title}}
                  <span>{{item.columns.createTimeStr}}</span>
                </p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="专家期刊" name="fourth">
            <ul class="periodical" v-loading="periodicalLoading" v-if="activeName == 'fourth'">
              <li
                v-for="(item,index) in periodicalList"
                :key="index"
                :class="{'aaa':(index+1)%2==0}"
                @click="getProjectDetail(item,'3','2')"
              >
                <p>
                  {{item.columns.title}}
                  <span>{{item.columns.createTimeStr}}</span>
                </p>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <el-pagination
          v-if="activeName != 'first'"
          background
          layout="total,prev, pager, next"
          style="text-align:right;margin-top:16px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </section>
    </div>
    <div class="right" v-if="rightList.length > 0">
      <footer>
        <h5>学术成果</h5>
        <el-collapse v-model="activeName1" accordion>
          <el-collapse-item v-for="(item,index) in rightList" :key="index" :name="index">
            <template slot="title">
              <p>{{item.columns.title}}</p>
              <span>{{item.columns.createTimeStr}}</span>
            </template>
            <div v-html="item.columns.content"></div>
            <span
              @click.stop="getProjectDetail(item,'3','1')"
              style="width:100%;margin:0;text-align: right;display: inline-block;"
            >【查看详情】</span>
          </el-collapse-item>
        </el-collapse>
      </footer>
    </div>
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
import { setTimeout } from "timers";
import api from "@/api/cyzjApi";
import popup from "@/components/popup";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      list: [],
      messageList: [],
      activeName: "first",
      activeName1: 0,
      projectList: [],
      learnList: [],
      learnLoading: false,
      periodicalList: [],
      projectLoading: false,
      periodicalLoading: false,
      id: "",
      infoObj: {},
      total: 0,
      curPage: 1,
      pageSize: 10,
      type: 0,
      rightList: [],
      formShow: false,
      formId: "",
      expertsName: "",
      repeatedlyShow: true,
      tokenShow: false
    };
  },
  components: {
    popup
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getLearnList();
    const token = localStorage.getItem("token");
    if (!token) {
      this.tokenShow = false;
    } else {
      this.tokenShow = true;
    }
    this.getOrder();
  },
  methods: {
    //是否首次预约
    getOrder() {
      api
        .getOrder({
          expertsId: this.id
        })
        .then(res => {
          if (res.data.success) {
            this.repeatedlyShow = res.data.retData;
          }
          this.getInfo();
        });
    },
    //再次预约
    getRepeatedly() {
      api
        .getRepeatedly({
          expertsId: this.id
        })
        .then(res => {
          if (res.status == 200) {
            this.getInfo();
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
            ).then(() => {
              //   this.$message({
              //     type: "success",
              //     message: "删除成功!"
              //   });
            });
          }
        });
    },
    //获取学术成果
    getLearnList() {
      api
        .getOtherList({
          id: this.id,
          type: "1",
          curPage: 1,
          pageSize: 3
        })
        .then(res => {
          if (res.status == 200) {
            this.rightList = res.data.retData[0].data;
            for (var i = 0; i < this.rightList.length; i++) {
              this.rightList[i].columns.createTimeStr = formatDate(
                this.rightList[i].columns.createTime,
                "yyyy-MM-dd"
              );
            }
          }
        });
    },
    //专家详情
    getInfo() {
      api
        .getInfo({
          id: this.id
        })
        .then(res => {
          if (res.status == 200) {
            this.infoObj = res.data.retData;
            this.infoObj.expertsPhotos =
              this.imgurl + this.infoObj.expertsPhotos;
          }
        });
    },
    getOtherList() {
      api
        .getOtherList({
          id: this.id,
          type: this.type,
          curPage: this.curPage,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.status == 200) {
            this.periodicalLoading = false;
            this.learnLoading = false;
            this.projectLoading = false;
            if (this.type == "3") {
              this.projectList = res.data.retData[0].data;
              this.total = res.data.retData[0].total;
              // for(var i = 0 ; i < this.projectList.length; i++){
              //   this.projectList[i].cover = this.imgurl + this.projectList[i].cover
              // }
            } else if (this.type == "1") {
              this.learnList = res.data.retData[0].data;
              this.total = res.data.retData[0].total;
              for (var i = 0; i < this.learnList.length; i++) {
                this.learnList[i].columns.createTimeStr = formatDate(
                  this.learnList[i].columns.createTime,
                  "yyyy年MM月dd日 hh:mm:ss"
                );
              }
            } else if (this.type == "2") {
              this.periodicalList = res.data.retData[0].data;
              this.total = res.data.retData[0].total;
              for (var i = 0; i < this.periodicalList.length; i++) {
                this.periodicalList[i].columns.createTimeStr = formatDate(
                  this.periodicalList[i].columns.createTime,
                  "yyyy年MM月dd日 hh:mm:ss"
                );
              }
            }
          }
        });
    },
    //学术、期刊、成果列表
    handleClick(tab, event) {
      this.periodicalLoading = true;
      this.learnLoading = true;
      this.projectLoading = true;
      if (tab.index == "1") {
        this.curPage = 1;
        this.pageSize = 9;
        this.type = "3";
      } else if (tab.index == "2") {
        this.curPage = 1;
        this.pageSize = 10;
        this.type = "1";
      } else if (tab.index == "3") {
        this.curPage = 1;
        this.pageSize = 10;
        this.type = "2";
      }
      this.getOtherList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.periodicalLoading = true;
      this.learnLoading = true;
      this.projectLoading = true;
      this.curPage = val;
      this.getOtherList();
    },
    getContact(obj) {
      console.log(obj);
      this.formShow = true;
      this.formId = this.id;
      this.expertsName = obj.expertsName;
    },
    getClose(val) {
      this.formShow = val;
      this.getOrder();
    },
    //项目案例详情
    getProjectDetail(item, type, moldType) {
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: {
          id: item.columns.id,
          type,
          expertsId: this.id,
          moldType: moldType
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  display: flex;
  margin: 18px auto 0;
  width: 1200px;
  justify-content: center;
  .left {
    margin-right: 12px;
    header {
      width: 784px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.09);
      box-sizing: border-box;
      margin-bottom: 16px;
      padding: 12px 14px 20px 9px;
      .left_top {
        display: flex;
        img {
          width: 222px;
          height: 296px;
          margin-right: 16px;
        }
        .msg {
          flex: 1;
          position: relative;
          h5 {
            width: 380px;
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
            line-height: 33px;
          }
          p {
            height: 28px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
            line-height: 28px;
            display: flex;
            span {
              display: inline-block;
              height: 28px;
              font-size: 20px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: #ff700d;
              line-height: 28px;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            li {
              width: auto;
              height: auto;
              padding: 3px;
              box-sizing: border-box;
              background: rgba(15, 146, 255, 0.06);
              border-radius: 2px;
              border: 1px solid rgba(15, 146, 255, 0.34);
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #0f92ff;
              text-align: center;
              line-height: 22px;
              margin-right: 8px;
            }
          }
          .over {
            margin-top: 10px;
            display: inherit;
            width: 520px;
          }
          .over1 {
            height: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .contact {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            cursor: pointer;
            align-items: center;
            line-height: 28px;
            justify-content: center;
            width: 127px;
            height: 28px;
            background: #0f92ff;
            border-radius: 2px;
            border: 1px solid #0f92ff;
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
      }
      .left_bottom {
        .achievement {
          p {
            margin: 9px 0;
            height: 22px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: bolder;
            color: rgba(0, 0, 0, 0.8);
            line-height: 22px;
          }
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
            line-height: 20px;
          }
        }
      }
    }
    section {
      background: #ffffff;
      width: 784px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      padding: 12px;
      box-sizing: border-box;
      .el-tabs {
        .word {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #333333;
          line-height: 28px;
        }
        .project_list {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 6px;
            width: 242px;
            height: 247px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.09);
            box-sizing: border-box;
            cursor: pointer;
            margin: 0 16px 16px 0;
            img {
              width: 230px;
              height: 128px;
            }
            h5 {
              height: 22px;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: rgba(0, 0, 0, 0.8);
              line-height: 22px;
              margin: 8px 0;
            }
            p {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(0, 0, 0, 0.8);
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              span {
                color: rgba(0, 0, 0, 0.6);
              }
            }
          }
          li:nth-child(3n) {
            margin-right: 0;
          }
        }
        .learning,
        .periodical {
          li {
            width: 760px;
            height: 38px;
            padding: 0 22px;
            box-sizing: border-box;
            cursor: pointer;
            p {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: rgba(0, 0, 0, 0.8);
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(0, 0, 0, 0.4);
              }
            }
          }
          .aaa {
            background: rgba(0, 0, 0, 0.04);
          }
        }
      }
    }
  }
  .right {
    footer {
      background: #ffffff;
      width: 384px;
      height: 659px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      padding: 18px 10px;
      box-sizing: border-box;
      h5 {
        font-size: 20px;
        font-family: "Microsoft YaHei";
        font-weight: bolder;
        color: #000000;
        line-height: 28px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
      }
      p {
        margin-top: 20px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
      }
      div {
        margin-top: 8px;
        line-height: 20px;
        span {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
        }
        span:last-child {
          color: #0f92ff;
          cursor: pointer;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-top: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          p {
            margin: 0;
            width: 272px;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: blod;
            color: rgba(0, 0, 0, 0.8);
            margin-right: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
          span {
            flex: 1;
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .el-collapse {
        border-top: 0 !important;
        ::v-deep .el-collapse-item__header {
          display: flex;
          justify-content: space-between;
        }
        p {
          margin: 0;
          width: 272px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: blod;
          color: rgba(0, 0, 0, 0.8);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        span {
          margin-left: 10px;
          font-size: 12px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: rgba(0, 0, 0, 0.5);
        }
        ::v-deep .el-icon-arrow-right {
          font-size: 0 !important;
        }
      }
    }
  }
}
</style>
