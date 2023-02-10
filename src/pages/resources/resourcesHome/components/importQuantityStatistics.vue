<template>
  <container
    title="本国从各国家/地区进口比例统计(交易数量)"
    subtitle="2018.12-2021.12"
  >
    <div class="echarts-wrap" v-show="!noData">
      <div class="echarts" ref="echarts"></div>
      <div class="circle">
        <div class="echarts-title-zh">交易数量占比</div>
        <div class="echarts-title-en">Seven Continents</div>
      </div>
    </div>
    <div class="no-data" v-show="noData">暂无数据</div>
  </container>
</template>

<script>
import api from "@/api/resources";
import container from "../../components/common/container.vue";
import { nameMap } from "../config";
let myChart = null;
function transformData(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join(" ");
}
export default {
  props: {
    countryOrArea: {
      type: String,
      default: "",
    },
  },
  components: {
    container,
  },
  data() {
    return {
      // 是否没有数据
      noData: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await api.getGlobalCountryAreaAnalysisDealCountData({
        countriesCode: this.countryOrArea,
      });
      const { success, retData } = res.data;
      if (success) {
        this.noData = !retData.length;
        this.noData = retData.every((item) => item.number === null);
        if (this.noData) return;
        const data = [];
        retData.map((item) => {
          data.push({
            name:
              nameMap[transformData(item.countryOrArea)] ?? item.countryOrArea,
            value: item.number,
          });
        });
        this.initEcharts(data);
      }
    },
    // 初始化echarts
    initEcharts(data = []) {
      const dom = this.$refs.echarts;
      if (myChart) myChart.dispose();
      myChart = this.$echarts.init(dom);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function({ name, value, percent }) {
            return `<div class='tip'>
              <div class='tip-title'>${name}</div>
              <div class='tip-item'>次数<div class='value'>${value}</div></div>
              <div class='tip-item'>占比<div class='value'>${percent}%</div></div>
            </div>`;
          },
          backgroundColor: "transparent",
          borderWidth: 0,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(6,86,221,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(6,86,221,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(87,223,179,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(87,223,179,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(223,72,106,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(223,72,106,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(164,33,176,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(164,33,176,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(254,237,69,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(254,237,69,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(156,221,6,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(156,221,6,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(236,132,38,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(236,132,38,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(244,63,63,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(244,63,63,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(156,165,168,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(156,165,168,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(72,20,153,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(72,20,153,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(54,173,255,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(54,173,255,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            ],
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  watch: {
    countryOrArea: {
      handler(val, old) {
        if (val !== old) this.getData();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-wrap {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 398px;
  background: #f8f8f8;
  .echarts {
    width: 550px;
    height: 398px;
  }
  .circle {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 185px;
    height: 185px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 10;
    .echarts-title-zh {
      margin: 13px 0 2px;
      font-size: 22px;
      font-weight: 500;
      color: #0d0d0d;
      line-height: 30px;
    }
    .echarts-title-en {
      font-size: 12px;
      font-weight: 400;
      color: #0d0d0d;
      line-height: 17px;
    }
  }
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 398px;
  background: #f8f8f8;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #0a88ff;
  &::before {
    display: block;
    content: "";
    width: 300px;
    height: 300px;
    background: url("~@/static/images/empty.png") no-repeat center center;
    background-size: cover;
    margin-bottom: 15px;
  }
}
::v-deep .tip {
  position: relative;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 9px 3px rgba(31, 38, 50, 0.07);
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: -14px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 14px solid rgba(255, 255, 255, 1);
    transform: translateY(-50%);
  }
  .tip-title {
    font-size: 14px;
    font-weight: 600;
    color: #0d0d0d;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .tip-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #595959;
    line-height: 17px;
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    .value {
      margin-left: 5px;
      font-size: 14px;
      color: #0d0d0d;
      line-height: 20px;
    }
  }
}
</style>
