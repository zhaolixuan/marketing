<template>
  <div :class="[isShow ? 'tab-wrapper' : 'tab-wrapper1']">
    <!--<div class="head" v-if="isShow">
      <img :src="require('@/static/images/icon_logo.png')" alt="">
      <h1>外贸数据平台</h1>
    </div>-->
    <div class="title-div">
      <div>
        <h1>{{enterpriseName}}</h1>
        <el-button type="primary" @click="focus" v-if="isFocus">关注</el-button>
        <el-button type="primary" @click="cancelFocus" v-else>取消关注</el-button>

      </div>
    </div>
    <div class="container">
      <el-tabs class="tabs" v-model="path" @tab-click="handleClick">
        <el-tab-pane label="采购内容统计" name="procurementStatistics">
          <div slot="label" class="label">
            <!--<div class="icon icon_img"></div>-->
            采购内容统计
          </div>
        </el-tab-pane>
        <el-tab-pane label="采购周期分析" name="procurementAnalysis">
          <div slot="label" class="label">
            <!--<div class="icon icon_img"></div>-->
            交易周期分析
          </div>
        </el-tab-pane>
        <el-tab-pane label="综合分析" name="comprehensiveAnalysis">
          <div slot="label" class="label">
            <!--<div class="icon icon_img"></div>-->
            综合分析
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业联系方式" name="contactInformation">
          <div slot="label" class="label">
            <!--<div class="icon icon_img"></div>-->
            企业联系方式
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import api from '@/api/resources'
export default {
  name: 'detailMenu',
  data () {
    return {
      id: '',
      token: '',
      enterpriseName: '',
      path: 'procurementStatistics',
      isShow: true,
      isFocus: false
    }
  },
  mounted () {
    this.getIsFocus()
  },
  methods: {
    getPath () {
      this.path = this.$route.query.active
      if (this.path) {
        window.localStorage.setItem('activeName', this.path)
      }
      if (window.localStorage.getItem('activeName')) {
        this.path = window.localStorage.getItem('activeName')
      }
    },
    handleClick (tab, event) {
      this.$router.push({ name: tab.name, query: { id: this.id, name: this.enterpriseName } })
    },
    // 关注
    focus () {
      const params = {
        companyId: this.$route.query.id
      }
      api.getFocusEnterprises(params).then(res => {
        console.log(res);
        if (res.data.success) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.isFocus = false
        }
      })
    },
    // 是否关注
    getIsFocus () {
      const params = {
        companyId: this.$route.query.id
      }
      api.getisConcerned(params).then(res => {
        if (res.data.success) {
          this.isFocus = true
        } else {
          this.isFocus = false
        }
      })
    },
    // 取消关注
    cancelFocus () {
      const params = {
        companyId: this.$route.query.id
      }
      api.getCancelAttention(params).then(res => {
        if (res.data.success) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.isFocus = true
        }
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.enterpriseName = this.$route.query.name
    const qs = window.location.search.substr(1)
    this.$router.push({ name: this.path, query: { id: this.id, name: this.enterpriseName } })
    if (qs.indexOf('cydn_token') >= 0) {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-wrapper1 {
  // width: 1260px;
  height: 225px;
  background: #ffffff;
}
.tab-wrapper {
  // width: 1260px;
  // height: 305px;
  // background: linear-gradient(
  //   180deg,
  //   #004bdb 0%,
  //   rgba(61, 136, 239, 0.53) 55%,
  //   rgba(216, 231, 252, 0.73) 81%,
  //   #ffffff 100%
  // );
}
.head {
  height: 75px;
  display: flex;
  align-items: center;
  // margin: auto 30px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 12px;
  }
  h1 {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: 500;
    color: #ffffff;
    line-height: 75px;
    letter-spacing: 1px;
  }
}
.title-div {
  // margin: auto 30px;
  background: #ffffff;
  div {
    height: 64px;
    padding: 0 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: rgba(75, 182, 255, 0.05);
    h1 {
      font-size: 30px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #333333;
      line-height: 64px;
    }
  }
  .el-button {
    height: 32px;
    background: #0E67FF;
    color: #FFFFFF;
    line-height: 0 !important;
    padding: 0px 25px;
    border-radius: 0;
    box-sizing: border-box;
    border: 1px solid #0E67FF;
  }
}
.container {
  margin: auto 40px;
  height: 55px;
  background: #ffffff;
  border-bottom: 1px solid rgba(219,219,219,1);
  .tabs {
    padding: 0 40px;
    height: 55px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    ::v-deep .el-tabs__item {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: rgba(13,13,13,0.68);
      height: 55px;
      line-height: 55px;
      &.is-active,
      &:hover {
        color: #0E67FF;
        // .label {
        //   .icon_img {
        //     background-image: url('~@/static/images/icon_line_active.png');
        //   }
        // }
      }
      .label {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 3px;
          width: 24px;
          height: 24px;
          background-size: cover;
        }
        .icon_img {
          background-image: url('~@/static/images/icon_line.png');
        }
      }
    }
    ::v-deep .el-tabs__nav-wrap::after {
      background:transparent ;
      height: 0px;
    }
     ::v-deep .el-tabs__active-bar {
      background: #0E67FF;
      height: 3px;
      width: 84px;
    //   &::after {
    //     position: absolute;
    //     display: block;
    //     content: '';
    //     top: -8px;
    //     left: 50%;
    //     width: 0;
    //     height: 0;
    //     border-left: 6px solid transparent;
    //     border-right: 6px solid transparent;
    //     border-bottom: 8px solid #004bdb;
    //   }
     }
  }
  .el-menu {
    padding-left: 20px;
  }
  .el-menu--horizontal > .el-menu-item {
    padding: 0 !important;
    margin-right: 50px;
  }
}

</style>
