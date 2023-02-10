<template>
  <div>
    <el-image style="height: 300px" :src="bannerImg" fit="cover"></el-image>
    <header>
      <div class="aaa">
        <div class="search">
          <el-input placeholder="请输入专家姓名关键字" v-model="expertsName">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="getSearchWord">查 询</el-button>
        </div>
        <div class="search_title">
          <p>行业关键词</p>
          <ul v-loading="loading">
            <li
              :class="{'active':activeIndex == index}"
              v-for="(item,index) in searchList"
              :key="index"
              @click="getSearchDetail(item,index)"
            >{{item.tagName}}</li>
          </ul>
        </div>
      </div>
    </header>
    <div class="warehouse">
      <section>
        <!-- <div class="top">
          <img src="../../../static/images/icon_two.png" alt>
          <p>专家推荐</p>
        </div> -->
        <div class="content">
          <ul>
            <li v-for="(item,index) in list" :key="index" @click="getDetail(item)">
              <div class="imgDiv">
                <el-image style="width: 270px;;height: 270px" :src="item.expertsPhotos" fit="cover"></el-image>
              </div>
              <p>{{item.expertsName}}</p>
              <div class="introduce">
                <span>职称：{{item.theTitle}}</span>
              </div>
              <div class="introduce">
                <span>职务：{{item.position}}</span>
              </div>
              <div class="skill">
                <p>擅长领域：</p>
                <ul>
                  <li v-for="(items,indexs) in item.goodAtFieldArr" :key="indexs">{{items}}</li>
                </ul>
              </div>
              <div class="contact" @click.stop="getContact(item)">
                <img src="../../../static/images/info_icon3.png" alt>
                <p>联系专家</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <footer>
        <el-pagination
          background
          layout="total,prev, pager, next"
          style="text-align:right;margin-top:16px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </footer>
      <popup
        :expertsName="expertsNameForm"
        v-if="formShow"
        :formShow="formShow"
        :formId="formId"
        @close="getClose"
      ></popup>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
