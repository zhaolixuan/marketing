<template>
  <div class="wrap">
    <div class="tab-box">
      <div class="tab-wrap">
        <div class="left-wrap" @click="getHome">
          <img src="~@/static/images/top_left.png" alt="" class="img">
        </div>
        <div class="right-wrap">
          <div
            class="tabs-item"
            :class="{ active: currentIndex === index }"
            v-for="(item, index) in menu"
            :key="item.name"
            @click="handleClick(item, index)"
          >{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="data_bg" :height="bannerHeight">
      <img :src="imgUrl" alt="" class="img">
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout1",
  data() {
    return {
      imgUrl:require('@/static/images/data_bg.png'),
      currentIndex: 0,
      menu: [
        {
          name: "全球贸易态势分析",
          path: "tradeSituation"
        },
        {
          name: "企业搜索",
          path: "enterpriseSearch"
        }
      ],
      // banner 图的高度
      bannerHeight: "300px"
    };
  },
  mounted(){
    this.$nextTick(function () {
      this.bannerHeight = document.body.clientWidth / 6.4 + "px";
      window.onresize = () => {
        return (() => {
          this.bannerHeight = document.body.clientWidth / 6.4 + "px";
        })();
      };
    });
  },
  methods: {
    handleClick(item, index) {
      this.currentIndex = index;
      this.$router.push({
        name: item.path
      });
    },
    getHome(){
      this.$router.push('/cydn/resources/tradeSituation')
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.wrap {
  width: 100%;
  min-height: calc(100vh - 60px - 240px);
  background: #ecf3fe;
  padding-bottom: 20px;
  box-shadow: 0px 2px 4px 0px rgba(14, 103, 255, 0.06);
  .tab-box {
    background: #ffffff;
    .tab-wrap {
      width: $w;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 82px;
      //padding: 13px 0 12px;
      box-sizing: border-box;
      background: #ffffff;
      .left-wrap {
        display: flex;
        cursor: pointer;
        .img{
          width: 207px;
          height: 57px;
        }
      }
      .right-wrap {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
        .tabs-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          box-sizing: border-box;
          height: 38px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;
          font-weight: 500;
          color: #0D0D0D;
          cursor: pointer;
          &:last-child{
            margin-left: 50px;
          }
          &.active {
            color: #ffffff;
            background: #0e67ff;
            font-family: PingFangSC-Semibold;
          }
        }
      }
    }
  }
  .data_bg{
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: $w;
    margin: 0 auto;
    // background: #FFFFFF;
    box-shadow: 0px 2px 40px 5px rgba(230,230,230,0.3);
  }
}
</style>
<style lang="scss">
.el-select-dropdown__item.selected {
  color: #0e67ff !important;
}
</style>
