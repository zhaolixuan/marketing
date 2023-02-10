<!--
待办： 查询条件入参和分页
       图片资源加载不出来
-->
<template>
  <div class="application">
    <div class="search-params">
      <div class="one-line">
        <el-input v-model="searchActive.input" placeholder="请输入内容" class="inpt" size="medium"></el-input>
        <el-button type="primary" class="btn" icon="el-icon-search" @click="search(true)">查 询</el-button>
        <el-button class="btn" @click="delActive">清除选择</el-button>
      </div>
      <div class="two-line">
        <el-select
          @change="getTwoList"
          v-model="searchActive.oneClass"
          placeholder
          class="select"
          size="medium"
        >
          <el-option
            v-for="item in oneList"
            :key="item.oneId"
            :label="item.oneTitle"
            :value="item.oneId"
          ></el-option>
        </el-select>
        <el-select v-model="searchActive.twoClass" placeholder class="select" size="medium">
          <el-option
            v-for="item in twoList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-date-picker
          value-format="yyyy-MM-dd"
          size="medium"
          class="select"
          v-model="searchActive.date"
          prefix-icon="none"
          type="daterange"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="three-line" v-for="(item,i) in searchOption" :key="item.type">
        <span class="title">{{item.type}}：</span>
        <span
          class="each"
          v-for="(op,index) in item.options"
          :key="op.value"
          :class="{'active':index==(i==0?searchActive.price:i==1?searchActive.sys:i==2?searchActive.customer:0)}"
          @click="clickOption(index,i,item)"
        >{{ op.label }}</span>
      </div>
    </div>
    <div class="list-wrap">
      <div class="list-filter"></div>
      <ul v-loading="loading">
        <li class="item" v-for="item in dataList.rows" :key="item.id" @click="goDetail(item)">
          <div class="item-left-wrap">
            <div class="logo-use-line">
              <div class="logo">
                <img :src="handelImg(item.appCoverPictureUrl)">
              </div>
              <div class="name-score">
                <div class="name">
                  <div class="text">{{ item.appName }}</div>
                  <div
                    class="flag"
                    v-if="(item.operatingSystemName&&item.operatingSystemName.split(',').length==1)&&(item.operatingSystemName&&item.operatingSystemName.split(',')[0]=='PC-Web')"
                  >无需下载</div>
                </div>
                <div class="score">
                  <el-rate v-model="score" disabled allow-half :max="5"></el-rate>
                </div>
                <div class="use-type">
                  <div>客户群体： {{ item.customerGroup||'客户群体' }}</div>
                  <div>服务商：{{ item.supplierInformation||'服务商' }}</div>
                </div>
              </div>
              <div class="use-num">
                已有
                <span>{{ item.userNum || '0' }}</span>家企业使用
              </div>
            </div>
            <div class="describe" v-html="item.appIntroduce"></div>
            <div class="sys-icon" v-if="item.operatingSystemName">
              适用系统
              <img
                v-for="srcU in item.operatingSystemName&&item.operatingSystemName.split(',')"
                :key="srcU"
                :src="platformIcon[srcU]"
              >
            </div>
          </div>
          <div class="item-right-wrap">
            <div class="price">
              <del v-if="item.isFree == '1'">市场价：￥{{item.marketPrice ? item.marketPrice : '--'}}元</del>
              <div v-if="item.isFree == '1'">
                现价：￥
                <span>{{ item.presentPrice ? item.presentPrice :'--' }}</span>元
              </div>
              <div style="font-size:20px;" v-else>免费</div>
            </div>
            <div class="use-btn" @click.stop="goDetail(item)">立即使用</div>
          </div>
        </li>
      </ul>
      <div class="page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <popup ref="purchase"></popup>
  </div>
