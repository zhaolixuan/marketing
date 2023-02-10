<template>
  <div class="matchingA">
    <div class="matchingA-first">
      <div class="matchingA_warp">
        <el-form :inline="true" class="titleBox">
          <el-form-item label="" class="form_left">
            <el-input placeholder="请输入关键字" v-model="keyword"></el-input>
            <i class="el-input__icon el-icon-search"></i>
          </el-form-item>
          <el-form-item class="form_right">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="subtitleBox">
          <div class="left">
            累计匹配<span>{{ queryTimes }}</span
            >次
          </div>
          <div class="right" @click="delMatching">
            <i class="el-input__icon el-icon-right"></i>
            <span>更新企业信息匹配更精准政策</span>
          </div>
        </div>
        <div class="query-label-wrap">
          <queryLabel
            :active.sync="policyLevel"
            :name="policyLevelData.name"
            :data="policyLevelData.data"
          ></queryLabel>
          <queryLabel
            class="label"
            :active.sync="policyType"
            :name="policyTypeData.name"
            :data="policyTypeData.data"
          ></queryLabel>
          <queryLabel
            :active.sync="policyTheme"
            :name="policyThemeData.name"
            :data="policyThemeData.data"
          ></queryLabel>
        </div>
      </div>
    </div>
    <div class="matchingA-second">
      <div v-if="policyData.length > 0" class="matchingA_container">
        <ul class="listBox">
          <li
            class="listBox-item"
            v-for="item in policyData"
            :key="item.id"
            @click="handlePolicyDetails(item)"
          >
            <h3>
              <span class="left">{{ item.title }}</span>
              <div class="right">
                <span>匹配度：</span>
                <el-rate
                  :value="item.score"
                  disabled
                  disabled-void-color="rgba(14, 103, 255, 0.2)"
                  :colors="colors"
                >
                </el-rate>
              </div>
            </h3>
            <div class="subBox">
              <ul class="subBox-left">
                <li class="li-first">
                  <div>
                    发布时间：{{
                      formatDate(item.issueTime, "yyyy-MM-dd") || "--"
                    }}
                  </div>
                  <div>发布单位：{{ item.createDepartment || "--" }}</div>
                </li>
                <li class="li-second">
                  政策主题：{{ item.policyThemes || "--" }}
                </li>
              </ul>
              <div class="subBox-right">
                <span @click.stop="handleDeclareImmediately(item)"
                  >立即申报</span
                >
              </div>
            </div>
            <div class="content" v-html="item.contextAbstract"></div>
          </li>
        </ul>
        <div class="paginationBox">
          <el-pagination
            class="pagination"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :total="total"
            layout="total, prev, pager, next"
          ></el-pagination>
        </div>
      </div>
      <div class="noData" v-else-if="policyData.length <= 0 && state1">
        <img src="../../../static/images/empty.png" alt="" />
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import queryLabel from "./queryLabel.vue";
import mix from "../config";
import {
  queryByCompanyNew,
  getSupplierAuthInfo,
  basicQuery,
  indexGet,
  getDeclare,
} from "@/api/hqzc.js";
import { formatDate } from "@/common/util";

