<template>
  <div class="accordion">
    <div
      v-for="(item, index) in listData"
      :key="index"
      @mouseover="mouseoverMethod(index)"
    >
      <div
        :class="{ list_item: true, over_status: isOver && itemIndex == index }"
      >
        <div class="item_img_box">
          <div class="mask"></div>
          <el-image
            :src="imgurl + item.expertsPhotos"
            fit="cover"
            class="item_img"
          ></el-image>
          <div class="item_img_content">
            <h4>{{ item.expertsName }}</h4>
            <p>{{ item.goodAtFieldArr }}</p>
          </div>
        </div>
        <div class="content_box">
          <h3 class="person_name">{{ item.expertsName }}</h3>
          <div class="person_domain">
            {{ item.goodAtFieldArr }}
          </div>
          <ul class="text_box">
            <li class="text_item">
              <span class="item_title">院校</span>
              <span class="item_con">{{ item.graduateSchool }}</span>
            </li>
            <li class="text_item">
              <span class="item_title">职称</span>
              <span class="item_con">{{ item.theTitle }}</span>
            </li>
            <li class="text_item">
              <span class="item_title">职务</span>
              <span class="item_con">{{ item.position }}</span>
            </li>
          </ul>
          <el-button class="content_btn" @click="toExpertsDetail(item)"
            >点击查看</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accordion",
  props: {
    listData: {
      type: Array,
      require: true,
      default: [],
    },
  },
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      isOver: true,
      itemIndex: 0,
    };
  },
  watch: {},
  methods: {
    toExpertsDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/particulars",
        query: { id: item.id },
      });
    },
    mouseoverMethod(index) {
      this.isOver = true;
      this.itemIndex = index;
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .list_item {
    width: 180px;
    height: 100%;
    cursor: pointer;
    display: flex;
    .item_img_box {
      width: 180px;
      height: 400px;
      position: relative;
      .mask {
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9;
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .item_img {
        width: 100%;
        height: 100%;
      }
      .item_img_content {
        width: 100%;
        height: 120px;
        padding: 20px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        color: #fff;
        h4 {
          font-weight: 600;
          font-family: "Microsoft YaHei";
          font-size: 20px;
          padding-bottom: 10px;
        }
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          // 下面这句用来控制行数
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .content_box {
      display: none;
      width: 280px;
      height: 400px;
      background-color: #fff;
      padding: 30px 25px;
      box-sizing: border-box;
      position: relative;
      .person_name {
        font-size: 20px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0d0d0d;
        padding-bottom: 10px;
      }
      .person_domain {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #595959;
        padding-bottom: 35px;
        line-height: 20px;
      }
      .text_box {
        .text_item {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: flex-start;
          padding-bottom: 10px;
          span {
            display: inline-block;
          }
          .item_title {
            width: 30px;
            padding-right: 10px;
            line-height: 20px;
          }
          .item_con {
            width: calc(100% - 40px);
            line-height: 20px;
          }
        }
      }
      .content_btn.el-button {
        position: absolute;
        bottom: 40px;
        left: 40px;
        color: #007fef;
        border-color: #007fef;
        width: 120px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600;
        padding: 0;
        border-radius: 0 !important;
      }
      .el-button:focus,
      .el-button:hover {
        background-color: #007fef;
        color: #fff;
      }
    }
  }
  .over_status {
    width: 480px;
    position: relative;
    .item_img_box {
      // transform: skewX(-4deg);
      width: 200px;
      .item_img_content,
      .mask {
        display: none;
      }
    }
    .content_box {
      display: block;
      position: absolute;
      left: 200px;
    }
  }
}
.accordion * {
  transition: all linear 0.2s;
}
</style>
