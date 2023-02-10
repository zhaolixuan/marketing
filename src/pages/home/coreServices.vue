<template>
  <div class="core_services">
    <el-carousel
      arrow="never"
      :height="this.appList[0].length > 4 ? '700px' : '350px'"
      :autoplay="false"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item, index) in appList" :key="index">
        <ul class="app_list">
          <li v-for="(app, index2) in item" :key="index2" class="list_item">
            <img :src="app.imgUrl" class="item_img" />
            <h6 class="item_tit">{{ app.title }}</h6>
            <p class="item_desc">{{ app.desc }}</p>
            <el-button class="item_use" @click="goPage(app.link)"
              >立即使用</el-button
            >
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "coreServices",
  data() {
    return {
      appList: [
        [
          {
            imgUrl: require("../../static/images/hyzj.png"),
            title: "行业专家",
            desc: "为企业招商引资、生产制造、产品改良、贸易出口等经营过程中相关问题匹配专家学者，帮助企业排忧解难，提高产值。开拓地方产业新局面，增速地方政府产业经济数智化发展振兴腾飞。",
            link: "/cydn/cyzj/expert",
          },
          {
            imgUrl: require("../../static/images/hqzc.png"),
            title: "惠企政策",
            desc: "聚焦企业对政策“不知晓、找不到”等问题，应用聚集了全省所有涉及行业的惠企政策，提供政策匹配与政策下载功能，方便企业及时了解惠企政策，最大限度保障企业对各项惠企政策“应知尽知、应享尽享”。",
            link: "/cydn/hqzc/home",
          },
          {
            imgUrl: require("../../static/images/cytp.png"),
            title: "资讯中心",
            desc: "简单的信息发布和传递方式,让平台汇聚更多的产业资讯,从而形成“资讯中心”,让用户在本平台就能及时获取大量产业动态。",
            link: "/cydn/information",
          },
          {
            imgUrl: require("../../static/images/cydt.png"),
            title: "活动中心",
            desc: "利用专业化的运营工作团队，运用市场化的方式，深入挖掘线上线下资源互动能力，深度贴合企业需求，打造与时俱进的体验型服务，建立真正的活动平台。",
            link: "/cydn/activity",
          },
        ],
      ],
    };
  },
  methods: {
    goPage(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.core_services {
  width: 1200px;
  margin: 0 auto;
  min-height: 350px;
  max-height: 700px;
  ::v-deep .el-carousel__item {
    display: flex;
    justify-content: center;
  }
  .app_list {
    width: 1200px;
    min-height: 350px;
    max-height: 700px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
      width: 285px;
      height: 320px;
      margin-right: 20px;
      padding: 20px 30px;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s linear;
      .item_img {
        width: 90px;
        height: 90px;
        box-shadow: 0px 4px 16px 8px rgb(30 33 35 / 8%);
        border-radius: 16px;
      }
      .item_tit {
        font-size: 20px;
        color: #0d0d0d;
        margin: 20px 0 10px;
      }
      .item_desc {
        font-size: 14px;
        color: #595959;
        line-height: 23px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .item_use {
        font-size: 16px;
        width: 120px;
        height: 40px;
        line-height: 38px;
        font-weight: 600;
        box-sizing: border-box;
        color: #007fef;
        border: 1px solid #007fef;
        padding: 0;
        border-radius: 0 !important;
        margin-top: 30px;
      }
      .el-button:focus,
      .el-button:hover {
        background-color: #007fef;
        color: #fff;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 0px 4px 16px 8px rgba(30, 33, 35, 0.08);
        // box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
        -webkit-transform: translate3d(-5px, -5px, 0);
        transform: translate3d(-5px, -5px, 0);
      }
    }
  }
}
</style>
