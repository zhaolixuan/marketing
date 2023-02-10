<template>
  <div class="accordion">
    <div class="left">
      <div class="l_img_box">
        <div class="l_img_inner">
          <el-image :src="imgurl + showItem.expertsPhotos" fit="cover" class="l_img"></el-image>
        </div>
      </div>
      <div class="l_con_box">
        <h3 class="person_name">{{showItem.expertsName}}</h3>
        <div class="person_domain">
          {{showItem.goodAtFieldArr}}
        </div>
        <ul class="text_box">
          <li class="text_item">
            <span class="item_title">院校</span>
            <span class="item_con">{{showItem.graduateSchool}}</span>
          </li>
          <li class="text_item">
            <span class="item_title">职称</span>
            <span class="item_con">{{ showItem.theTitle }}</span>
          </li>
          <li class="text_item">
            <span class="item_title">职务</span>
            <span class="item_con">{{ showItem.position }}</span>
          </li>
        </ul>
        <el-button class="content_btn" @click="toExpertsDetail(showItem)">点击查看</el-button>
      </div>
    </div>
    <div class="right">
      <div class="right_item" v-for="(item, index) in otherItems" :key='index' @mouseover="mouseoverMethod(item)">
        <div class="mask"></div>
        <el-image :src="imgurl + item.expertsPhotos" fit="cover" class="r_item_img"></el-image>
        <div class="r_item_con">
          <h3>{{item.expertsName}}</h3>
          <p>{{item.goodAtFieldArr}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {deepClone} from '@/common/util'
  export default {
    name: 'accordion',
    props: {
      listData: {
        type: Array,
        require: true,
        default: []
      }
    },
    data() {
      return {
        imgurl: process.env.VUE_APP_IMG_URL,
        isOver: true,
        itemIndex: 0,
        showItem: {},
        otherItems: []
      }
    },
    created() {
      this.showItem = this.listData[0]
      this.resetList(this.showItem)
    },
    
    methods: {
      toExpertsDetail(item) {
        this.$router.push({
          path: "/cydn/cyzj/particulars",
          query: { id: item.id }
        });
      },
      mouseoverMethod(item) {
        this.resetList(item)
      },
      resetList(item) {
        this.showItem = item
        let result = deepClone(this.listData)
        for (let i = 0; i < result.length; i++) {
          if(result[i].id === item.id) {
            result.splice(i, 1)
          }
        }
        this.otherItems = result
      }
    }
  }
</script>

<style lang="scss" scoped>
img {
  vertical-align: middle!important;
}
.accordion {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  .left, .right {
    width: 720px;
    height: 100%;
  }
  .left {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    .l_img_box {
      width: 320px;
      height: 100%;
      
      position: absolute;
      top: -10px;
      left: 18px;
      z-index: 9;
      .l_img_inner {
        width: 300px;
        transform: skewX(-5deg);
        // overflow: hidden;
        .l_img {
          // transform: skewX(5deg);
          width: 300px;
          height: 400px;
        }
      }
      
    }
    .l_con_box {
      width: 400px;
      height: 100%;
      padding: 60px 40px;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      bottom: 0;
      .person_name {
        font-size: 24px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: #0D0D0D;
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
          color: rgba(0,0,0,0.3);
          display: flex;
          align-items: flex-start;
          padding-bottom: 10px;
          span {
            display: inline-block;
          }
          .item_title {
            width: 28px;
            padding-right: 10px;
            line-height: 20px;
          }
          .item_con {
            width: calc(100% - 38px);
            line-height: 20px;
          }
        }
      }
      .content_btn {
        position: absolute;
        bottom: 40px;
        left: 40px;
        color: #007FEF;
        border-color: #007FEF;
        width: 120px;
        height: 40px;
        font-size: 16px;
        border-radius: 0!important;
      }
      .el-button:focus, .el-button:hover {
        background-color: #007FEF;
        color: #fff;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    background-color: #fff;
    .right_item {
      width: 180px;
      height: 400px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      .mask {
        background-color: rgba(0,0,0,0.3);
        width: 100%;
        height: 100%;
        z-index: 9;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .r_item_img {
        width: 100%;
        height: 100%;
      }
      .r_item_con {
        width: 100%;
        height: 120px;
        padding: 20px;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        color: #fff;
        h3 {
          font-weight: 500;
          font-family: "Microsoft YaHei";
          font-size: 24px;
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
  }
}
</style>
