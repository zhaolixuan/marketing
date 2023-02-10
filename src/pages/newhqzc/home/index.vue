<template>
  <div class="policy">
    <v-head></v-head>
    <div class="policy-wrap">
      <div class="policy-content content">
        <!-- 政策数据 -->
        <policy-data></policy-data>
        <!-- 政策表格 -->
        <policy-table class="policy-table"></policy-table>
      </div>
    </div>
    <!-- 成功案例 -->
    <successful-cases ref="successful-cases">
      <!-- 热门政策 未登录和未认证时显示 -->
      <popular-policy v-if="!isLogin || !isAuth || isNull"></popular-policy>
      <!-- 政策推荐-模糊匹配 登录且认证时未补全信息时显示 -->
      <policy-recommendation
        v-if="isLogin && isAuth && !isCompleteInformation"
        v-show="!isNull"
      ></policy-recommendation>
      <!-- 政策推荐-精准匹配 登录且认证且补全信息时显示 -->
      <accurate-policy-recommendation
        v-if="isLogin && isAuth && isCompleteInformation"
        @toggle="handleToggle"
      ></accurate-policy-recommendation>
    </successful-cases>
    <!-- 申报流程 -->
    <declaration-process></declaration-process>
  </div>
</template>

<script>
import auth from "../mixin/auth";
import { getCorporateInfo } from "@/api/hqzc.js";

import vHead from "../components/header.vue";
import policyData from "./components/policyData.vue";
import policyTable from "./components/policyTable.vue";
import popularPolicy from "./components/popularPolicy.vue";
import policyRecommendation from "./components/policyRecommendation.vue";
import accuratePolicyRecommendation from "./components/accuratePolicyRecommendation.vue";
import successfulCases from "./components/successfulCases.vue";
import declarationProcess from "../components/declarationProcess.vue";

export default {
  mixins: [auth],
  components: {
    vHead,
    policyData,
    policyTable,
    popularPolicy,
    policyRecommendation,
    accuratePolicyRecommendation,
    successfulCases,
    declarationProcess,
  },
  data() {
    return {
      // 用户是否补全信息
      isCompleteInformation: false,
    };
  },
  created() {
    this.getCorporateInfo();
  },
  methods: {
    async getCorporateInfo() {
      const res = await getCorporateInfo();
      this.isCompleteInformation = res.data.success;
    },
    handleToggle(value) {
      this.$refs["successful-cases"].isActive = value;
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 1200px;
$color: rgba(14, 103, 255, 1);
.content {
  width: $w;
  margin: 0 auto;
}
.policy {
  .policy-wrap {
    width: 100%;
    min-height: 832px;
    background-color: #f6f8fe;
    .policy-content {
      display: flex;
      flex-wrap: wrap;
      padding-top: 60px;
      box-sizing: border-box;
      .policy-table {
        margin-left: 16px;
      }
      .policy-recommendation {
        margin-top: 60px;
      }
    }
  }
}
</style>
