<template>
  <div class="policy-recommendation">
    <div class="title">政策推荐</div>
    <policy-header :value="total"></policy-header>
    <!-- :style="{ height: flag ? '300px' : '56px' }" -->
    <div
      class="policy-recommendation-label-wrap"
      :style="{ height: flag ? '180px' : '56px' }"
    >
      <div class="open-wrap" @click="handleClick">
        <div class="open-text">{{ flag ? "点击收起" : "展开更多" }}</div>
        <div class="open-icon" :class="{ active: flag }"></div>
      </div>
      <v-label
        v-for="(item, index) in labelData"
        :key="index"
        :name="item.name"
        :data="item.data"
        :active.sync="item.active"
        :bottomLine="false"
        @change="handleChange"
      ></v-label>
    </div>
    <template v-if="total > 0">
      <div class="policy-list">
        <div
          class="policy-list-item"
          v-for="(item, index) in policyRecommendation"
          :key="index"
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
              v-for="label in item.policyThemes"
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
          <div class="matching-degree-wrap">
            <div class="matches">
              匹配项：
              <div class="value">
                {{ item.policyMatchCount | defaultValue }}
              </div>
              <div class="unit">项</div>
            </div>
            <div class="matching-degree">
              匹配度：
              <el-rate
                :value="item.score"
                disabled
                disabled-void-color="rgba(14, 103, 255, 0.2)"
                :colors="colors"
              >
              </el-rate>
            </div>
          </div>
          <div class="policy-list-item-content">
            <div class="policy-list-text">
              {{ item.contextAbstract | defaultValue }}
            </div>
            <!-- 可申报政策显示这个 -->
            <div
              class="policy-list-money"
              v-if="item.policyCategory === 'declare'"
            >
              <div class="money-wrap">
                <div class="money">
                  {{ item.declarableFunds | defaultValue }}<span>万元</span>
                </div>
                <div class="text">预计可申报资源</div>
              </div>
            </div>
            <!-- 可申报政策显示这个 -->
            <div
              class="policy-list-btn"
              @click.stop="declareImmediately(item)"
              v-if="item.policyCategory === 'declare'"
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
      <div class="pagination">
        <el-pagination
          background
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </template>
    <div class="no-data" v-else>
      <img :src="require('@/static/images/empty.png')" alt="" />
      <div class="text">暂无数据</div>
    </div>
  </div>
</template>

