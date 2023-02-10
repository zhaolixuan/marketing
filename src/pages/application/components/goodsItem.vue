<template>
  <div @click="toDetail">
    <div class="goods" v-if="flag==0||flag==2">
      <div>
        <div class="top">
          <div class="name-lines">
            <div class="name-logo">
              <img :src="imgurl + detailObj.appCoverPictureUrl" alt>
            </div>
            <div class="name">
              <div class="name-text">{{detailObj.appName}}</div>
              <div class="score">
                <el-rate disabled v-model="value1" allow-half :max="5"></el-rate>
              </div>
            </div>
            <div class="name-flag" v-if="detailObj.operatingSystemName == 'PC-Web'">无需下载</div>
          </div>
          <div class="use-number">
            <div>
              已有&nbsp;
              <span class="num">{{detailObj.userNum ? detailObj.userNum : 0}}</span>&nbsp;家企业使用
            </div>
            <div v-if="detailObj.shelvesTime">
              上架时间:
              <span>{{detailObj.shelvesTime | hendelDate}}</span>
            </div>
          </div>
          <div class="describe">{{detailObj.basicInformation}}</div>
          <del
            class="del"
            v-if="detailObj.isFree == '1'&&detailObj.marketPrice"
          >市场价：￥{{detailObj.marketPrice ? detailObj.marketPrice : '--'}}元</del>
          <div class="price" v-if="detailObj.isFree == '1'&&detailObj.presentPrice">
            现价：￥
            <span>{{detailObj.presentPrice ? detailObj.presentPrice : '--'}}</span>元
          </div>
          <div style="margin-top:50px;font-size:18px;" class="price" v-else>免费</div>
        </div>
        <div class="get">立即使用</div>
      </div>
    </div>
    <div class="platform-good" v-if="flag==1">
      <div class="up">
        <div class="main-img">
          <img :src="imgurl + detailObj.appCoverPictureUrl" alt>
        </div>
        <div class="synthesis">
          <div class="name">
            <div class="name_box">
              <div class="text">{{detailObj.appName}}</div>
              <!-- <div class="flag" v-if="detailObj.operatingSystemName == 'PC-Web'">无需下载</div> -->
              <div class="grade">
                <div class="flag" v-if="detailObj.operatingSystemName == 'PC-Web'">无需下载</div>
                <!-- <div class="flag">无需下载</div> -->
                <div class="score">
                  <el-rate disabled v-model="value1" allow-half :max="5"></el-rate>
                </div>
              </div>
            </div>

            <div>
              <div class="pirce" v-if="detailObj.isFree==1&&detailObj.presentPrice">
                ￥
                <span>{{detailObj.presentPrice ? detailObj.presentPrice:'--'}}</span>
              </div>
              <div class="pirce" v-if="detailObj.isFree==0">免费</div>
              <div class="use">
                <div style="margin-right:20px;">
                  已有&nbsp;
                  <span class="num">{{detailObj.userNum ? detailObj.userNum : 0}}</span>&nbsp;家企业使用
                </div>
                <div v-if="detailObj.shelvesTime">
                  上架时间:
                  <span>{{detailObj.shelvesTime | hendelDate}}</span>
                </div>
              </div>
              <div class="get">立即使用</div>
            </div>
          </div>
        </div>
        <!-- <div class="synthesis">
          <div class="name">
            <div class="text">{{detailObj.appName}}</div>
            <div class="flag" v-if="detailObj.operatingSystemName == 'PC-Web'">无需下载</div>
          </div>
          <div class="pirce" v-if="detailObj.isFree==1&&detailObj.presentPrice">￥<span>{{detailObj.presentPrice&&Number(detailObj.presentPrice).toFixed(2)}}</span></div>
          <div class="pirce" v-if="detailObj.isFree==0">免费</div>
          <div class="use">
            <div>已有&nbsp;<span class="num">{{detailObj.userNum ? detailObj.userNum : 0}}</span>&nbsp;家企业使用</div>
            <div v-if="detailObj.shelvesTime">上架时间:<span>{{detailObj.shelvesTime | hendelDate}}</span></div>
          </div>
          <div class="get">立即使用</div>
        </div>-->
        <!-- <div class="score">
          <el-rate disabled v-model="value1" allow-half :max=5></el-rate>
        </div>-->
      </div>
      <div class="describe">{{detailObj.basicInformation}}</div>
      <div class="platform" v-if="detailObj.operatingSystemName">
        <!-- <img v-for="item in platformIcon" :src="item.src" :key="item.id" alt=""> -->
        <div
          v-for="(item,index) in detailObj.operatingSystemName&&detailObj.operatingSystemName.split(',').slice(0,6)"
          :key="index"
        >
          <img v-if="item == 'Android'" :src="platformIcon[0].src" alt>
          <img v-if="item == 'H5'" :src="platformIcon[1].src" alt>
          <img v-if="item == 'iOS'" :src="platformIcon[2].src" alt>
          <img v-if="item == 'Linux'" :src="platformIcon[3].src" alt>
          <img v-if="item == 'MacOS'" :src="platformIcon[4].src" alt>
          <img v-if="item == '微信小程序'" :src="platformIcon[5].src" alt>
          <img v-if="item == 'PC-Web'" :src="platformIcon[6].src" alt>
          <img v-if="item == 'Windows'" :src="platformIcon[7].src" alt>
        </div>
        <div v-if="detailObj.operatingSystemName.split(',').length > 5" class="ellipsis">...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/util";
