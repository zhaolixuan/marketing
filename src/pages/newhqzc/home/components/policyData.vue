<template>
  <div class="policy-data">
    <div class="title">政策数据</div>
    <div class="policy-data-content">
      <div class="item" v-for="i in policyData" :key="i.index">
        <div class="icon"></div>
        <div class="name">{{ i.name }}</div>
        <div class="value-wrap">
          <div class="value">{{ i.value }}</div>
          <div class="unit">{{ i.unit }}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="btn" @click="policyIntelligenceMatching">政策智能匹配</div>
    </div>
  </div>
</template>

<script>
import auth from "../../mixin/auth";
import { indexGet } from "@/api/hqzc.js";
import { notLoggedIn, notCertified } from "@/common/authorization.js";
export default {
  mixins: [auth],
  data() {
    return {
      // 政策数据
      policyData: [
        {
          name: "查询次数",
          value: 0,
          unit: "次",
        },
        {
          name: "匹配次数",
          value: 0,
          unit: "次",
        },
        {
          name: "惠及企业",
          value: 0,
          unit: "家",
        },
        {
          name: "政策申请",
          value: 0,
          unit: "次",
        },
      ],
    };
  },
  created() {
    this.getPolicyData();
  },
  methods: {
    // 获取政策数据
    async getPolicyData() {
      const res = await indexGet();
      const { retData } = res.data;
      this.policyData[0].value = retData[1];
      this.policyData[1].value = retData[2];
      this.policyData[2].value = retData[4];
      this.policyData[3].value = retData[3];
    },
    // 政策智能匹配
    policyIntelligenceMatching() {
      const loginIn = () => {
        const certified = async () => {
          let path = this.isNull ? "/cydn/searchList" : "/cydn/companyInfo";
          this.toPath(path);
        };
        this.isAuth ? certified() : notCertified.call(this);
      };
      this.isLogin ? loginIn() : notLoggedIn.call(this);
    },
    toPath(path) {
      const { href } = this.$router.resolve({
        path,
        query: {
          companyName: this.companyName,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.policy-data {
  .title {
    margin-bottom: 24px;
    font-size: 36px;
    font-weight: 600;
    color: rgba(29, 29, 31, 1);
  }
  .policy-data-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 474px;
    height: 415px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 40px 5px rgba(230, 230, 230, 0.3);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      padding-top: 23px;
      box-sizing: border-box;
      .icon {
        width: 55px;
        height: 55px;
      }
      &:nth-child(1) {
        .icon {
          background: url("~@/static/images/icon_query_times.png");
          background-size: cover;
        }
      }
      &:nth-child(2) {
        .icon {
          background: url("~@/static/images/icon_matching_times.png");
          background-size: cover;
        }
      }
      &:nth-child(3) {
        .icon {
          background: url("~@/static/images/icon_benefit_enterprises.png");
          background-size: cover;
        }
      }
      &:nth-child(4) {
        .icon {
          background: url("~@/static/images/icon_policy_application.png");
          background-size: cover;
        }
      }
      .name {
        margin-top: 12px;
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: normal;
        color: rgba(29, 29, 31, 1);
      }
      .value-wrap {
        display: flex;
        align-items: center;
        .value {
          margin-right: 8px;
          font-size: 32px;
          font-weight: 600;
          background-image: -webkit-linear-gradient(
            left,
            rgba(255,171,30,1),
            rgba(255,112,13,1)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .unit {
          font-size: 22px;
          font-weight: 600;
          color: rgba(188, 188, 188, 1);
        }
      }
    }
    .line {
      width: 374px;
      height: 1px;
      background-color: rgba(238, 238, 238, 1);
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 377px;
      height: 42px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      background: rgba(14, 103, 255, 1);
      cursor: pointer;
      &:hover{
        background-color: rgba(14, 103, 255, 0.8);
      }
    }
  }
}
</style>
