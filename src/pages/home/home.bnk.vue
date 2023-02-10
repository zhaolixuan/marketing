<template>
  <div>
    <div class="bannerBox">
      <img
        src="../../static/images/qt_banner.png"
        :style="{ height: banner_height }"
        v-if="bannerList.length == 0"
      />
      <el-carousel :style="{ height: banner_height }" v-else>
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img :src="imgurl + item.pics" alt  @click="linkUrlEvent(item)" :style="{ cursor: item.url ? 'pointer' : 'default' }"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 核心产品及服务 -->
    <div class="coreServices">
      <div class="title_box inner">
        <h3>
          <img src="../../static/images/first/left2.png" alt />
          <span class="white">核心产品及服务</span>
          <img src="../../static/images/first/right2.png" alt />
        </h3>
        <div class="subTitle white">
          让每一位上云的客户成为全球绿色节能和降低碳排放的贡献者
        </div>
      </div>
      <ul class="inner">
        <li
          v-for="(item, index) in appList"
          :key="index"
          @click="routerPath(item.link)"
        >
          <img :src="item.imgUrl" alt="" />
          <h6>{{ item.title }}</h6>
          <p>{{ item.desc }}</p>
        </li>
      </ul>
    </div>

    <div class="message">
      <div class="inner">
        <el-carousel
          height="120px"
          direction="vertical"
          class="left"
          indicator-position="none"
          :interval="5000"
        >
          <el-carousel-item v-for="item in messageList" :key="item.id">
            <h3 @click="toMessageDetail(item)">
              {{ item.title }}
            </h3>
          </el-carousel-item>
        </el-carousel>
        <div class="right" @click="routerPath('/cydn/information')">
          查看更多资讯
        </div>
      </div>
    </div>
    <!-- 外贸数据 -->
    <div class="foreignTrade">
      <div class="title_box inner">
        <h3>
          <img src="../../static/images/first/left2.png" alt />
          <span>外贸数据</span>
          <img src="../../static/images/first/right2.png" alt />
        </h3>
        <div class="subTitle">
          遍布全球的基础设施节点为用户提供快速稳定、智能可靠的服务 ，
          <span style="color: #0e67ff" @click="routerPath('/cydn/resources/tradeSituation')">查看详情></span>
        </div>
      </div>
      <div class="foreignTrade_inner inner">
        <div class="tapBox">
          <ul class="tapBox_title">
            <li v-for="(item, index) in tapList" :key="item.id">
              <span
                :class="{ spanActive: tapId == item.id }"
                @click="tap(item.id, index)"
                >{{ item.name }}</span
              >
            </li>
          </ul>
          <div class="tapBox_container">
            <div class="tapBox_container_left">
              <ul class="tapBox_container_leftBox">
                <li>
                  <p>主要贸易国家</p>
                  <div>
                    <span>{{ tapList[tapId - 1].one }}</span
                    >个
                  </div>
                </li>
                <li>
                  <p>采购商数量</p>
                  <div>
                    <span>{{ tapList[tapId - 1].two }}</span
                    >个
                  </div>
                </li>
                <li>
                  <p>交易次数</p>
                  <div>
                    <span>{{ tapList[tapId - 1].three }}</span
                    >次
                  </div>
                </li>
                <li>
                  <p>交易数量</p>
                  <div>
                    <span>{{ tapList[tapId - 1].four }}</span
                    >个
                  </div>
                </li>
              </ul>
              <div class="tapBox_container_echartsBox">
                <div class="map-view" id="map" ref="map"></div>
              </div>
            </div>
            <div class="tapBox_container_right">
              <div class="right_data">
                <h4>
                  <img src="../../static/images/first/icon1.png" alt />
                  <span>数据展示</span>
                </h4>
                <ul>
                  <li>
                    <p>数据源国家</p>
                    <div>
                      <span>{{ tapList[tapId - 1].five }}</span
                      >个
                    </div>
                  </li>
                  <li>
                    <p>采购商数量</p>
                    <div>
                      <span>{{ tapList[tapId - 1].six }}</span
                      >个
                    </div>
                  </li>
                  <li>
                    <p>采购数据数</p>
                    <div>
                      <span>{{ tapList[tapId - 1].three }}</span
                      >个
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="distribution">
      <div class="title_box inner">
        <h3>
          <img src="../../static/images/first/left2.png" alt />
          <span class="white">分销商城</span>
          <img src="../../static/images/first/right2.png" alt />
        </h3>
        <div class="subTitle white">
          遍布全球的基础设施节点为用户提供快速稳定、智能可靠的服务
        </div>
      </div>
      <div class="container inner">
        <ul class="container_left">
          <li
            v-for="(item, index) in shopFloor"
            :key="index"
            @click="shopEvent(item.id)"
          >
            <img :src="item.imgSrc" alt />
            <span :class="{ spanActive1: shopFloorId == item.id }">{{
              item.name
            }}</span>
          </li>
        </ul>
        <ul class="container_right"> 
          <li v-for="item in shopList" :key="item.id">
            <img
              :src="
                item.goodsPicture && imgurl + item.goodsPicture.split(',')[0]
              "
              alt
              v-if="shopFloorId == 1"
              @click="shopOpenEvent(item)"
            />
            <img
              :src="imgurl + item.brainLogoId"
              alt
              v-else-if="shopFloorId == 2"
              @click="shopOpenEvent(item)"
            />
          </li>
        </ul>
      </div>
    </div>

    <div class="zcsb">
      <div class="title_box inner">
        <h3>
          <img src="../../static/images/first/left2.png" alt />
          <span>政策申报</span>
          <img src="../../static/images/first/right2.png" alt />
        </h3>
        <div class="subTitle">
          政策利民，
          <span
            style="color: #0e67ff"
            @click="routerPath('/cydn/hqzc/policyQuery')"
            >查看更多></span
          >
        </div>
      </div>
      <ul class="inner">
        <li v-for="item in policyDeclarationList" :key="item.id" @click="handlePolicyDetails(item)">
          <div class="top">
            <h5>{{ item.title }}</h5>
            <div>
              {{ item.issueTime | filterTime('yyyy-MM-DD') }}
              <h6>
                <span v-for="tag in item.policyThemes" :key="tag">
                  {{ tag }}</span
                >
              </h6>
            </div>
            <p>
              {{ item.contextAbstract }}
            </p>
          </div>
          <div class="bottom">
            <span>
              <i class="el-icon-view"></i>{{ item.declarableFunds || 0 }}
            </span>
            <span>
              <i class="el-icon-user"></i> {{ item.declareCount || 0 }}
            </span>

            <div class="active" @click.stop="handleDeclareImmediately(item)">
              点击申报
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="hyzj" v-if="expertsList.length">
      <div class="title_box inner">
        <h3>
          <img src="../../static/images/first/left2.png" alt />
          <span class="white">行业专家</span>
          <img src="../../static/images/first/right2.png" alt />
        </h3>
        <div class="subTitle white">
          各个领域知名的行业专家，<span
            @click="routerPath('/cydn/cyzj/warehouse')"
            >查看更多>
          </span>
        </div>
      </div>

      <ul class="inner">
        <li v-for="item in expertsList" :key="item.id">
          <div class="top">
            <img :src="imgurl + item.expertsPhotos" alt="" />
            <div>
              <h6>{{ item.expertsName }}</h6>
              <p>院校： {{ item.graduateSchool }}</p>
              <p>职称： {{ item.theTitle }}</p>
              <p>职务： {{ item.position }}</p>

              <p>从事领域：</p>

              <h5>
                <span v-for="items in item.goodAtFieldArr" :key="items">{{
                  items
                }}</span>
              </h5>
            </div>
          </div>
          <div class="bottom" @click="toExpertsDetail(item)">点击查看</div>
        </li>
      </ul>
    </div>

    <div class="zc">
      <div class="inner">
        <div class="left">
          <h6 class="title">
            <img src="../../static/images/first/icon5.png" alt />
            <span>热门政策</span>
            <em @click="routerPath('/cydn/hqzc/policyQuery')">查看更多></em>
          </h6>
          <ul>
            <li
              v-for="item in hotPolicyList"
              :key="item.id"
              @click="handlePolicyDetail(item)"
            >
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div>
        <div class="right">
          <h6 class="title">
            <img src="../../static/images/first/icon6.png" alt />
            <span>最新资讯</span>
            <em @click="routerPath('/cydn/information')">查看更多></em>
          </h6>
          <ul class="zx">
            <li
              v-for="item in messageList"
              :key="item.id"
              @click="toMessageDetail(item)"
            >
              <img :src="imgurl + item.coverUrl" alt />
              <div>
                <h6>{{ item.title }}</h6>
                <p>
                  {{ item.description }}
                </p>
              </div>
            </li>
          </ul>
          <h6 class="title">
            <img src="../../static/images/first/icon4.png" alt />
            <span>最新活动</span>
            <em @click="moreActive('活动列表', 1)">查看更多></em>
          </h6>
          <ul class="hd">
            <li
              v-for="item in ActivityData"
              :key="item.id"
              :style="{ backgroundImage: 'url(' + imgurl + item.icon + ')' }"
              @click="toActiveDetail(item.id)"
            >
              <!-- <h6>{{ item.title }}</h6>
              <span>查看详情></span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import world from "./world.json";
