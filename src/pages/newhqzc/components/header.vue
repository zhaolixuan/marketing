<template>
  <div>
    <header>
      <div class="header content">
        <img
          :src="require('@/static/images/heder_img.png')"
          alt=""
          @click="toPath('self', '/cydn/hqzc/home')"
        />
      </div>
    </header>
    <div class="banner-wrap" :style="{'height':bannerHeight}">
      <img
        :src="require('@/static/images/hqzc_header.png')"
        alt=""
        class="bgImg"
        v-if="bannerList.length === 0"
      />
      <div class="bannerBox" v-else :style="{'height':bannerHeight}">
        <el-carousel :height="bannerHeight">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <img
              :src="imgurl + item.pics"
              alt
              @click="linkUrlEvent(item)"
              :style="{ cursor: item.url ? 'pointer' : 'default' }"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="banner content">
        <div class="title">
          <img
            :src="require('@/static/images/hqzc_title.png')"
            alt=""
            v-if="bannerList.length == 0"
          />
        </div>
        <div class="tabs-wrap">
          <div class="tabs">
            <div
              class="tab"
              :class="{ active: currentIndex === 0 }"
              @click="handleClick(0)"
            ></div>
            <div
              class="tab"
              :class="{ active: currentIndex === 1 }"
              @click="handleClick(1)"
            ></div>
          </div>
          <div class="search-wrap">
            <el-input
              class="search"
              placeholder="请输入政策名称或关键字查询"
              v-model="keyword"
              v-if="currentIndex === 0"
              @keyup.enter.native="handleKeyUp"
            ></el-input>
            <el-autocomplete
              class="search"
              placeholder="请输入企业名称匹配更多精准政策"
              v-model="keyword"
              :fetch-suggestions="querySearch"
              @keyup.enter.native="handleKeyUp"
              :trigger-on-focus="false"
              @select="handleSelect"
              v-else-if="(currentIndex = 1)"
            ></el-autocomplete>
            <div class="btn" @click="search">
              查询
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchCompany, getAuthCompany } from "@/api/hqzc.js";
import { to, isEmptyObject } from "@/common/util";
import { getBanner } from "@/api/baseApi";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      currentIndex: 0,
      keyword: "",
      bannerList: [],
      bannerHeight: "500px"
    };
  },
  mounted() {
    this.getBanner();
    // 动态计算banner图的高度
    this.$nextTick(() => {
      this.bannerHeight = document.body.clientWidth / 3.84 + "px";
      window.onresize = () => {
        return (() => {
          this.bannerHeight = document.body.clientWidth / 3.84 + "px";
        })();
      };
    });
  },
  methods: {
    async getBanner() {
      const bannerList = await getBanner({ search_EQ_type: "hqzc" });
      this.bannerList = bannerList.data.rows;
    },
    toPath(type = "self", path, query) {
      // 本页面跳转
      const self = () => this.$router.push({ path, query });
      // 新页面打开
      const blank = () => {
        const { href } = this.$router.resolve({ path, query });
        window.open(href, "_blank");
      };
      if (type === "self") self();
      if (type === "blank") blank();
    },
    // 搜索
    async search() {
      const message = (message, type) => this.$message({ message, type });

      // 查政策
      function checkPolicy() {
        const isHome = this.$route.path === "/cydn/hqzc/home";
        const isPolicyList = this.$route.path === "/cydn/hqzc/policyList";

        // 首页搜索都在新页面打开
        if (isHome){
          return this.toPath("blank", "/cydn/hqzc/policyList", {
            keyword: this.keyword,
          });
        }
          
        // 政策列表页
        isPolicyList
          ? this.$emit("search", this.keyword)
          : this.toPath("self", "/cydn/hqzc/policyList", {
              keyword: this.keyword,
            });
      }

      // 查企业
      function checkEnterprise() {
        // 非空判断
        if (this.keyword === "") return message("请输入搜索关键词", "warning");

        const isHome = this.$route.path === "/cydn/hqzc/home";
        let isError = false;
        let path = "/cydn/searchList";

        // 查询第三方接口
        network.call(
          this,
          searchCompany({ companyName: this.keyword, PageNo: 1 }),
          thirdPartyInterface
        );

        // 查询第三方接口
        function thirdPartyInterface(res) {
          const { retData, success } = res.data;
          if (success) {
            let bool = retData.find((i) => i.value === this.keyword);
            // 搜索公司名称是全名称并且公司是开业状态才可以跳到详情页
            if (bool && retData[0].scoreMark === 1) {
              path = "/cydn/companyInfo";
              return;
            }
            return;
          }
          // 未搜索到数据或者第三方数据不是全名称或者不是开业状态
          // 调用本地接口
          network.call(
            this,
            getAuthCompany({ companyName: this.keyword }),
            LocalInterface
          );
        }

        // 查询企业详情
        function LocalInterface(res) {
          if (!isEmptyObject(res.data.retData)) path = "/cydn/companyInfo";
        }

        async function network(api, cb) {
          const [err, res] = await to(api);

          if (err) {
            message("error", "请求超时，请重新查询");
            isError = true;
            return;
          }

          cb.call(this, res);
        }

        if (!isError) {
          if (this.$route.path === path) {
            this.$emit("search", this.keyword);
          } else {
            const type = isHome ? "blank" : "self";
            this.toPath(type, path, { companyName: this.keyword });
          }
        }
      }

      if (this.currentIndex === 0) checkPolicy.call(this);

      if (this.currentIndex === 1) checkEnterprise.call(this);
    },
    setKeyword(value) {
      this.keyword = value;
    },
    setCurrentIndex(index) {
      this.currentIndex = index;
      this.keyword = "";
    },
    // 企业联想
    async querySearch(query, cb) {
      let data = [];
      if (query) {
        const [err, res] = await to(
          searchCompany({
            companyName: query,
          })
        );
        if (err) {
          this.$message.error("请求超时，请重新查询");
        } else {
          const { retData, success } = res.data;
          if (success) {
            data = retData.map((item) => ({ value: item.entName }));
          } else {
            this.$message.warning("未查询到该企业！");
          }
        }
      }
      cb(data);
    },
    handleSelect(item) {
      this.toPath("self", "/cydn/companyInfo", { companyName: item.value });
    },
    handleClick(index) {
      if (index === this.currentIndex) return;
      this.setCurrentIndex(index);
    },
    handleKeyUp() {
      this.search();
    },
    linkUrlEvent(item) {
      if (!item.attributes.src) {
        return;
      }
      if (item.attributes.src.search(/\${token}/) > -1 && !localStorage.token) {
        this.$router.push({
          path: "/login",
        });
      } else if (
        item.attributes.src.search(/\${token}/) > -1 &&
        item.attributes.src.indexOf("http") > -1
      ) {
        window.open(
          item.attributes.src.replace(/\${token}/, localStorage.token)
        );
      } else if (item.attributes.src.indexOf("http") > -1) {
        window.open(`${item.attributes.src}`);
      } else {
        this.$router.push({
          path: item.attributes.src,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 1200px;
$color: rgba(14, 103, 255, 1);
.content {
  width: $w;
  margin: 0 auto;
}

::v-deep .el-input__icon {
  margin: 2px 0 0;
}

header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 82px;
  background: rgba(255, 255, 255, 1);
  .header {
    display: flex;
    width: $w;
    img {
      width: 207px;
      height: 57px;
      cursor: pointer;
    }
  }
}
.banner-wrap {
  position: relative;
  background-size: cover;
  .bgImg {
    width: 100%;
    height: 100%;
  }
  .banner {
    padding: 0px 91px;
    box-sizing: border-box;
    position: absolute;
    bottom: 20%;
    left: 50%;
    margin-left: -600px;
    z-index: 999;
    .title {
      width: 1036px;
      height: 71px;
      img {
        width: 100%;
      }
    }
    .tabs-wrap {
      margin: 79px 35px 0;
      .tabs {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
        .tab {
          width: 120px;
          height: 60px;
          cursor: pointer;
          &.active {
            &:nth-child(1) {
              margin-right: 70px;
              background: url("~@/static/images/check_policy_active.png");
              background-size: cover;
            }
            &:nth-child(2) {
              width: 144px;
              background: url("~@/static/images/policy_matching_active.png");
              background-size: cover;
            }
          }
          &:nth-child(1) {
            margin-right: 70px;
            background: url("~@/static/images/check_policy_default.png");
            background-size: cover;
          }
          &:nth-child(2) {
            width: 144px;
            background: url("~@/static/images/policy_matching_default.png");
            background-size: cover;
          }
        }
      }
      .search-wrap {
        display: flex;
        .search {
          position: relative;
          width: 840px;
          height: 50px;
          &::before {
            position: absolute;
            display: block;
            top: 13px;
            left: 16px;
            content: "";
            width: 24px;
            height: 24px;
            background: url("~@/static/images/icon_searchs.png") no-repeat;
            background-size: cover;
            z-index: 1;
          }
          ::v-deep .el-input__inner {
            padding-left: 52px;
            height: 50px;
            background: #fff;
            border-radius: 25px 0 0 25px;
          }
        }
        .btn {
          display: flex;
          align-items: center;
          padding-left: 30px;
          width: 109px;
          height: 51px;
          font-size: 18px;
          font-weight: 500;
          color: #fff;
          background: rgba(15, 114, 255, 1);
          border-radius: 0 26px 26px 0;
          box-sizing: border-box;
          letter-spacing: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
.bannerBox {
  height: 500px;
  width: 100%;
  ::v-deep .el-carousel__container {
    height: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
