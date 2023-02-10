<template>
  <div>
    <div class="cyzj">
      <div class="menu-list">
        <header>
          <div class="title">行业专家</div>
          <div class="tabs">
          <el-tabs v-model="path" :before-leave="handleBeforeLeave">
            <el-tab-pane
              v-for="item in menuList"
              :key="item.name"
              :label="item.name"
              :name="item.path"
            ></el-tab-pane>
          </el-tabs>
        </div>
          <!-- <ul class="tab">
            <li
              v-for="(item,index) in menuList"
              :class="{'active':tabIndex===index}"
              :key="item.label"
              @click="active(item,index)"
            >{{ item.label }}</li>
          </ul> -->
        </header>
      </div>
      <div>
        <router-view @fathre="updatas"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      menuList: [
        { name: "首页", path: "expert"},
        { name: "专家智库", path: "warehouse"},
        { name: "阀门资料库", path: "zl-list"},
        { name: "产业要闻", path: "zx-list"}
      ],
      tabIndex: 0,
      path:''
    };
  },
  components: {},
  computed: {},
  mounted() {
    // let atPath = this.$route.fullPath;
    // for (let i = 0; i < this.menuList.length; i++) {
    //   if (this.menuList[i].path === atPath) {
    //     this.tabIndex = this.menuList[i].id;
    //   }
    // }
    let arr = this.$route.fullPath.split('/');
    this.path = arr[arr.length -1];
  },
  watch: {
    $route(n, o) {
      console.log(n.path);
      if (n.path == "/cydn/cyzj/expert") this.path = 'expert';
      if (n.path == "/cydn/cyzj/warehouse") this.path = 'warehouse';
      if (n.path == "/cydn/cyzj/zl-list") this.path = 'zl-list';
      if (n.path == "/cydn/cyzj/zx-list") this.path = 'zx-list';
    },
    path: {
      handler(Val, olV) {
        this.routeJump();
      }
    }
  },
  methods: {
    routeJump() {
      // TODO 现在这里不需要跳转了验证权限之后自动跳转
      // this.path !== "policyMatching" && this.$router.push(`/cydn/hqzc/${this.path}`);
      this.$router.push(`/cydn/cyzj/${this.path}`);
    },
    handleBeforeLeave(activeName, oldActiveName) {
      // 验证权限
      // if(activeName === "policyMatching") return authorization.call(this);
      return true
    },
    active(item, index) {
      this.tabIndex = index;
      this.$router.push(item.path);
    },
    updatas(val) {
      this.tabIndex = val;
      this.$router.push(this.menuList[val].path);
    }
  }
};
</script>
<style lang="scss" scoped>
.cyzj {
  box-sizing: border-box;
  margin-bottom: 24px;
  // margin: 0 auto;
  // width: 1200px;
  .menu-list {
    height: 64px;
    background: #ffffff;
    header {
      width: 1200px;
      margin: 0 auto;
      padding-top: 16px;
      box-sizing: border-box;
      display: flex;
    }
    .title {
      font-size: 30px;
      font-family: "Microsoft YaHei";
      font-weight: normal;
      color: #000000;
      line-height: 33px;
      margin-right: 83px;
    }
    .tabs {
        margin-top: 4px;
        ::v-deep .el-tabs__active-bar {
          background-color: #0e67ff;
          height: 3px;
        }
        ::v-deep .el-tabs__item.is-active {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 600;
          color: #0e67ff;
          line-height: 25px;
        }
        ::v-deep .el-tabs__item {
          height: 29px;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          line-height: 25px;
        }
        ::v-deep .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    .tab {
      display: flex;
      // margin: 20px 0;
      align-items: center;
      margin-top: 4px;
      li {
        // width: 100px;
        // text-align: center;
        // color: rgba(0, 0, 0, 0.6);
        // border: 1px solid rgb(243, 248, 255);
        // box-sizing: border-box;
        // padding: 8px 0;
        // cursor: pointer;
        // border-radius: 3px;
        height: 29px;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 25px;
        padding: 0 20px;
        &:first-child{
          padding-left: 0;
        }
        &:last-child{
          padding-right: 0;
        }
      }
      .active {
        // font-family: "Microsoft YaHei";
      }
    }
  }
}
</style>