</template>
<script>
import { getStoreList, getTree, storeIsSave } from "../../api/application";
import popup from "./components/purchasePopup.vue";
export default {
  components: { popup },
  data() {
    return {
      input: "",
      value: "",
      value1: "",
      oneList: [],
      twoList: [],
      options: [],
      searchActive: {
        input: "",
        oneClass: "",
        twoClass: "",
        date: [],
        price: 0,
        sys: 0,
        customer: 0
      },
      searchOption: [
        {
          type: "价格",
          options: [
            { label: "全部", value: "" },
            { label: "免费", value: 1 },
            { label: "1-1000", value: 2 },
            { label: "1001-10000", value: 3 },
            { label: "10001-50000", value: 4 },
            { label: "50000以上", value: 5 }
          ]
        },
        {
          type: "操作系统",
          options: [
            { label: "全部", value: "" },
            { label: "Windows", value: "Windows" },
            { label: "Linux", value: "Linux" },
            { label: "iOS", value: "iOS" },
            { label: "MacOS", value: "MacOS" },
            { label: "Android", value: "Android" },
            { label: "PC-Web", value: "PC-Web" },
            { label: "H5", value: "H5" },
            { label: "微信小程序", value: "微信小程序" }
          ]
        },
        {
          type: "客户群体",
          options: [
            { label: "全部", value: "" },
            { label: "大中型企业", value: "大中型企业" },
            { label: "小微型企业", value: "小微型企业" },
            { label: "团队", value: "团队" },
            { label: "不限", value: "不限" }
          ]
        }
      ],
      score: 4.5,
      platformIcon: {
        'Android': require("../../static/images/app-store-detail/list-android.png"),
        "H5": require("../../static/images/app-store-detail/list-h5.png"),
        'iOS': require("../../static/images/app-store-detail/list-ios.png"),
        'Linux': require("../../static/images/app-store-detail/list-linux.png"),
        'MacOS': require("../../static/images/app-store-detail/list-mac.png"),
        '微信小程序': require("../../static/images/app-store-detail/list-mini.png"),
        "PC-Web": require("../../static/images/app-store-detail/list-pc.png"),
        'Windows': require("../../static/images/app-store-detail/list-win.png")
      },

      currentPage: 1,
      pageSize: 10,
      total: 1,
      twoId: "",
      dataList: {},
      loading: false
    };
  },
  methods: {
    getTree() {
      var that = this;
      getTree().then(res => {
        that.oneList = res.data;
        if (that.searchActive.oneClass) {
          this.getTwoList();
        }
      });
    },
    getTwoList() {
      var that = this;
      that.searchActive.twoClass = "";
      var arr = [];
      arr = that.oneList.filter(function(item) {
        return item.oneId == that.searchActive.oneClass;
      });
      that.twoList = arr[0].twoList;
      if (that.twoId) {
        that.searchActive.twoClass = that.twoId;
        this.twoId = "";
      }
    },
    // getList() {
    //   getStoreList().then(res => {
    //     this.dataList = res.data;
    //     this.total = Number(res.data.total);
    //   });
    // },
    search(is) {
      this.loading = true;
      if (is) this.currentPage = 1;
      // if(this.pageSize != 1) this.pageSize
      let params = {
        search_EQ_status: 0,
        search_EQ_categoryLevelOneId: this.searchActive.oneClass,
        search_EQ_categoryLevelTwoId: this.searchActive.twoClass,
        search_EQ_shelvesTime:
          this.searchActive.date.length > 0
            ? this.searchActive.date[0] + "," + this.searchActive.date[1]
            : "",
        search_LIKE_operatingSystemName: this.searchOption[1].options[
          this.searchActive.sys
        ].value,
        search_LIKE_customerGroup: this.searchOption[2].options[
          this.searchActive.customer
        ].value,
        search_LIKE_appName: this.searchActive.input,
        page: this.currentPage,
        rows: this.pageSize
      };
      switch (this.searchActive.price) {
        case 1:
          params.search_EQ_isFree = "0";
          break;
        case 2:
          params.search_EQ_isFree = "1-1000";
          // params.search_GTE_presentPriceMin='1000';
          // params.search_LTE_presentPriceMax='1';
          break;
        case 3:
          params.search_EQ_isFree = "1001-10000";
          // params.search_GTE_presentPriceMax='1001';
          // params.search_LTE_presentPriceMin='10000';
          break;
        case 4:
          params.search_EQ_isFree = "10001-50000";
          // params.search_GTE_presentPriceMax='10001';
          // params.search_LTE_presentPriceMin='50000';
          break;
        case 5:
          params.search_EQ_isFree = "50000以上";
          // params.search_GTE_presentPriceMax='50000'
          break;
      }
      getStoreList(params).then(res => {
        this.loading = false;
        this.dataList = res.data;
        this.total = Number(res.data.total);
      });
    },
    delActive() {
      for (const key in this.searchActive) {
        if (Array.isArray(this.searchActive[key])) {
          this.searchActive[key] = [];
        } else if (typeof this.searchActive[key] == "number") {
          this.searchActive[key] = 0;
        } else {
          this.searchActive[key] = "";
        }
      }
    },
    //acI 选择项  n 第几行 价格 系统 群体
    clickOption(acI, n, item) {
      console.log(item);
      if (n == 0) {
        this.searchActive.price = acI;
      }
      if (n == 1) {
        this.searchActive.sys = acI;
      }
      if (n == 2) {
        this.searchActive.customer = acI;
      }
    },
    handelImg(img) {
      return process.env.VUE_APP_IMG_URL + img;
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    getUse(item) {
      if (!JSON.parse(localStorage.vuex).userInfo.companyInfo) {
        this.$message("当前账户未认证，请先认证");
        this.$router.push("/cydn/userCenter/EnterpriseCertification");
        return;
      }
      storeIsSave({
        userId: JSON.parse(localStorage.vuex).userInfo.userId,
        appId: item.id
      }).then(res => {
        if (res.data) {
          this.$message("您已提交购买申请，请联系客服");
        } else {
          this.$refs.purchase.open({ appId: item.id, appName: item.appName });
        }
      });
    },
    goDetail(item) {
        this.$router.push({
          path: "/cydn/application/detail",
          query: {
            id: item.id
          }
        });
      
    }
  },
  mounted() {
    this.searchActive.oneClass = this.$route.query.oneId;
    this.twoId = this.$route.query.twoId;
    this.searchActive.twoClass = this.$route.query.twoId;
    this.searchActive.input = this.$route.query.searchContent;
    this.search();
    // if(Object.keys(this.$route.query).length!=0 ){
    //   this.search();
    // }else{
    //   this.getList();
    // }

    this.getTree();
  }
};
</script>
<style lang="scss" scoped>
.application {
  width: 1200px;
  margin: 0 auto;
  .search-params {
    background-color: #fff;
    padding: 20px 35px;
    margin-bottom: 15px;
    & > div {
      height: 63px;
      display: flex;
      align-items: center;
    }
    .one-line {
      display: flex;
      justify-content: space-evenly;
      .inpt {
        width: 80%;
        margin-right: 10px;
      }
      .btn {
        width: 103px;
        height: 37px;
        border: 1px solid rgba(14, 103, 255, 1);
        font-size: 16px;
      }
      .btn:first-of-type {
        background-color: rgba(14, 103, 255, 1);
        color: #fff;
      }
      .btn:last-of-type {
        color: rgba(14, 103, 255, 1);
      }
    }
    .two-line {
      justify-content: space-between;
      .select {
        position: relative;
        width: 349px;
        ::v-deep .el-input__inner {
          padding-left: 90px !important;
        }
        ::v-deep .el-range__icon {
          display: none;
        }
        ::v-deep .el-range-editor {
          padding-left: 81px !important;
        }
      }

      .select:first-of-type::before {
        content: "应用分类:";
        @extend .public;
      }
      .select:nth-child(2)::before {
        content: "二级分类:";
        @extend .public;
      }
      .select:last-of-type {
        ::v-deep .el-range-input:first-of-type {
          padding-left: 68px !important;
        }
      }
      .select:last-of-type::before {
        content: "上架时间:";
        @extend .public;
      }
    }
    .three-line {
      .title {
        color: rgba(0, 0, 0, 0.8);
        margin-right: 15px;
        font-weight: 600;
        // width: 80px;
      }
      .each {
        padding: 5px 15px;
        cursor: pointer;
        box-sizing: border-box;
        margin-right: 22px;
        color: rgba(0, 0, 0, 0.6);
      }
      .active {
        background-color: rgba(14, 103, 255, 1);
        color: #fff;
      }
    }
    .three-line + .three-line {
      border-top: 1px dashed rgba(0, 0, 0, 0.1);
    }
  }
  .list-wrap {
    // background-color: #fff;
    & > ul {
      .item {
        display: flex;
        box-sizing: border-box;
        padding: 25px 50px 0px 50px;
        background-color: #fff;
        margin-bottom: 2px;
        transition: all 0.2s linear;
        .item-left-wrap {
          width: 835px;
          .logo-use-line {
            display: flex;
            .logo {
              display: flex;
              width: 75px;
              height: 75px;
              overflow: hidden;
              border: 1px solid rgba(0, 0, 0, 0.05);
              margin-right: 15px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .name-score {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              width: 450px;
              .name {
                display: flex;
                .text {
                  font-size: 24px;
                  font-family: PingFangSC;
                  font-weight: 600;
                  color: rgba(29, 29, 31, 1);
                }
                .flag {
                  color: rgba(0, 183, 153, 1);
                  background: rgba(14, 103, 255, 0.08);
                  height: 18px;
                  padding: 2px 5px;
                  box-sizing: border-box;
                  font-size: 10px;
                  background: rgba(14, 255, 105, 0.08);
                  border-radius: 2px;
                  margin-left: 30px;
                }
              }
              .use-type {
                display: flex;
                justify-content: space-between;
                color: rgba(29, 29, 31, 0.39);
                font-size: 12px;
              }
            }
            .use-num {
              margin-left: auto;
              font-size: 16px;
              span {
                color: rgba(14, 103, 255, 1);
                font-size: 18px;
              }
            }
          }
          .describe {
            color: rgba(0, 0, 0, 0.8);
            font-size: 14px;
            height: 44px;
            overflow: hidden;
            line-height: 21px;
            margin: 16px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .sys-icon {
            display: flex;
            align-items: center;
            height: 60px;
            font-size: 14px;
            color: rgba(29, 29, 31, 0.8);
            border-top: 1px dashed rgba(0, 0, 0, 0.1);
            img {
              height: auto;
              margin-left: 13px;
            }
          }
        }
        .item-right-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          height: 140px;
          // width: 200px;
          margin-left: auto;
          text-align: right;
          box-sizing: border-box;
          .price {
            del {
              display: block;
              color: rgba(29, 29, 31, 0.3);
              font-size: 14px;
              margin-bottom: 10px;
            }
            & > div {
              font-size: 16px;
              color: rgba(255, 103, 0, 1);
              span {
                font-size: 18px;
                font-weight: 600;
              }
            }
          }
          .use-btn {
            cursor: pointer;
            width: 181px;
            height: 40px;
            border: 1px solid rgba(14, 103, 255, 1);
            text-align: center;
            line-height: 40px;
            color: rgba(14, 103, 255, 1);
          }
        }
        &:hover {
          cursor: pointer;
          transform: translate3d(0, -2px, 0);
          box-shadow: 0 8px 11px 0 rgba(28, 126, 255, 0.2);
          .use-btn {
            background-color: rgba(14, 103, 255, 1);
            color: #fff;
          }
        }
      }
    }
    .page {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 102px;
    }
  }
}
.public {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
</style>
