<template>
  <div class="top">
    <div class="top-wrap">
      <div class="top-left" @click="$router.push('/cydn/application/home')">
        <div class="top-left-logo">APP</div>
        <div class="top-left-text">
          <div class="title">应用商店</div>
          <div>App store</div>
        </div>
      </div>
      <div class="top-right">
        <!-- <div class="top-right-statement">应用商店安全声明</div> -->
        <div class="top-right-search">
          <input type="text" class="input" v-model="searchContent">
          <el-button icon="el-icon-search" class="btn" @click="getSearchList">找应用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  components: {},
  data() {
    return {
      searchContent: ""
    };
  },
  mounted(){
    console.log(this.reload)
  },
  methods: {
    getSearchList() {
        this.$router.push({
          path: "/cydn/application/list",
          query: { searchContent: this.searchContent }
        });
        this.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  background-color: #fff;
  .top-wrap {
    width: 1200px;
    height: 82px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      cursor: pointer;
      display: flex;
      .top-left-logo {
        width: 50px;
        height: 50px;
        background-color: #0e67ff;
        text-align: center;
        line-height: 49px;
        font-weight: 600;
        color: #fff;
        border-radius: 5px;
        font-size: 21px;
        margin-right: 16px;
      }
      .top-left-text {
        color: #0e67ff;
        .title {
          font-size: 33px;
          font-weight: 600;
          margin-bottom: 5px;
        }
      }
    }
    .top-right {
      display: flex;
      align-items: center;
      .top-right-statement {
        font-size: 12px;
        color: #0e67ff;
      }
      .top-right-search {
        position: relative;
        display: flex;
        align-items: center;
        margin-left: 10px;
        .input {
          box-sizing: border-box;
          width: 532px;
          outline: none;
          height: 40px;
          font-size: 16px;
          padding-left: 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .btn {
          position: absolute;
          right: 3px;
          background-color: #0e67ff;
          color: #fff;
          height: 34px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
