<template>
  <div class="popular-policy">
    <div class="title">热门政策</div>
    <div class="see-more" @click="handleMorePolicy">查看更多<i class="el-icon-arrow-right"></i></div>
    <div class="popular-policy-content">
      <div
        class="popular-policy-item"
        v-for="(item, index) in popularPolicy"
        :key="index"
        @click="handlePolicyDetail(item.id)"
      >
        <div class="popular-policy-title">
          {{ item.title | defaultValue }}
        </div>
        <div class="popular-policy-text">
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
        <div class="views-wrap">
          <div class="icon-eyes"></div>
          <div class="views">{{ item.heat }}</div>
          <div class="icon-like"></div>
          <div class="collection">{{ item.collectNumber }}</div>
        </div>
        <!-- 可申报政策显示这个 -->
        <div
          class="popular-policy-bottom"
          v-if="item.policyCategory === 'declare'"
        >
          <div class="money-wrap">
            <div class="money"><span>万元</span></div>
            <div class="text">预计可申报资源</div>
          </div>
          <div class="btn" @click.stop="unlockDeclaredLimit">
            立即解锁申报额度
          </div>
        </div>
        <!-- 不可申报政策显示这个 -->
        <div
          class="popular-policy-bottom detail"
          v-if="item.policyCategory === 'ordinary'"
        >
          <div class="btn" @click.stop="handlePolicyDetail(item.id)">
            查看详情
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authorization } from "@/common/authorization.js";
import { getPopularPolicy } from "@/api/hqzc.js";
export default {
  data() {
    return {
      // 热门政策
      popularPolicy: [],
    };
  },
  created() {
    this.getPopularPolicy();
  },
  methods: {
    // 获取热门政策
    async getPopularPolicy() {
      const res = await getPopularPolicy();
      this.popularPolicy = (res.data.retData || []).slice(0, 6);
    },
    // 查看更多
    handleMorePolicy() {
      const { href } = this.$router.resolve("/cydn/hqzc/policyList");
      window.open(href, "_blank");
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
    // 立即解锁申报额度
    unlockDeclaredLimit() {
      authorization.call(this);
    },
  },
};
</script>

<style lang="scss" scoped>
.popular-policy {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  transform: translateY(-220px);
  .see-more {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 18px;
    color: rgba(29, 29, 31, .8);
    letter-spacing: 0;
    font-weight: normal;
    cursor: pointer;
    z-index: 1;
    &:hover{
      color: #0E67FF;
    }
    .el-icon-arrow-right{
      display: inline-block;
      margin-left: 5px;
    }
  }
  .title {
    font-size: 36px;
    font-weight: 600;
    color: rgba(29, 29, 31, 1);
    margin-bottom: 24px;
  }
  .popular-policy-content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 60px;
    .popular-policy-item {
      padding: 42px 36px 40px 23px;
      width: 389px;
      height: 360px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 40px 5px rgba(140, 140, 140, 0.3);
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
        margin-bottom: 16px;
      }
      &:nth-child(2),
      &:nth-child(5) {
        margin-left: 16px;
        margin-right: 16px;
      }
      .popular-policy-title {
        font-size: 22px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .popular-policy-text {
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
      .views-wrap {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 44px;
        margin-top: 10px;
        .icon-eyes {
          width: 14px;
          height: 9px;
          background: url("~@/static/images/icon_eyes.png");
          background-size: cover;
          margin-right: 6px;
        }
        .icon-like {
          width: 10px;
          height: 9px;
          background: url("~@/static/images/icon_like.png");
          background-size: cover;
          margin-right: 6px;
        }
        .views {
          margin-right: 34px;
        }
      }
      .popular-policy-bottom {
        display: flex;
        justify-content: space-between;
        &.detail {
          justify-content: flex-end;
        }
        .money-wrap {
          margin-top: -15px;
          .money {
            position: relative;
            width: 100px;
            padding-left: 89px;
            line-height: 1.5;
            font-size: 20px;
            font-weight: 600;
            color: rgba(255, 112, 13, 1);
            &::before {
              content: "";
              position: absolute;
              top: 5px;
              left: 0;
              width: 80px;
              height: 20px;
              filter: blur(15px);
              background: #ff700d;
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
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 140px;
          height: 42px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: rgba(14, 103, 255, 1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
