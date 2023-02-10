<template>
  <div class="application">
    <div class="anv-banner-wrap">
      <div class="box">
        <div class="nav-wrap">
          <div class="all-class">所有商品分类</div>
          <ul class="nav-ul">
            <li v-for="item in navList.slice(0,5)" :key="item.id" class="nav-list">
              <div class="one-nav" @click.stop="getOneTitle(item)">{{item.oneTitle}}</div>
              <div class="two-nav">
                <span
                  v-for="(childItem,childIndex) in item.twoList.slice(0,3)"
                  :key="childIndex"
                  @click.stop="getTwoTitle(item,childItem)"
                >{{ childItem.categoryName }}</span>
              </div>
              <div class="thr-nav">
                <ul class="thr-nav-list">
                  <li
                    @click.stop="getTwoTitle(item,secondItem)"
                    v-for="(secondItem,index) in item.twoList"
                    :key="index"
                  >{{secondItem.categoryName}}</li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="last-nav" @click="toMore">
            <span>
              查看更多应用
              <!-- <i class="el-icon-right"></i> -->
            </span>
            <img src="../../static/images/leftBLine.png" alt>
          </div>
        </div>
        <div class="banner-wrap">
          <el-carousel height="400px" indicator-position="none" @change="carouselChange">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
              <img style="width:100%;height:100%" :src=" imgurl + item.pics" alt>
            </el-carousel-item>
          </el-carousel>
          <!-- <div class="mask" :style="{right:open?'0':'-275px'}">
            <div
              class="box"
              @click="isOpen"
            >
            <img src="../../static/images/btnshousuo.png" alt="">
            </div>
            <h5>{{ bannerRightActive.title }}</h5>
            <p class="content">{{ bannerRightActive.content }}</p>
            <div class="more">
              <span>{{ bannerRightActive.time }}</span>
              <p>
                查看详情
                <i class="el-icon-sort-up"></i>
              </p>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="floor-wrap">
      <div class="hot" v-for="(floor,index) in floorText" :key="index">
        <div class="title-wrap">
          <div class="title">{{ floor.title }}</div>
          <div>{{floor.english}}</div>
        </div>
        <div class="good-list" v-if="index == 0 && hotList.length >0">
          <ul>
            <li
              v-for="(hotItem,hotIndex) in hotList"
              :key="hotIndex"
              :class="{'two':index==1,'four':index==0||index==2}"
            >
              <goodItem :flag="index" :detailObj="hotItem"></goodItem>
            </li>
          </ul>
        </div>
        <div class="good-list" v-if="index == 1">
          <ul>
            <li
              v-for="(hotItem,hotIndex) in selectList"
              :key="hotIndex"
              :class="{'two':index==1,'four':index==0||index==2}"
            >
              <goodItem :flag="index" :detailObj="hotItem"></goodItem>
            </li>
          </ul>
        </div>
        <div class="good-list" v-if="index == 2">
          <ul>
            <li
              v-for="(hotItem,hotIndex) in RecommendList.slice(0,4)"
              :key="hotIndex"
              :class="{'two':index==1,'four':index==0||index==2}"
            >
              <goodItem :flag="index" :detailObj="hotItem"></goodItem>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goodItem from "./components/goodsItem.vue";