import api from "@/api/cyzjApi";
import popup from "@/components/popup";
export default {
  data() {
    return {
      bannerImg: require("../../../static/images/warehouse_banner.png"),
      imgurl: process.env.VUE_APP_IMG_URL,
      expertsName: "",
      expertsNameForm: "",
      goodAtFieldId: "",
      curPage: 1,
      pageSize: 12,
      total: 0,
      activeIndex: 0,
      loading: false,
      formShow: false,
      formId: "",
      searchList: [
        {
          tagName: "全部",
          id: ""
        }
      ],
      list: []
    };
  },
  components: {
    popup
  },
  mounted() {
    this.getFields();
    this.getExpertsList();
  },
  methods: {
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
              this.expertsNameForm = item.expertsName;
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
    getClose(val) {
      this.formShow = val;
    },
    getDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/particulars",
        query: { id: item.id }
      });
    },
    //获取行业关键词
    getFields() {
      api.getFields({}).then(res => {
        if (res.status == 200) {
          this.searchList = this.searchList.concat(res.data.retData).slice(0,31)
        }
      });
    },
    //行业模糊搜索
    getSearchWord() {
      this.curPage = 1;
      this.getExpertsList();
    },
    //行业关键词搜索
    getSearchDetail(item, index) {
      this.activeIndex = index;
      this.curPage = 1;
      this.goodAtFieldId = item.id;
      this.getExpertsList();
    },
    //专家列表
    getExpertsList() {
      this.loading = true;
      api
        .getExpertsList({
          expertsName: this.expertsName,
          goodAtFieldId: this.goodAtFieldId,
          curPage: this.curPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          if (res.status == 200) {
            this.list = res.data.retData[0].data;
            this.total = res.data.retData[0].total;
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].expertsPhotos) {
                this.list[i].expertsPhotos =
                  this.imgurl + this.list[i].expertsPhotos;
              }
              if (this.list[i].goodAtField) {
                this.list[i].goodAtFieldArr = this.list[i].goodAtField.split(
                  ","
                );
              } else {
                this.list[i].goodAtFieldArr = [];
              }
            }
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.loading = true;
      this.curPage = val;
      this.getExpertsList();
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  height: 300px;
}
header {
  .aaa {
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 38px 150px;
  }
  background: rgba(24, 144, 255, 0.06);

  .search {
    display: flex;
    ::v-deep .el-input {
      .el-input__inner {
        background: linear-gradient(
          180deg,
          #f3f7ff 0%,
          #fcfdfe 100%
        ) !important;
        border-radius: 8px !important;
        border: 1px solid #ffffff !important;
        height: 40px !important;
      }
    }
    button {
      margin-left: 20px;
      width: 75px;
      height: 40px;
      background: #0e67ff;
      border-radius: 10px;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #ffffff;
    }
  }
  .search_title {
    margin-top: 25px;
    display: flex;
    p {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: rgba(0, 0, 0, 0.4);
      line-height: 22px;
      width: 90px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      li {
        font-size: 16px;
        margin-left: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.8);
        &:hover {
          color: #0f92ff;
        }
      }
      .active {
        color: #0f92ff;
      }
    }
  }
}
.warehouse {
  margin: 0 auto;
  width: 1200px;

  section {
    margin-top: 20px;
    .top {
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: 48px;
        margin-right: 16px;
      }
      p {
        width: 64px;
        height: 22px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #000000;
        line-height: 22px;
      }
    }
    .content {
      margin-top: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          &:hover {
            box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
          }
          cursor: pointer;
          width: 284px;
          height: 574px;
          margin-right: 16px;
          margin-bottom: 16px;
          background: linear-gradient(179deg, #eaf1ff 0%, #fcfdfe 100%);
          border-radius: 8px;
          border: 1px solid #fff;
          box-sizing: border-box;
          padding: 8px;
          display: flex;
          flex-direction: column;
          .imgDiv {
            img {
              width: 266px;
              height: 180px;
            }
          }
          p {
            margin: 14px 0 8px;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #000000;
            line-height: 25px;
          }
          .introduce {
            height: 40px;
            line-height: 20px;
            display: flex;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 8px;
            span {
              height: 40px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(0, 0, 0, 0.7);
              line-height: 20px;
            }
          }
          .skill {
            height: 100px;
            border-bottom: 1px dashed rgba(14, 103, 255, 0.23);
            p {
              margin: 0;
              width: 80px;
              height: 20px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(0, 0, 0, 0.7);
              line-height: 20px;
            }
            ul {
              li {
                height: auto;
                line-height: 20px;
                margin: 0;
                padding: 0;
                width: auto;
                padding: 1px 5px;
                box-sizing: border-box;
                margin: 8px 5px 0 0;
                background: rgba(15, 146, 255, 0.06);
                border-radius: 2px;
                border: 1px solid rgba(15, 146, 255, 0.34);
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #0e67ff;
                &:hover{
                  box-shadow: none;
                }
              }
            }
          }
          .contact {
            margin-top: 10px;
            display: flex;
            cursor: pointer;
            align-items: center;
            line-height: 28px;
            justify-content: center;
            width: 266px;
            height: 36px;
            background: #0e67ff;
            border-radius: 2px;
            border: 1px solid #0e67ff;
            img {
              width: 16px;
              height: 16px;
              margin-right: 3px;
            }
            p {
              margin: 0;
              width: 60px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
        li:nth-child(4n) {
          margin: 0;
        }
      }
    }
  }
  footer {
    text-align: right;
    margin: 15px 15px 38px 0;
    ::v-deep .el-pagination {
      .el-pagination__total {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        margin-right: 20px;
      }
      .el-pager {
        li {
          width: 32px;
          height: 32px;
          line-height: 32px;
          background: #f7f8fa;
          border-radius: 2px;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
        }
        .active {
          background: #0e67ff !important;
          border-radius: 2px;
          border: 1px solid #0e67ff;
          color: #ffffff;
        }
      }
      .btn-prev,
      .btn-next {
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 2px;
      }
    }
  }
}
</style>
