<template>
  <div class="policy-recommendation">
    <div class="title">政策推荐</div>
    <div class="policy-recommendation-content">
      <div
        class="policy-recommendation-item"
        v-for="(item, index) in policyRecommendation"
        :key="index"
        @click="handlePolicyDetail(item.id)"
      >
        <div class="policy-recommendation-title">
          {{ item.title }}
        </div>
        <div class="policy-recommendation-text">
          {{ item.contextAbstract | defaultValue }}
        </div>
        <div class="issued-by-wrap">
          <div class="issued-by">
            发布单位：{{ item.createDepartment | defaultValue }}
          </div>
          <div class="time">
            {{ item.issueTime | filterTime("YYYY-MM-DD") | defaultValue }}
          </div>
        </div>
        <div class="line"></div>
        <!-- 可申报政策显示这个 -->
        <div
          class="policy-recommendation-bottom"
          v-if="item.policyCategory === 'declare'"
        >
          <div class="money-wrap">
            <div class="money">
              {{ item.declarableFunds | defaultValue }}<span>万元</span>
            </div>
            <div class="text">预计可申报资源</div>
          </div>
          <div class="btn" @click.stop="declareImmediately(item)">立即申报</div>
        </div>
        <!-- 不可申报政策显示这个 -->
        <div
          class="policy-recommendation-bottom detail"
          v-if="item.policyCategory === 'ordinary'"
        >
          <div class="btn detail" @click.stop="handlePolicyDetail">
            查看详情
          </div>
        </div>
      </div>
    </div>
    <div class="more-recommendations" @click="handleMoreRecommendations">
      获取更多推荐
    </div>
  </div>
</template>

<script>
import { getDeclare, basicQuery, queryByCompanyNew } from "@/api/hqzc";
export default {
  data() {
    return {
      policyRecommendation: [],
      city: "",
      accurate: ""
    };
  },
  created() {
    this.getBasicQuery();
    this.getPolicyRecommendation();
  },
  methods: {
    async getPolicyRecommendation() {
      const res = await queryByCompanyNew({
        companyName: this.$store.state.userInfo.companyInfo.companyName,
        regOrgProvince: this.city,
        page: 1,
        rows: 6,
        policyCategory: "",
        policyLevel: "",
        policyType: "",
        policyTheme: "",
        query: "",
        accurate: this.accurate || "",
      });
      const { retData, success } = res.data;
      if (success) {
        this.policyRecommendation = retData.queryPolicyListRes;
        this.accurate = retData.source;
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
    // 更多推荐
    handleMoreRecommendations() {
      this.$router.push("/cydn/matching");
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
  .policy-recommendation-content {
    display: flex;
    flex-wrap: wrap;
    .policy-recommendation-item {
      padding: 42px 36px 40px 23px;
      width: 390px;
      height: 308px;
      background: #fff;
      box-sizing: border-box;
      transition: all 0.2s linear;
      cursor: pointer;
      &:hover {
        box-shadow: 0 4px 16px 8px rgb(30 33 35 / 8%);
        transform: translate3d(-5px, -5px, 0);
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        margin-bottom: 15px;
      }
      &:nth-child(2),
      &:nth-child(5) {
        margin-left: 15px;
        margin-right: 15px;
      }
      .policy-recommendation-title {
        font-size: 22px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .policy-recommendation-text {
        margin: 20px 0 30px;
        font-size: 14px;
        height: 63px;
        line-height: 1.5;
        font-weight: normal;
        color: rgba(34, 34, 34, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .issued-by-wrap {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: normal;
        color: rgba(153, 153, 153, 1);
      }
      .line {
        margin-top: 14px;
        width: 330px;
        height: 1px;
        background-color: rgba(219, 219, 219, 1);
      }
      .policy-recommendation-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 14px;
        &.detail {
          justify-content: flex-end;
        }
        .money-wrap {
          .money {
            position: relative;
            display: flex;
            align-items: center;
            font-size: 32px;
            font-weight: 600;
            height: 45px;
            color: rgba(255, 112, 13, 0.99);
            span {
              margin-left: 6px;
              font-size: 20px;
              color: rgba(255, 112, 13, 1);
            }
          }
          .text {
            padding-left: 25px;
            font-size: 15px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            background: url("~@/static/images/icon_money.png") no-repeat 0 0;
            background-size: 15px;
          }
        }
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 88px;
          height: 38px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(14, 103, 255, 1);
          border: 1px solid rgba(14, 103, 255, 1);
          cursor: pointer;
          &:hover{
            background-color: rgba(14, 103, 255, 1);
            color: #fff;
          }
          &.detail {
            width: 140px;
            height: 42px;
          }
        }
      }
    }
  }
  .more-recommendations {
    position: relative;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 42px;
    width: 434px;
    height: 62px;
    font-weight: 600;
    font-size: 24px;
    color: rgba(14, 103, 255, 1);
    background: #fff;
    box-shadow: 0 6px 6px 0 rgba(31, 113, 255, 0.29);
    border: 1px solid rgba(14, 103, 255, 1);
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