import { nameMap, mapData } from "./config";
import Empty from "../../components/Empty.vue";
import "../../static/js/swiper.min.js";
import { indexGetPolicyByType, getKeyWordSearch } from "@/api/hqzc.js";
import { getBanner } from "@/api/baseApi";
import { hotShopList, brainList } from "@/api/shopApi";
import { getActivityData, getActivityRecommendData } from "@/api/activity";
import { informationList } from "@/api/information.js";
import api from "@/api/cyzjApi";
import { to } from "@/common/util";
import { authorization } from "@/common/authorization";
import { getDeclare} from "@/api/hqzc.js"
import vFooter from "@/components/Footer.vue";

export default {
  components: { Empty ,vFooter},
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
      banner_height: "520px",
      bannerList: [],
      hotPolicyList: [],
      appList: [
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
      messageList: [],
      ActivityData: [],
      shopList: [],

      tapList: [
        {
          name: "美国",
          id: "1",
          one: "2827",
          two: "626",
          three: "223",
          four: "2333",
          five: "8756",
          six: "95886",
          seven: "73736",
        },
        {
          name: "俄罗斯",
          id: "2",
          one: "122",
          two: "55",
          three: "2334",
          four: "678",
          five: "896",
          six: "234",
          seven: "11326",
        },
        {
          name: "秘鲁",
          id: "3",
          one: "6757",
          two: "876",
          three: "9754",
          four: "8756",
          five: "4579",
          six: "7586",
          seven: "4586",
        },
        {
          name: "加拿大",
          id: "4",
          one: "467",
          two: "876",
          three: "568",
          four: "54",
          five: "469",
          six: "62224",
          seven: "237",
        },
      ],
      tapId: "1",

      shopFloorId: "1",
      shopFloor: [
        {
          name: "热销商品",
          id: "1",
          imgSrc: require("../../static/images/first/icon11.png"),
        },
        {
          name: "精品大牌",
          id: "2",
          imgSrc: require("../../static/images/first/icon22.png"),
        },
      ],
      expertsList: [],
      policyDeclarationList: [],
    };
  },

  mounted() {
    this.initMap(mapData);
    this.shopEvent(1);
    this.getBanner();
    this.informationList();
    this.getActivityData();
    this.getPolicyList();
    this.getExpertsList();
    this.getPolicyDeclaration();
    this.$nextTick(function () {
      this.banner_height = document.body.clientWidth / 3.69 + "px";
      window.onresize = () => {
        return (() => {
          this.banner_height = document.body.clientWidth / 3.69 + "px";
        })();
      };
    });
  },
  methods: {
    handlePolicyDetails(item){
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: item.id
        }
      });
    },
    linkUrlEvent(item) {
      if (!item.url) {
        return;
      }
      if (item.url.search(/\${token}/) > -1 && !localStorage.token) {
        this.$router.push({
          path: "login",
        });
      } else if (item.url.search(/\${token}/) > -1) {
        window.open(
          item.url.replace(/\${token}/, localStorage.token)
        );
      } else if (item.url.indexOf("http") > -1) {
        window.open(`${item.url}`);
      } else {
        this.$router.push({
          path: item.url,
        });
      }
    },
    async getBanner() {
      const bannerList = await getBanner({ search_EQ_type: "webHomePage" });
      this.bannerList = bannerList.data.rows;
    },
    async informationList() {
      const messageList = await informationList({ pageSize: 4, curPage: 1 });
      this.messageList = messageList.data.retData[0].data;
    },
    async getActivityData() {
      const ActivityData = await getActivityData({
        type: 1,
        curPage: 1,
        pageSize: 2,
      });
      this.ActivityData = ActivityData.data.retData[0].data;
    },
    async getPolicyList() {
      const hotPolicyList = await indexGetPolicyByType({ type: "heat" });
      this.hotPolicyList = hotPolicyList.data.retData;
    },

    async shopEvent(foolerId) {
      this.shopFloorId = foolerId;
      this.shopList = [];
      let res;
      if (foolerId == 1) {
        res = await hotShopList({
          page: 1,
          rows: 10,
        });
        this.shopList = res.data.rows[0].goods;
      } else if (foolerId == 2) {
        res = await brainList({
          page: 1,
          rows: 10,
          sort: "updatetime",
          order: "desc",
          search_EQ_examineStatus: "审核通过",
        });
        this.shopList = res.data.rows;
      }
    },

    shopOpenEvent(item) {
      if (this.shopFloorId == 1) {
        this.$router.push({
          path: `/cydn/retail/commodity?goodsId=${item.id}&shopId=${item.decoraShopId}`,
        });
      } else if (this.shopFloorId == 2) {
        this.$router.push({
          path: `/cydn/retail/shop?shopId=${item.decoraShopId}`,
        });
      }
    },

    routerPath(path) {
      this.$router.push({
        path: path,
      });
    },
    toActiveDetail(id) {
      this.$router.push({
        path: "/cydn/activity/detail",
        query: {
          id,
        },
      });
    },
    toMessageDetail(item) {
      console.log(item, "333");
      this.$router.push({
        path: "/cydn/information/detali",
        query: {
          id: item.id,
          title: item.title,
          navTitle: this.navTitle,
        },
      });
    },
    moreActive(text, type) {
      this.$router.push({
        path: "/cydn/activity/list",
        query: {
          text,
          type,
        },
      });
    },

    tap(id, index) {
      this.tapId = id;
      // 切换 tab 时修改数据
      mapData.forEach(item => item.selected = false);
      mapData[index].selected = true;
      this.initMap(mapData);
    },

    initMap(data = []) {
      const dom = this.$refs.map;
      const myChart = this.$echarts.init(dom);
      this.$echarts.registerMap("world", world);
      const option = {
        tooltip: {
          trigger: "item",
          geo: {
            left: 500,
            // top: 'auto' ,
            // right: 'auto' ,
            // bottom: 'auto' ,
          },
          formatter: function (params) {
            // 没有数据时不显示
            if (!params.data) return;
            const {
              marker,
              data: { ranking, name, value },
            } = params;
            return `${marker}国家名称: ${name} <br /> 贸易量: ${value} <br /> 排名: ${ranking}`;
          },
          backgroundColor: "#0E67FF",
          borderWidth: 0,
          color: "#000",
          fontWeight: 600,
          fontFamily: "Microsoft YaHei",
          fontSize: "12",
          extraCssText:
            "box-shadow: 0px 0px 12px 0px rgba(12, 49, 183, 0.16);border-radius: 4px;",
        },
        series: [
          {
            name: "世界地图",
            type: "map",
            map: "world",
            top: 25,
            bottom: 25,
            data,
            // 自定义名称映射
            nameMap,
            label: {
              color: "#fff",
            },
            itemStyle: {
              borderWidth: 0, // 边际线大小
              borderColor: "", // 边界线颜色
              areaColor: "#9ABFFE",
            },
            emphasis: {
              label: {
                show: false,
                color: "#fff",
              },
              itemStyle: { areaColor: "#9ABFFE" },
            },
            select: {
              label: {
                show: false,
                color: "#fff",
              },
              itemStyle: {
                areaColor: "#0E67FF",
              },
            },
          },
        ],
      };
      myChart.setOption(option);

      // 添加点击事件
      myChart.on("click", ({ name }) => {
        const index = mapData.findIndex((item) => item.name === name);
        // 没有数据的直接退出
        if (index === -1) return;
        this.countryOrArea = name;
        this.$emit("changeCountryOrArea", name);
      });
    },

    handlePolicyDetail(item) {
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: item.id,
        },
      });
    },
    getExpertsList() {
      this.loading = true;
      api
        .getExpertsList({
          curPage: 1,
          pageSize: 6,
        })
        .then((res) => {
          if (res.status == 200) {
            this.expertsList = res.data.retData[0].data;
            for (let i = 0; i < this.expertsList.length; i++) {
              if (this.expertsList[i].goodAtField) {
                this.expertsList[i].goodAtFieldArr =
                  this.expertsList[i].goodAtField.split(",");
              } else {
                this.expertsList[i].goodAtFieldArr = [];
              }
            }
          }
        });
    },

    toExpertsDetail(item) {
      this.$router.push({
        path: "/cydn/cyzj/particulars",
        query: { id: item.id },
      });
    },
    async getPolicyDeclaration() {
      const data = {
        page: 1,
        rows: 4,
      };
      const [err, res] = await to(getKeyWordSearch(data));

      if (err) console.log(err);

      if (res?.status === 200) {
        const { queryPolicyListRes } = res.data.retData;
        this.policyDeclarationList =
          queryPolicyListRes &&
          queryPolicyListRes.map((item) => {
            return {
              ...item,
              policyThemes: item.policyThemes.split(","),
            };
          });
      }
    },
    async handleDeclareImmediately(item) {
      const isAuth = await authorization.call(this);
      if (isAuth) {
        getDeclare({policyId:item.id})
        .then(res => {
          if(res.data.success){
            this.$message.error('您已申请过该政策，看看别的吧！');
          }else{
            this.$router.push({
              path: "/cydn/declareImmediately",
              query: {
                id: item.id,
                title:item.title,
              }
            });
          }
          
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inner {
  width: 1440px;
  margin: 0 auto;
}
.title_box {
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    span {
      font-size: 30px;
      font-weight: bold;
      color: #0d0d0d;
      line-height: 42px;
      margin: 0px 25px;
      &.white {
        color: #fff;
      }
    }
    img {
      width: 26px;
      height: 20px;
      vertical-align: middle;
      margin-top: 2px;
    }
  }
  .subTitle {
    font-size: 16px;
    font-weight: 400;
    color: #0d0d0d;
    line-height: 22px;
    margin-top: 10px;
    text-align: center;

    margin-bottom: 40px;
    &.white {
      color: #fff;
    }
    span {
      color: #ffb900;
      cursor: pointer;
    }
  }
}
.title {
  height: 50px;
  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    vertical-align: middle;
  }
  span {
    font-size: 24px;
    color: #0d0d0d;
    line-height: 50px;
    font-weight: bold;
  }
  em {
    font-size: 14px;
    color: #0e67ff;
    float: right;
    line-height: 50px;
    font-style: normal;
    cursor: pointer;
  }
}
.bannerBox {
  width: 100%;
  ::v-deep .el-carousel__container {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.coreServices {
  width: 100%;
  height: 631px;
  overflow: hidden;
  background: linear-gradient(180deg, #182045 0%, #152f68 100%);
  ul {
    overflow: hidden;
    li {
      width: 345px;
      height: 380px;
      background: linear-gradient(180deg, #e4e7ed 0%, #fcfdfe 100%);
      box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
      border-radius: 16px;
      border: 1px solid #ffffff;
      margin-right: 20px;
      padding: 0 30px;
      box-sizing: border-box;
      float: left;
      text-align: center;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 120px;
        height: 120px;
        border-radius: 100%;
        margin-top: 32px;
      }
      h6 {
        font-size: 22px;
        color: #0d0d0d;

        margin: 30px 0 20px;
      }
      p {
        font-size: 14px;
        color: #595959;
        line-height: 23px;
        text-align: left;
      }
    }
  }
}
.message {
  height: 120px;
  background: url("../../static/images/message_bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .left {
    width: 1100px;
    float: left;
    h3 {
      font-size: 18px;
      font-weight: 400;
      color: #0d0d0d;
      line-height: 120px;
      height: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
  .right {
    width: 144px;
    height: 40px;
    background: #0e67ff;
    border-radius: 8px;
    margin-top: 40px;
    float: right;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    line-height: 44px;
    cursor: pointer;
  }
}
.foreignTrade {
  width: 100%;
  height: 766px;
  box-sizing: border-box;
  background: url("../../static/images/first/bg2.png") no-repeat;
  background-size: 100% 100%;
  .foreignTrade_inner {
    .tapBox {
      width: 100%;
      margin-top: 40px;
      .tapBox_title {
        width: 100%;
        height: 64px;
        background: linear-gradient(180deg, #e4e7ed 0%, #fcfdfe 100%);
        box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
        border-radius: 16px;
        border: 1px solid #ffffff;
        line-height: 64px;
        box-sizing: border-box;
        display: flex;
        li {
          width: 25%;
          height: 100%;
          text-align: center;
          span {
            font-size: 16px;
            font-weight: 500;
            color: #0d0d0d;
            padding: 13px 48px;
            box-sizing: border-box;
            border-radius: 10px;
            cursor: pointer;
          }
          .spanActive {
            background: #0e67ff;
            color: #ffffff;
            font-weight:bold;
          }
        }
      }
      .tapBox_container {
        margin-top: 27px;
        width: 100%;
        height: 434px;
        position: relative;
        .tapBox_container_left {
          width: 1280px;
          height: 434px;
          background: linear-gradient(180deg, #e4e7ed 0%, #fcfdfe 100%);
          box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
          border-radius: 16px;
          border: 1px solid #ffffff;
          padding: 30px 70px 40px;
          box-sizing: border-box;
          display: flex;
          .tapBox_container_leftBox {
            width: 185px;
            padding-top: 5px;
            box-sizing: border-box;
            li {
              margin-top: 25px;
              p {
                font-size: 14px;
                font-weight: 400;
                color: #595959;
                line-height: 22px;
              }
              div {
                font-size: 14px;
                color: #595959;
                line-height: 22px;
                margin-top: 8px;
                span {
                  font-size: 20px;
                  font-weight: 500;
                  color: #0d0d0d;
                  margin-right: 6px;
                  font-weight: bold;
                }
              }
            }
          }
          .tapBox_container_echartsBox {
            width: 782px;
            height: 100%;
            .map-view {
              width: 100%;
              height: 100%;
            }
          }
        }
        .tapBox_container_right {
          position: absolute;
          top: 0px;
          right: -40px;
          width: 423px;
          height: 447px;
          background: url("../../static/images/first/bg2_right.png") no-repeat;
          background-size: 100% 100%;
          padding: 60px 60px 0px 100px;
          box-sizing: border-box;
          .right_data {
            h4 {
              width: 100%;
              display: flex;
              align-items: center;
              img {
                width: 48px;
                height: 45px;
                margin-right: 20px;
              }
              span {
                font-size: 22px;
                font-weight: 500;
                color: #0d0d0d;
              }
            }
            ul {
              margin-top: 20px;
              padding-left: 68px;
              box-sizing: border-box;
              width: 100%;
              li {
                width: 100%;
                margin-bottom: 20px;
                p {
                  font-size: 14px;
                  font-weight: 400;
                  color: #595959;
                  line-height: 22px;
                }
                div {
                  margin-top: 10px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #0d0d0d;
                  line-height: 22px;
                  span {
                    font-size: 32px;
                    font-weight: 500;
                    color: #0e67ff;
                    line-height: 22px;
                    font-weight: bold;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.distribution {
  width: 100%;
  height: 724px;
  box-sizing: border-box;
  background: url("../../static/images/first/bg3.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .container {
    margin-top: 50px;
    .container_left {
      float: left;
      width: 240px;
      height: auto;
      padding-left: 30px;
      background: linear-gradient(180deg, #e4e7ed 0%, #fcfdfe 100%);
      border-radius: 16px;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      margin-right: 20px;
      max-height: 460px;
      li {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 30px 0px;
        box-sizing: border-box;
        cursor: pointer;
        img {
          width: 48px;
          height: 45px;
          margin-right: 20px;
        }
        span {
          font-size: 22px;
          font-weight: 500;
          color: #0d0d0d;
          line-height: 30px;
          font-weight: bold;
        }
        .spanActive1 {
          color: #0e67ff !important;
        }
      }
    }
    .container_right {
      float: left;
      width: 1180px;
      li {
        float: left;
        width: 220px;
        height: 220px;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          transition: all 0.4s;
        }
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
      }
      li:nth-child(5n) {
        margin-right: 0px;
      }
    }
  }
}
.zcsb {
  overflow: hidden;
  height: 733px;
  background: url("../../static/images/zcsb.png") no-repeat;
  background-size: 100% 100%;
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 709px;
      height: 234px;
      cursor: pointer;
      background: linear-gradient(
        180deg,
        #e4e7ed 0%,
        #fbfcfe 53%,
        #fcfdfe 100%
      );
      box-shadow: 0px 8px 20px 12px rgba(31, 38, 50, 0.04);
      border-radius: 16px;
      border: 1px solid #ffffff;
      margin-right: 18px;
      margin-bottom: 20px;
      position: relative;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .top {
        height: 169px;
        padding: 25px 30px;
        box-sizing: border-box;
        h5 {
          font-size: 18px;
          color: #0d0d0d;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: normal;
        }
        div {
          font-size: 14px;
          color: #929292;
          margin: 22px 0;
          h6 {
            float: right;
            span {
              background: rgba(14, 103, 255, 0.08);
              border-radius: 4px;
              padding: 5px 10px;
              font-size: 14px;
              font-weight: 400;
              color: #0e67ff;
              margin-left: 10px;
            }
          }
        }
        p {
          font-size: 14px;
          color: #595959;
          line-height: 23px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .bottom {
        height: 64px;
        padding: 0 30px;
        border-top: 1px solid rgba(13, 13, 13, 0.08);
        span {
          font-size: 12px;

          color: #929292;
          line-height: 64px;
          margin-right: 35px;
          i {
          }
        }
        div {
          float: right;
          width: 120px;
          height: 40px;
          background: #c0c0c0;
          border-radius: 8px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          color: #ffffff;

          margin-top: 12px;
          &.active {
            background: #0e67ff;
            cursor: pointer;
          }
        }
      }
      .status {
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 32px;
        background: rgba(192, 192, 192, 0.68);
        border-radius: 0px 16px 0px 16px;
        opacity: 0.68;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        &.active {
          background: #ffb71f;
        }
      }
    }
  }
}
.hyzj {
  width: 100%;
  height: 840px;
  background: linear-gradient(180deg, #2d374a 0%, #202836 100%);
  overflow: hidden;
  ul {
    overflow: hidden;
    li {
      width: 466px;
      height: 281px;
      float: left;
      background: linear-gradient(180deg, #232d3f 0%, #404e67 100%);
      border-radius: 16px;
      border: 1px solid #516079;
      margin-right: 20px;
      margin-bottom: 20px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        .bottom {
          background: #ffb71f;
          color: #fff;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }

      .top {
        height: 232px;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;

        img {
          width: 144px;
          height: 192px;
          margin-right: 20px;
          border-radius: 12px;
          float: left;
        }
        div {
          float: left;
          width: 250px;
          h6 {
            color: #ffffff;
            font-size: 18px;
            line-height: 45px;
          }
          p {
            font-size: 12px;
            color: rgba(240, 240, 240, 0.8);
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          h5 {
            margin-top: 8px;
            height: 50px;
            overflow: hidden;
          }
          span {
            background: rgba(255, 183, 31, 0.12);
            font-size: 12px;
            margin-right: 10px;
            border-radius: 4px;
            color: #ffb71f;
            padding: 3px 8px;
            margin-bottom: 10px;
            display: inline-block;
            font-weight: normal;
          }
        }
      }
      .bottom {
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #ffb71f;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 16px;
        border-radius: 0 0 16px 16px;
      }
    }
  }
}
.zc {
  padding: 80px 0 60px;
  background: linear-gradient(180deg, #e4ebf8 0%, #fcfdfe 100%);
  .inner {
    overflow: hidden;
  }
  .left {
    padding: 20px 25px;
    width: 466px;
    height: 815px;
    box-sizing: border-box;
    border-radius: 16px;
    background: linear-gradient(180deg, #e4e7ed 0%, #fcfdfe 100%);
    box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);

    border: 1px solid #ffffff;
    margin-right: 50px;
    float: left;
    ul {
      li {
        border-bottom: 1px solid rgba(13, 13, 13, 0.08);
        height: 98px;
        padding-top: 20px;
        box-sizing: border-box;

        p {
          font-size: 18px;
          line-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: pointer;
        }

        &:hover {
          color: #0e67ff;
        }
      }
    }
  }
  .right {
    float: left;
    padding-top: 20px;
    .zx {
      overflow: hidden;
      margin: 30px 0 50px;
      width: 922px;
      li {
        width: 449px;
        height: 144px;
        background: linear-gradient(178deg, #e4e7ed 0%, #fcfdfe 100%);

        border-radius: 16px;
        border: 1px solid #ffffff;
        display: flex;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        &:nth-child(2n) {
          margin-right: 0;
        }
        img {
          width: 144px;
          height: 144px;
          border-radius: 12px 0px 0px 12px;
        }
        div {
          width: 307px;
          height: 100%;
          padding: 20px 10px 0px 20px;
          box-sizing: border-box;
          h6 {
            width: 100%;
            font-size: 18px;
            font-weight: 500;
            color: #0d0d0d;
            line-height: 25px;
          }
          p {
            margin-top: 12px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            color: #595959;
            line-height: 22px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        &:hover {
          h6 {
            color: #0e67ff;
          }
        }
      }
    }

    .hd {
      overflow: hidden;
      margin-top: 30px;
      li {
        width: 451px;
        height: 254px;
        border-radius: 10px;
        margin-right: 20px;
        background-size: 100% 100%;
        float: left;
        cursor: pointer;
        &:nth-child(2n) {
          margin-right: 0;
        }
        h6 {
          font-size: 32px;
          color: #0d0d0d;
          margin: 46px 0 56px 24px;
        }
        span {
          background: #0d0d0d;
          border-radius: 10px;
          font-size: 14px;
          color: #ffffff;
          padding: 5px 8px;
          margin-left: 56px;
        }
      }
    }
  }
}
</style>
