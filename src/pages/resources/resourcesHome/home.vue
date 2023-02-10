<template>
  <div class="home">
    <div class="header-wrap">
      <div class="search-wrap">
        <div class="title">商品品类/HS编码</div>
        <el-select v-model="commodityCategory" class="select-wrap">
          <el-option
            label="其他阀门/HS84818040"
            value="其他阀门/HS84818040"
          ></el-option>
        </el-select>
        <el-button type="primary">查 询 </el-button>
      </div>
      <EMap @changeCountryOrArea="handleChangeCountryOrArea"></EMap>
    </div>

    <el-tabs class="tabs">
      <el-tab-pane label="本国进口贸易统计">
        <div class="tab-content">
          <div class="left">
            <!-- 本国从各国家/地区进口比例统计（交易次数） -->
            <importAmountStatistics
              :countryOrArea="countryOrArea"
            ></importAmountStatistics>
          </div>
          <div class="right">
            <!-- 本国从各国家/地区进口比例统计(交易数量) -->
            <importQuantityStatistics
              class="import-quantity-statistics"
              :countryOrArea="countryOrArea"
            ></importQuantityStatistics>
          </div>
          <!-- 本国从各国家/地区进口数据统计 -->
          <importDataStatistics
            :countryOrArea="countryOrArea"
          ></importDataStatistics>
        </div>
      </el-tab-pane>
      <el-tab-pane label="进口贸易趋势分析">
        <div class="tab-content">
          <!-- 进口数据市场趋势分析 -->
          <importStatisticsEconomies
            class="import-statistics-economies"
            :countryOrArea="countryOrArea"
          ></importStatisticsEconomies
          ><!-- 进口数据统计 -->
          <importStatisticsContinent
            :countryOrArea="countryOrArea"
          ></importStatisticsContinent>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主要贸易伙伴">
        <div class="tab-content">
          <majorTradingPartners
            :countryOrArea="countryOrArea"
          ></majorTradingPartners>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import EMap from "./components/map.vue";
import importAmountStatistics from "./components/importAmountStatistics.vue";
import importQuantityStatistics from "./components/importQuantityStatistics.vue";
import importDataStatistics from "./components/importDataStatistics.vue";
import importStatisticsEconomies from "./components/importStatisticsEconomies.vue";
import importStatisticsContinent from "./components/importStatisticsContinent.vue";
import majorTradingPartners from "./components/majorTradingPartners.vue";
export default {
  name: "home",
  components: {
    EMap,
    importAmountStatistics,
    importQuantityStatistics,
    importDataStatistics,
    importStatisticsEconomies,
    importStatisticsContinent,
    majorTradingPartners,
  },
  data() {
    return {
      // 商品品类
      commodityCategory: "其他阀门/HS84818040",
      countryOrArea: "秘鲁",
    };
  },
  methods: {
    handleChangeCountryOrArea(countryOrArea) {
      this.countryOrArea = countryOrArea;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  margin-top: 18px;
  box-sizing: border-box;
  background: #ecf3fe;
  .header-wrap {
    height: 578px;
    background: #FFFFFF;
    box-shadow: 0px 2px 40px 5px rgba(230,230,230,0.3);
    border: 1px solid #ffffff;
    .search-wrap {
      display: flex;
      align-items: center;
      margin: 0px 40px;
      height: 64px;
      border-bottom: 1px solid rgba(13, 13, 13, 0.08);
      .title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #0D0D0D;
        letter-spacing: 0;
        font-weight: 400;
      }
      .select-wrap {
        margin: 0 19px 0 17px;
      }
      ::v-deep .el-input__inner {
        width: 260px;
        height: 32px;
        color: #0d0d0d;
        border-radius: 0;
        border: 1px solid rgba(13, 13, 13, 0.16);
        line-height: 32px;
        background: #ffffff;
      }
      ::v-deep .el-input__suffix {
        display: flex;
        align-items: center;
      }
      ::v-deep .el-button--primary {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 32px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        background: #0e67ff;
        border: none;
      }
      ::v-deep .el-button{
        border-radius: 0;
      }
    }
  }

  .tabs {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 40px 5px rgba(230,230,230,0.3);
    margin: 20px 0 0;
    ::v-deep .el-tabs__nav-wrap.is-top {
      height: 58px;
      margin: 0px 40px;
      border-bottom: 1px solid rgba(13, 13, 13, 0.08);
      box-sizing: border-box;
    }
    ::v-deep .el-tabs__nav.is-top {
      width: 416px;
      float: none;
      margin: 0 auto;
    }
    ::v-deep .el-tabs__item.is-top {
      width: 152px;
      height: 58px;
      line-height: 58px;
      padding: 0 40px 0 0;
      font-family: PingFangSC-Medium;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #0d0d0d;
      background: transparent;
      box-sizing: border-box;
      &.is-active {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #0E67FF;
        letter-spacing: 0;
        font-weight: 600;
      }
      &:last-child {
        width: 112px;
        padding: 0;
      }
    }
    ::v-deep .el-tabs__active-bar.is-top {
      height: 4px;
      background-color: #0e67ff;
    }
    ::v-deep .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #E4E7ED;
        z-index: 1;
    }
    .tab-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 30px 40px;
      width: 100%;
      box-sizing: border-box;
      .left,
      .right {
        width: 550px;
      }
    }
  }
  .import-statistics-economies {
    margin-bottom: 34px;
  }
}
</style>