export default {
  props: {
    flag: {
      // 0和2 一行4个   1：1行2个
      type: Number,
      required: true
    },
    detailObj: {
      type: Object
    }
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd");
      this.$forceUpdate();
    }
  },
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      value1: 4.5,
      platformIcon: [
        {
          id: 1,
          src: require("../../../static/images/app-store-detail/list-android.png")
        },
        {
          id: 2,
          src: require("../../../static/images/app-store-detail/list-h5.png")
        },
        {
          id: 3,
          src: require("../../../static/images/app-store-detail/list-ios.png")
        },
        {
          id: 4,
          src: require("../../../static/images/app-store-detail/list-linux.png")
        },
        {
          id: 5,
          src: require("../../../static/images/app-store-detail/list-mac.png")
        },
        {
          id: 6,
          src: require("../../../static/images/app-store-detail/list-mini.png")
        },
        {
          id: 7,
          src: require("../../../static/images/app-store-detail/list-pc.png")
        },
        {
          id: 8,
          src: require("../../../static/images/app-store-detail/list-win.png")
        }
      ]
    };
  },
  mounted() {},
  methods: {
    toDetail() {
        this.$router.push({
          path: "/cydn/application/detail",
          query: {
            id: this.detailObj.id
          }
        });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  width: 288px;
  height: 332px;
  background-color: #fff;
  .top {
    box-sizing: border-box;
    padding: 10px 10px;
    .name-lines {
      display: flex;
      .name-logo {
        width: 50px;
        height: 50px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        text-align: center;
        line-height: 5;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin: 0 10px 0 14px;
        .name-text {
          height: 26px;
          font-size: 20px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 188px;
        }
      }
      .name-flag {
        color: rgba(0, 183, 153, 1);
        background: rgba(14, 255, 105, 0.08);
        height: 18px;
        font-size: 10px;
      }
    }
    .use-number {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 12px;
      height: 45px;
      align-items: center;
      color: rgba(29, 29, 31, 0.39);
      .num {
        font-size: 14px;
        color: rgba(21, 107, 255, 1);
        font-weight: 600;
      }
    }
    .describe {
      font-size: 14px;
      color: rgba(29, 29, 31, 0.8);
      height: 66px;
      line-height: 21px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .del {
      width: 100%;
      height: 50px;
      line-height: 49px;
      text-align: right;
      color: rgba(29, 29, 31, 0.3);
      display: block;
      font-size: 16px;
    }
    .price {
      color: rgba(255, 103, 0, 1);
      font-size: 18px;
      text-align: right;
      height: 48px;
      font-weight: 600;
      line-height: 48px;
      span {
        font-size: 20px;
      }
    }
  }
  .get {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    color: rgba(14, 103, 255, 1);
    height: 52px;
    width: 100%;
    text-align: center;
    line-height: 51px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
  &:hover {
    box-shadow: 0 8px 11px 0 rgba(28, 126, 255, 0.23);
  }
  &:hover .get {
    background-color: rgba(22, 88, 255, 1);
    color: #fff;
  }
}
.platform-good {
  width: 592px;
  height: 290px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 18px;
  .up {
    display: flex;
    .main-img {
      width: 148px;
      height: 148px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .synthesis {
      flex: 1;
      .name {
        display: flex;
        flex-direction: column;
        .name_box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text {
            width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 20px;
            font-family: PingFangSC;
            color: rgba(29, 29, 31, 1);
          }
          .grade {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .flag {
              color: rgba(0, 183, 153, 1);
              background: rgba(14, 255, 105, 0.08);
              // height: 18px;
              padding: 4px;
              font-size: 10px;
              margin-left: 10px;
            }
          }
          .score {
            margin-left: 10px;
          }
        }
      }
      .pirce {
        font-weight: 600;
        font-size: 20px;
        color: #ff6700;
        margin: 15px 0;
      }
      .use {
        display: flex;
        // justify-content: space-between;
        margin-bottom: 15px;
        font-size: 14px;
        color: rgba(29, 29, 31, 0.39);

        .num {
          color: rgba(27, 111, 255, 1);
          font-weight: 600;
        }
      }
      .get {
        width: 90px;
        height: 32px;
        color: rgba(14, 103, 255, 1);
        border: 1px solid rgba(14, 103, 255, 1);
        text-align: center;
        line-height: 32px;
        background: #fff;
      }
    }
  }
  .describe {
    margin: 15px;
    color: rgba(29, 29, 31, 0.8);
    font-size: 14px;
    height: 44px;
    line-height: 21px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .platform {
    height: 32px;
    flex-wrap: wrap;
    display: flex;
    overflow: hidden;
    div {
      height: 32px;
    }
    img {
      margin-right: 5px;
    }
    .ellipsis {
      line-height: 32px;
      color: #bfbfbf;
      font-size: 20px;
    }
  }
  &:hover {
    box-shadow: 0 8px 11px 0 rgba(28, 126, 255, 0.23);
  }
  &:hover .synthesis .get {
    background-color: rgba(22, 88, 255, 1);
    color: #fff;
  }
}
</style>