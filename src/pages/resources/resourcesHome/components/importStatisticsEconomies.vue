<template>
  <container title="进口数据市场趋势分析" subtitle="2018.12-2021.12">
    <el-select class="select" v-model="type" @change="handleChange">
      <el-option label="交易次数" value="transactionNumber"></el-option>
      <el-option label="交易数量" value="number"></el-option>
      <el-option label="交易重量" value="weight"></el-option>
    </el-select>
    <div class="echarts-wrap" v-show="!noData">
      <div class="echarts" ref="echarts"></div>
    </div>
    <div class="no-data" v-show="noData">暂无数据</div>
  </container>
</template>

<script>
import api from "@/api/resources";
import container from "../../components/common/container.vue";
let myChart = null;
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
      type: "transactionNumber",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      const { countryOrArea: countriesCode, type } = this;
      const res = await api.getGlobalMarketTrendAnalysisTrendData({
        countriesCode,
        type,
      });
      const { success, retData } = res.data;
      if (success) {
        this.noData = retData.number.every((item) => item === null);
        if (this.noData) return;
        this.initEcharts(retData);
      }
    },
    // 初始化echarts
    initEcharts({ date, number }) {
      const dom = this.$refs.echarts;
      if (myChart) myChart.dispose();
      myChart = this.$echarts.init(dom);
      const option = {
        grid: {
          top: "20%",
          left: "8%",
          right: "5%",
          bottom: "63px",
        },
        tooltip: {
          trigger: "axis",
          formatter: function(data) {
            const { name, value } = data[0];
            return `<div class='tip'>
              <div class='tip-title'>${name}</div>
              <div class='tip-item'>次数<div class='value'>${value}</div></div>
            </div>`;
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(255,255,255,1)",
          borderWidth: 0,
          padding:10,
          borderRadius:0
        },
        legend: {
          data: [""],
          right: "20",
          top: "15",
          color: "#333333",
          fontSize: 14,
          itemGap: 10,
          itemHeight: 5,
          itemWidth: 28,
        },
        xAxis: [
          {
            name: "日期",
            type: "category",
            data: date,
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(13, 13, 13, 0.12)",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#0000006e",
              fontSize: "10",
              rotate: "45",
            },
          },
        ],
        yAxis: [
          {
            name: "",
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "#0000006e",
              fontSize: "10",
            },
            splitArea: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(13, 13, 13, 0.12)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 11,
            data: number,
            label: {
              show: false,
              position: "insideTop",
              color: "#fff",
              fontSize: 12,
            },
            itemStyle: {
              color: 'rgba(14,103,255,1)', // 渐变色
              barBorderRadius: [0, 0, 0, 0], // 圆角
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    handleChange(type) {
      this.getData();
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
.select {
  position: absolute;
  top: 22px;
  right: 40px;
  z-index: 10;
}
::v-deep .el-input__inner {
  width: 260px;
  height: 32px;
  color: #0d0d0d;
  border-radius: 0;
  border: 1px solid rgba(13, 13, 13, 0.16);
}
::v-deep .el-select .el-input.is-focus .el-input__inner {
  border: 1px solid rgba(13, 13, 13, 0.16);
}
::v-deep .el-input__suffix {
  display: flex;
  align-items: center;
}

.echarts-wrap {
  margin-top: 26px;
  width: 1120px;
  height: 398px;
  background: rgba(247,248,250,1);
  .echarts {
    width: 1120px;
    height: 398px;
  }
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 462px;
  font-size: 24px;
  font-family: "Microsoft YaHei";
  font-weight: 600;
  color: #1d4ad4;
}
::v-deep .tip {
  position: relative;
  border-radius: 0;
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: -14px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 14px solid rgba(255,255,255,1);
    transform: translateY(-50%);
  }
  .tip-title {
    font-size: 14px;
    font-weight: 500;
    color: #0d0d0d;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .tip-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(89,89,89,1);
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
