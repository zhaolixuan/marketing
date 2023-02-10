<template>
  <div class="policy-list-wrap">
    <v-head ref="head" @search="handleSearch"></v-head>
    <div class="policy-list-content">
      <label-bar ref="labelBar" @change="handleChange"></label-bar>
      <div class="policy-list-header">
        <div class="policy-wrap">
          共查询到
          <div class="policy">{{ total }}</div>
          项政策
        </div>
        <div class="btn" @click="policyIntelligenceMatching">政策智能匹配</div>
      </div>
      <template v-if="total > 0">
        <div class="policy-list">
          <div
            class="policy-list-item"
            v-for="item in policyListData"
            :key="item.id"
            @click="handlePolicyDetail(item.id)"
          >
            <div class="policy-list-title-wrap">
              <div class="policy-list-title">
                {{ item.title }}
              </div>
            </div>
            <div class="policy-list-label-wrap">
              <div class="policy-list-label">
                政策主题:
              </div>
              <div
                class="policy-list-label"
                v-for="label in item.policyThemes.split(',')"
                :key="label"
              >
                {{ label }}
              </div>
            </div>
            <div class="policy-list-time-wrap">
                <div class="policy-list-time">
                  发布时间：{{
                    item.issueTime | filterTime("YYYY-MM-DD") | defaultValue
                  }}
                </div>
                <div class="policy-list-issued-by">
                  发布单位：{{ item.createDepartment | defaultValue }}
                </div>
            </div>
            <div class="policy-list-item-content">
              <div class="policy-list-text">
                {{ item.contextAbstract | defaultValue }}
              </div>
              <!-- 可申报政策显示这个 未登录和未认证不显示金额 -->
              <div
                class="policy-list-money"
                v-if="item.policyCategory === 'declare'"
              >
                <div class="money-wrap">
                  <div class="money" :class="{ active: isLogin && isAuth }">
                    {{
                      isLogin && isAuth
                        ? item.declarableFunds
                          ? item.declarableFunds
                          : "--"
                        : ""
                    }}<span>万元</span>
                  </div>
                  <div class="text">预计可申报资源</div>
                </div>
              </div>
              <!-- policyCategory 政策类别 0普通政策，1申报政策 -->
              <!-- 可申报政策显示这个 -->
              <div
                class="policy-list-btn"
                v-if="
                  (!isLogin || !isAuth) && item.policyCategory === 'declare'
                "
                @click.stop="unlockDeclaredLimit"
              >
                立即解锁申报额度
              </div>
              <div
                class="policy-list-btn"
                v-if="isLogin && isAuth && item.policyCategory === 'declare'"
                @click.stop="declareImmediately(item)"
              >
                立即申报
              </div>
              <!-- 不可申报政策显示这个 -->
              <div
                v-if="item.policyCategory === 'ordinary'"
                class="policy-list-btn"
                @click.stop="handlePolicyDetail(item.id)"
              >
                查看详情
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </template>
      <div class="no-data" v-else>
        <img :src="require('@/static/images/empty.png')" alt="" />
        <div class="text">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../mixin/auth";
import {
  notLoggedIn,
  notCertified,
  authorization,
} from "@/common/authorization.js";
import { getKeyWordSearch, getDeclare } from "@/api/hqzc";
import { to } from "@/common/util";