import { getBanner } from "@/api/baseApi";
import { getStoreList, getTree } from "@/api/application";
export default {
  components: { goodItem },
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      navList: [],
      floorText: [
        {
          title: "热门应用",
          english: "Popular"
        },
        {
          title: "精选应用",
          english: "selected"
        },
        {
          title: "推荐应用",
          english: "recommend"
        }
      ],
      imgList: [],
      // bannerRightActive: {}, // banner 右侧显示的文案
      open: true,
      childList: [],
      hotList: [],
      selectList: [],
      RecommendList: []
    };
  },
  mounted() {
    // this.bannerRightActive = this.imgList[0];
    this.getBanner();
    this.getHotList();
    this.getSelectedList();
    this.getRecommendList();
    this.getTree();
  },
  methods: {
    getTree() {
      getTree().then(res => {
        this.navList = res.data;
      });
    },
    getBanner() {
      getBanner({ search_EQ_type: "application" }).then(res => {
        this.imgList = res.data.rows;
      });
    },
    getOneTitle(item) {
        this.$router.push({
          path: "/cydn/application/list",
          query: { oneId: item.oneId }
        });
    },
    getTwoTitle(parents, child) {
        this.$router.push({
          path: "/cydn/application/list",
          query: { oneId: parents.oneId, twoId: child.id }
        });
      
    },
    //热门应用
    getHotList() {
      let params = {
        search_EQ_status: 0,
        search_EQ_isPlacedTop: 0,
        search_EQ_isDel: 0,
        order: "desc",
        sort: "shelvesTime,isPlacedTop",
        rows: 8,
        page: 1
      };
      getStoreList(params).then(res => {
        this.hotList = res.data.rows;
      });
    },
    //精选应用
    getSelectedList() {
      let params = {
        search_EQ_status: 0,
        search_EQ_isPlacedTop: 0,
        search_EQ_isDel: 0,
        order: "desc",
        sort: "shelvesTime,isPlacedTop",
        rows: 8,
        page: 2
      };
      getStoreList(params).then(res => {
        this.selectList = res.data.rows;
      });
    },
    //推荐应用
    getRecommendList() {
      let params = {
        search_EQ_status: 0,
        search_EQ_isPlacedTop: 0,
        search_EQ_isDel: 0,
        order: "desc",
        sort: "shelvesTime,isPlacedTop",
        rows: 8,
        page: 3
      };
      getStoreList(params).then(res => {
        this.RecommendList = res.data.rows;
      });
    },
    secondMenuShow(item) {
      this.childList = item.children;
    },
    // secondMenuHide(){
    //   this.$refs.secondMenu.style.display = "none";
    // },
    toMore() {
        this.$router.push({
          path: "/cydn/application/list"
        });
      
    },
    carouselChange(index) {
      // this.bannerRightActive = this.imgList[index];
    },
    isOpen() {
      this.open = !this.open;
    }
  }
};
</script>
<style lang="scss" scoped>
.application {
  .anv-banner-wrap {
    display: flex;
    //  width: 100vw;
    height: 400px;
    background: url("../../static/images/application_banner.png") no-repeat;
    background-size: 100% 100%;
    .box {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      height: 100%;
      .nav-wrap {
        width: 243px;
        height: 100%;
        background-color: #fff;
        position: relative;
        .all-class {
          height: 34px;
          background-color: #0e67ff;
          text-align: center;
          line-height: 33px;
          color: #fff;
          font-size: 14px;
        }
        .nav-ul {
          box-sizing: border-box;
          height: 335px;
          .nav-list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            // min-height: 327px;
            padding: 10px 15px 0;
            cursor: pointer;
            &:hover .thr-nav {
              display: block;
            }
            .one-nav {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.8);
              font-family: PingFangSC;
              font-weight: 600;
            }
            .two-nav {
              line-height: 15px;
              font-size: 12px;
              color: rgba(9, 9, 9, 0.6);
              margin: 10px 0;
              span {
                // display: inline-block;
                // width: 62px;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                margin-right: 10px;
                cursor: pointer;
                &:hover {
                  font-family: PingFangSC;
                  font-weight: 500;
                  color: rgba(14, 103, 255, 1);
                }
              }
              span:last-child{
                margin: 0;
              }
            }
            .thr-nav {
              z-index: 99;
              position: absolute;
              top: 0;
              right: -427px;
              width: 427px;
              height: 401px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 6px 0 10px 0 rgba(19, 82, 255, 0.21);
              display: none;
              padding: 28px 16px 0;
              box-sizing: border-box;
              .thr-nav-list {
                display: flex;
                flex-wrap: wrap;
                li {
                  font-size: 14px;
                  font-family: PingFangSC;
                  font-weight: normal;
                  color: rgba(9, 9, 9, 0.6);
                  margin-right: 13px;
                  margin-bottom: 16px;
                  &:hover {
                    color: rgba(14, 103, 255, 1);
                  }
                }
              }
            }
          }
          // .last-nav {
          //   box-sizing: border-box;
          //   cursor: pointer;
          //   margin:0 15px;
          //   height: 30px;
          //   line-height: 29px;
          //   border-top: 1px dashed rgba(0, 0, 0, 0.1);
          //   font-size: 12px;
          //   color: rgba(14, 103, 255, 1);
          //   display: flex;
          //   align-items: center;
          //   img {
          //     width: 9px;
          //     height: 4px;
          //     margin-left: 5px;
          //   }
          // }
        }
        .last-nav {
          box-sizing: border-box;
          cursor: pointer;
          margin: 0 15px;
          height: 30px;
          line-height: 29px;
          border-top: 1px dashed rgba(0, 0, 0, 0.1);
          font-size: 12px;
          color: rgba(14, 103, 255, 1);
          display: flex;
          align-items: center;
          img {
            width: 9px;
            height: 4px;
            margin-left: 5px;
          }
        }
      }
      .banner-wrap {
        position: relative;
        width: 958px;
        height: 100%;
        overflow: hidden;
        .el-carousel__item {
          //  position: relative;
        }
        .mask {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 5;
          width: 276px;
          height: 400px;
          background: rgba(0, 0, 0, 0.45);
          position: absolute;
          top: 0;
          right: 0;
          padding: 32px 18px 24px 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: right 0.3s;
          h5 {
            width: 246px;
            font-size: 20px;
            line-height: 30px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
          .content {
            flex: 1;
            line-height: 25px;
            margin-top: 25px;
            height: 176px;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
          .box {
            overflow: hidden;
            width: 10px;
            height: 131px;
            position: absolute;
            left: -10px;
            top: 50%;
            margin-top: -65px;
            line-height: 131px;
            transition: all 0.5s;
            img {
              cursor: pointer;
            }
          }
          .more {
            display: flex;
            justify-content: space-between;
            color: #fff;
            & > p {
              width: 85px;
              height: 32px;
              .el-icon-sort-up {
                transform: rotate(90deg);
              }
            }
          }
        }
      }
    }
  }
  .floor-wrap {
    width: 1200px;
    margin: 25px auto;
    .hot {
      .good-list {
        margin-top: 15px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            display: inline-block;
          }
          .four {
            margin: 13px 16px 13px 0;
            cursor: pointer;
          }
          .four:nth-child(4n) {
            margin-right: 0;
          }
          .two {
            margin: 16px 16px 16px 0;
            cursor: pointer;
          }
          .two:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
    .title-wrap {
      .title {
        font-size: 34px;
        color: rgba(29, 29, 31, 1);
        font-weight: 600;
        font-family: PingFangSC;
        margin-bottom: 8px;
        margin-top: 15px;
      }
    }
  }
}
</style>