<script>
import {
  dictList,
  getDeclare,
  basicQuery,
  queryByCompanyNew,
} from "@/api/hqzc";
import policyHeader from "./policyHeader.vue";
import vLabel from "../../components/label.vue";
export default {
  components: {
    policyHeader,
    vLabel,
  },
  data() {
    return {
      labelData: [
        {
          name: "政策分类：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        {
          name: "政策级别：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        {
          name: "政策类型：",
          active: "",
          data: [
            {
              title: "全部",
              value: "",
            },
          ],
        },
        // {
        // name: "政策主题：",
        // active: "",
        // data: [
        //   {
        //     title: "全部",
        //     value: "",
        //   },
        // ],
        // bottomLine: false,
        // },
      ],
      labelTypes: [
        "policy_category",
        "policy_level",
        "policy_type",
        // "policy_theme",
      ],
      policyRecommendation: [],
      pageSize: 5,
      total: 0,
      currentPage: 1,
      flag: false,
      colors: ["#FF6700", "#FF6700", "#FF6700"],
      maxScore: 0,
      accurate: "",
      city: "",
    };
  },
  created() {
    this.labelTypes.forEach((type, index) => this.getLabelData(type, index));
    this.getBasicQuery();
    this.getData();
  },
  methods: {
    async getData() {
      const res = await queryByCompanyNew({
        companyName: this.$store.state.userInfo.companyInfo.companyName,
        regOrgProvince: this.city,
        accurate: this.accurate || "",
        page: this.currentPage,
        rows: this.pageSize,
        policyCategory: this.labelData[0].active,
        policyLevel: this.labelData[1].active,
        policyType: this.labelData[2].active,
        // policyTheme: this.labelData[3].active,
        policyTheme: "",
        query: "",
      });
      const { retData, success } = res.data;
      if (success) {
        if (this.currentPage === 1 && retData.queryPolicyListRes.length) {
          this.maxScore = retData.queryPolicyListRes[0].maxScore;
        }
        retData.queryPolicyListRes.forEach((item) => {
          item.policyThemes = item.policyThemes
            ? item.policyThemes.split()
            : ["--"];
          item.score =
            item.score === 0.1
              ? item.score * 5
              : (item.score / this.maxScore) * 0.8 * 5;
        });
        this.accurate = retData.source;
        this.policyRecommendation = retData.queryPolicyListRes;
        this.total = retData.count - 0;
      }
    },
    async getBasicQuery() {
      const res = await basicQuery({
        companyName: this.$store.state.userInfo.companyInfo.companyName,
      });
      const { retData, success } = res.data;
      if (success) {
        this.city = retData.regOrgProvince || "";
      }
    },
    handleClick() {
      this.flag = !this.flag;
      this.$emit("toggle", this.flag);
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
    // 立即申报
    async declareImmediately(item) {
      const res = await getDeclare({ policyId: item.id });

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
    async getLabelData(dictType, index) {
      const res = await dictList({ dictType });
      this.labelData[index].data.push(...res.data);
    },
    handleChange() {
      this.currentPage = 1;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.policy-recommendation {
  width: 1200px;
  margin: 0 auto 60px;
  transform: translateY(-220px);
  .title {
    margin-bottom: 24px;
    font-size: 36px;
    font-weight: 600;
    color: rgba(29, 29, 31, 1);
  }
  .label-wrap {
    padding: 14px 0;
  }
  .policy-recommendation-label-wrap {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    transition: all 0.2s linear 0s;
    margin-bottom: 1px;
    .open-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      top: 16px;
      right: 26px;
      cursor: pointer;
      .open-text {
        font-size: 16px;
        font-weight: normal;
        color: rgba(51, 51, 51, 1);
        margin-right: 7px;
      }
      .open-icon {
        width: 24px;
        height: 24px;
        background: url("~@/static/images/new_zk.png");
        background-size: cover;
        transition: all 0.5s linear 0s;
        &.active {
          transform: rotate(180deg);
        }
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
        margin-bottom: 1px;
      }
      .policy-list-title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        .policy-list-title {
          width: 100%;
          line-height: 42px;
          font-size: 28px;
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
        margin: 6px 0 10px;
        align-items: center;
        .policy-list-label {
          line-height: 22px;
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
        }
      }
      .matching-degree-wrap {
        display: flex;
        align-items: center;
        margin: 14px 0 10px;
        .matches {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-right: 63px;
          .value {
            font-size: 24px;
            font-weight: 600;
            color: rgba(255, 112, 13, 0.99);
            margin-right: 7px;
          }
          .unit {
            font-size: 16px;
            font-weight: 600;
            color: rgba(255, 112, 13, 1);
          }
        }
        .matching-degree {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
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
              display: flex;
              align-items: center;
              line-height: 1.5;
              font-size: 32px;
              font-weight: 600;
              color: rgba(255, 112, 13, 1);
              span {
                margin-left: 10px;
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
        }
      }
    }
  }
  .pagination {
    width: 100%;
    padding: 1px 0 0;
    box-sizing: border-box;
    text-align: right;
    ::v-deep .el-pagination {
      padding: 8px 0;
      background-color: #fff;
    }
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #007fef;
      color: #fff;
    }
    ::v-deep .el-pagination.is-background .el-pager li {
      background-color: #f7f8fa;
    }
    ::v-deep .el-pagination.is-background .btn-next,
    ::v-deep .el-pagination.is-background .btn-prev {
      background-color: rgba(0, 0, 0, 0.03);
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
</style>