import vHead from "../components/header.vue";
import labelBar from "../components/labelBar.vue";
export default {
  mixins: [auth],
  components: {
    vHead,
    labelBar,
  },
  data() {
    return {
      policyListData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      keyword: "",
      policyType: "",
    };
  },
  mounted() {
    let query = this.$route.query || {};
    this.$refs["head"].setKeyword(query?.keyword || "");
    this.$refs["labelBar"].setLabelValue(2, query?.policyType || "");
    this.getKeyWordSearch();
  },
  methods: {
    // 接口需要区分政策类型现在还没有
    async getKeyWordSearch() {
      console.log('getKeyWordSearch');
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
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const getLabelValue = this.$refs["labelBar"].getLabelValue;
      const data = {
        // 页码
        page: this.currentPage,
        // 每页数据量
        rows: this.pageSize,
        policyCategory: getLabelValue(0),
        // 政策级别
        policyLevel: getLabelValue(1),
        // 政策类型
        policyType: getLabelValue(2),
        // 政策主题
        policyTheme: getLabelValue(3),
        // 关键字
        query: this.keyword,
      };
      const [err, res] = await to(getKeyWordSearch(data));

      const {
        retData: { count, queryPolicyListRes },
      } = res.data;

      this.total = count - 0;
      this.policyListData = queryPolicyListRes;
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      }).close();
    },
    handleCurrentChange() {
      this.getKeyWordSearch();
    },
    handleChange() {
      this.currentPage = 1;
      this.getKeyWordSearch();
    },
    handleSearch(value) {
      this.currentPage = 1;
      this.keyword = value;
      this.getKeyWordSearch();
      console.log('handleSearch');
    },
    // 查看政策详情
    handlePolicyDetail(id) {
      const { href } = this.$router.resolve({
        path: "/cydn/policyDetails",
        query: {
          id,
        },
      });
      window.open(href, "_blank");
    },
    // 政策智能匹配
    policyIntelligenceMatching() {
      const loginIn = () => {
        const certified = () => {
          let path = this.isNull ? "/cydn/searchList" : "/cydn/companyInfo";
          this.toPath(path);
        };
        this.isAuth ? certified() : notCertified.call(this);
      };
      this.isLogin ? loginIn() : notLoggedIn.call(this);
    },
    // 立即解锁申报额度
    unlockDeclaredLimit() {
      authorization.call(this);
    },
    // 立即申报
    async declareImmediately(item) {
      const [err, res] = await to(getDeclare({ policyId: item.id }));

      if (err) console.log(err);

      if (res?.status === 200) {
        res.data.success
          ? this.$message.error("您已申请过该政策，看看别的吧！")
          : this.$router.push({
              path: "/cydn/declareImmediately",
              query: {
                id: item.id,
                title: item.title,
              },
            });
      }
    },
    toPath(path) {
      this.$router.push({
        path,
        query: {
          companyName: this.companyName,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.policy-list-wrap {
  padding: 15px 0 30px;
  background-color: #f7faff;
  .policy-list-content {
    width: $w;
    margin: 15px auto 0;
    .policy-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
      margin: 16px 0 2px;
      height: 56px;
      background: #fff;
      box-sizing: border-box;
      .policy-wrap {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        .policy {
          margin: 0 5px;
          color: #ff9f0a;
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 144px;
        height: 36px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(14, 103, 255, 1);
        border: 1px solid currentColor;
        cursor: pointer;
        letter-spacing: 1px;
        &:hover {
          background-color: #0E67FF;
          color: rgb(255, 255, 255);
        }
      }
    }
    .policy-list {
      .policy-list-item {
        padding: 22px 26px 24px;
        background-color: #fff;
        box-sizing: border-box;
        transition: all 0.2s linear;
        cursor: pointer;
        &:hover {
          box-shadow: 0 4px 16px 8px rgb(30 33 35 / 8%);
          transform: translate3d(-5px, -5px, 0);
        }
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        .policy-list-title-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          .policy-list-title {
            width: 100%;
            height: 42px;
            font-size: 30px;
            font-weight: 600;
            color: #000;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            &:hover {
              color: rgba(14, 103, 255, 1);
            }
          }
        }
        .policy-list-label-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .policy-list-label {
            height: 22px;
            line-height: 1.5;
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
            &:not(:last-child) {
              margin-right: 15px;
            }
          }
        }
        .policy-list-time-wrap {
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 14px;
            font-weight: normal;
            color: rgba(0, 0, 0, 0.6);
            margin: 10px 0 20px;
            .policy-list-time {
              padding-left: 24px;
              background: url("~@/static/images/icon_time.png") no-repeat;
              background-size: 15px;
            }
            .policy-list-issued-by {
              margin-left: 32px;
              padding-left: 24px;
              background: url("~@/static/images/icon_Paper_plane.png") no-repeat;
              background-size: 16px;
              max-width: 300px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        .policy-list-item-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .policy-list-text {
            width: 740px;
            height: 100px;
            font-size: 16px;
            line-height: 1.5;
            font-weight: normal;
            color: rgba(0, 0, 0, 0.5);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
          .policy-list-money {
            display: flex;
            justify-content: space-between;
            &.detail {
              justify-content: flex-end;
            }
            .money-wrap {
              .money {
                position: relative;
                display: flex;
                align-items: center;
                width: 140px;
                padding-left: 70px;
                line-height: 1.5;
                font-size: 32px;
                font-weight: 600;
                color: rgba(255, 112, 13, 1);
                box-sizing: border-box;
                &.active {
                  display: inline-flex;
                  width: initial;
                  padding: 0;
                  &::before {
                    display: none;
                  }
                }
                &::before {
                  display: block;
                  content: "";
                  position: absolute;
                  top: -5px;
                  left: 0;
                  width: 79px;
                  height: 20px;
                  filter: blur(15px);
                  background: #ff700d;
                }
                span {
                  float: right;
                  margin-left: 20px;
                  font-size: 20px;
                }
              }
              .text {
                margin-top: 10px;
                padding-left: 25px;
                font-size: 15px;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
                background: url("~@/static/images/icon_money.png") no-repeat 0 0;
                background-size: 15px;
              }
            }
          }
          .policy-list-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 174px;
            height: 42px;
            font-size: 18px;
            font-weight: normal;
            color: #fff;
            background: rgba(14, 103, 255, 1);
            cursor: pointer;
            letter-spacing: 1px;
          }
        }
      }
    }
    ::v-deep .el-pagination {
      margin: 30px 0 0;
      text-align: right;
      .el-select .el-input.is-focus .el-input__inner,
      .el-pagination__sizes .el-input .el-input__inner:hover,
      .el-select .el-input__inner:focus {
        border-color: rgba(0, 127, 239, 1);
      }
      .el-pager {
        .number {
          font-size: 14px;
          background: rgba(247, 248, 250, 1);
          &.active {
            background: rgba(0, 127, 239, 1);
          }
          &:hover {
            color: rgba(0, 127, 239, 1);
          }
        }
      }
    }
    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px;
      background-color: #fff;
      box-sizing: border-box;
      img {
        width: 400px;
        height: 400px;
      }
      .text {
        margin-top: 15px;
        font-size: 25px;
        font-weight: 600;
        color: #0a88ff;
        line-height: 36px;
        text-align: center;
      }
    }
  }
}
</style>