export default {
  components: {
    queryLabel,
  },
  mixins: [mix],
  data() {
    return {
      colors: ["#FF6700", "#FF6700", "#FF6700"],
      keyword: "", // 搜索关键字
      queryTimes: 0, // 累计查询次数
      policyData: [], // 政策列表
      total: 0,
      currentPage: 1,
      pageSize: 5,
      companyName: "",
      companyInfo: {},
      maxScore: "",
      state1: false,
    };
  },
  props: {
    matchingState: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.getSupplierAuthInfo1();
  },
  watch: {},
  methods: {
    delMatching() {
      this.matchingState = true;
      this.$emit("showMatchingA");
    },
    //获取认证信息
    getSupplierAuthInfo1() {
      getSupplierAuthInfo().then((res) => {
        this.companyName = res.data.retData.companyName;
        this.basicQuery(this.companyName);
      });
    },
    //获取公司信息
    basicQuery(companyName) {
      basicQuery({ companyName: companyName }).then((res) => {
        this.companyInfo = res.data.retData || {};
        this.search();
      });
    },
    //获取政策匹配次数
    indexGet() {
      indexGet().then((res) => {
        this.queryTimes = res.data.retData[2];
      });
    },
    //搜索
    search() {
      if (this.keyword.length > 50) {
        this.$alert("政策名称最多可输入50个字符", "提示", {
          confirmButtonText: "确定",
          center: true,
          customClass: "alert",
          iconClass: "alert-icon",
          showClose: false,
        });
        return;
      }
      const data = {
        companyName: this.companyName,
        regOrgProvince: this.companyInfo.regOrgProvince,
        city: this.companyInfo.city,
        county: this.companyInfo.county,
        accurate: this.accurate,
        // 页码
        page: this.currentPage,
        // 每页数据量
        rows: this.pageSize,
        // 政策级别
        policyLevel: this.policyLevel,
        // 政策类型
        policyType: this.policyType,
        // 政策主题
        policyTheme: this.policyTheme,
        // 关键字
        query: this.keyword,
      };
      queryByCompanyNew(data)
        .then((res) => {
          if (res.status === 200) {
            const { queryPolicyListRes, count, source } = res.data.retData;
            if (this.currentPage === 1 && queryPolicyListRes.length) {
              this.maxScore = queryPolicyListRes[0].maxScore;
            }
            this.total = count - 0;
            this.accurate = source;

            queryPolicyListRes.forEach((item) => {
              item.score =
                item.score == 0.1
                  ? item.score * 5
                  : (item.score / this.maxScore) * 0.8 * 5;
            });
            this.policyData = queryPolicyListRes;
            this.indexGet();
            this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            }).close();
            this.state1 = true;
          }
        })
        .catch((err) => {
          this.state1 = false;
          console.log(err);
        });
    },
    // 跳转到详情
    handlePolicyDetails(item) {
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: item.id,
        },
      });
    },
    // 立即申报
    handleDeclareImmediately(item) {
      getDeclare({ policyId: item.id })
        .then((res) => {
          if (res.data.success) {
            this.$message.error("您已申请过该政策，看看别的吧！");
          } else {
            this.$router.push({
              path: "/cydn/declareImmediately",
              query: {
                id: item.id,
                title: item.title,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.matchingA {
  width: 100%;
  .matchingA-first {
    width: 100%;
    min-height: 290px;
    background: rgba(14, 103, 255, 0.03);
    .matchingA_warp {
      width: 1200px;
      margin: 0 auto;
      padding: 38px 50px 25px;
      box-sizing: border-box;
      .titleBox {
        width: 100%;
        box-shadow: 0px 0px 10px 6px rgba(14, 103, 255, 0.07);
        .form_left {
          width: 91%;
          ::v-deep .el-form-item__content {
            font-size: 16px;
            width: 100% !important;
            position: relative;
            .el-input__inner {
              height: 40px;
              padding-right: 40px;
              box-sizing: border-box;
              border-radius: 8px;
              background: linear-gradient(180deg, #f3f7ff 0%, #fcfdfe 100%);
              border: 1px solid #ffffff;
            }
            .el-icon-search {
              position: absolute;
              top: 0;
              right: 10px;
              color: #dcdfe6;
              font-size: 18px;
            }
          }
        }
        .form_right {
          width: 9%;
          text-align: right;
          .el-button--primary {
            color: #fff;
            background-color: #0e67ff;
            border-color: #0e67ff;
            width: 86px;
            height: 40px;
            font-size: 18px;
            border-radius: 10px;
          }
        }
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 0px;
          margin-right: 0px;
        }
      }
      .subtitleBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
        margin-bottom: 12px;
        .left {
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          display: flex;
          align-items: center;
          span {
            font-size: 28px;
            font-weight: 500;
            color: #ff700d;
            margin-left: 5px;
            margin-right: 10px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .el-icon-right {
            font-size: 21px;
            color: #ff6700;
            margin-right: 15px;
          }
          span {
            font-size: 18px;
            font-weight: 400;
            color: #ff6700;
            line-height: 40px;
            text-decoration: underline;
          }
        }
      }
    }
  }
  .matchingA-second {
    width: 100%;
    background: #f2f7fb;
    padding: 15px 0px;
    box-sizing: border-box;
    .matchingA_container {
      width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      .listBox {
        padding: 5px 20px 0px;
        box-sizing: border-box;
        .listBox-item {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 27px 0px 28px;
          box-sizing: border-box;
          cursor: pointer;
          h3 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .left {
              width: 850px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              font-size: 30px;
              color: #000000;
              line-height: 42px;
            }
            &:hover {
              .left {
                color: #0e67ff;
              }
            }
            .right {
              width: 250px;
              display: flex;
              align-items: center;
              span {
                font-size: 18px;
                color: #333333;
              }
              .el-rate {
                height: 30px;
              }
              ::v-deep .el-rate__icon {
                font-size: 30px;
                margin-right: 5px;
              }
            }
          }
          .subBox {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .subBox-left {
              margin-top: 12px;
              .li-first {
                font-size: 16px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.6);
                line-height: 22px;
                margin-bottom: 8px;
                display: flex;
                div {
                  margin-right: 40px;
                }
              }
              .li-second {
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
                line-height: 22px;
              }
            }
            .subBox-right {
              display: flex;
              align-items: flex-end;
              span {
                display: inline-block;
                width: 122px;
                height: 42px;
                background: #0e67ff;
                border-radius: 8px;
                text-align: center;
                line-height: 42px;
                font-size: 18px;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
          .content {
            margin-top: 30px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            line-height: 28px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .paginationBox {
        width: 100%;
        text-align: right;
        padding: 10px 0px 40px;
        box-sizing: border-box;
        ::v-deep
          .el-pagination.is-background
          .el-pager
          li:not(.disabled).active {
          background-color: #0e67ff;
          color: #fff;
        }
      }
    }
    .noData {
      width: 1200px;
      margin: 0 auto;
      background: #fff;
      padding: 60px 0px;
      box-sizing: border-box;
      text-align: center;
      img {
        width: 400px;
        height: 400px;
      }
      p {
        margin-top: 15px;
        font-size: 25px;
        font-weight: 600;
        color: #0a88ff;
        line-height: 36px;
      }
    }
  }
  .label {
    margin: 10px 0px !important;
  }
}
</style>
