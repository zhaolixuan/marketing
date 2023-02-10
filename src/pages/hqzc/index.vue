<template>
  <div class="preferential-enterprise-policy">
    <header>
      <div class="header-content">
        <div class="title">惠企政策</div>
        <div class="tabs">
          <el-tabs
            v-model="path"
            :before-leave="handleBeforeLeave"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="item in menu"
              :key="item.name"
              :label="item.name"
              :name="item.path"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/userCenter";
import { notLoggedIn, notCertified } from "@/common/authorization";
import { to } from "@/common/util";
export default {
  data() {
    return {
      path: "",
      isAuth: false,
      isLogin: false,
      menu: [
        {
          name: "首页",
          path: "/cydn/hqzc/home"
        },
        {
          name: "政策查询",
          path: "/cydn/hqzc/policyQuery"
        },
        {
          name: "政策匹配",
          path: "/cydn/hqzc/policyMatching"
        }
      ]
    };
  },
  async created() {
    this.path = this.$route.path;
    this.isLogin = !!localStorage.getItem("token");
    if (this.isLogin) {
      const [err, res] = await to(getUserInfo());
      const status = {
        unauth: false,
        approvaling: false,
        reject: false,
        success: true
      };
      err
        ? console.log(err)
        : (this.isAuth = status[res.data.retData.supplierApprovalStatus]);
    } else {
      this.isAuth = false;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.path === "/cydn/hqzc/policyMatching") {
      if (this.isLogin) {
        if (this.isAuth) {
          this.path = to.path;
          next();
        } else {
          notCertified.call(this);
        }
      } else {
        notLoggedIn.call(this);
      }
    } else {
      this.path = to.path;
      next();
    }
  },
  methods: {
    handleBeforeLeave(activeName, oldActiveName) {
      // 验证权限
      if (activeName === "/cydn/hqzc/policyMatching") {
        if (this.isLogin) {
          if (this.isAuth) {
            return true;
          } else {
            notCertified.call(this);
            return false;
          }
        } else {
          notLoggedIn.call(this);
          return false;
        }
      } else {
        return true;
      }
    },
    handleClick() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.preferential-enterprise-policy {
  min-height: calc(100vh - 60px - 240px - 15.6px);
  header {
    height: 64px;
    background: #ffffff;
    .header-content {
      display: flex;
      width: $w;
      margin: 0 auto;
      padding-top: 16px;
      box-sizing: border-box;
      .title {
        font-size: 30px;
        font-weight: 600;
        color: #000000;
        line-height: 33px;
        margin-right: 83px;
      }
      .tabs {
        margin-top: 4px;
        width: 300px;
        ::v-deep .el-tabs__active-bar {
          background-color: #0e67ff;
          height: 3px;
        }
        ::v-deep .el-tabs__item.is-active {
          font-size: 18px;
          font-weight: 600;
          color: #0e67ff;
          line-height: 25px;
        }
        ::v-deep .el-tabs__item {
          height: 29px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          line-height: 25px;
        }
        ::v-deep .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }
  }
  main {
  }
}
</style>
