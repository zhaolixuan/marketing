<template>
  <div class="container">
    <div class="left">
      <div class="tabs-wrap">
        <el-tabs v-model="nodeType">
          <el-tab-pane label="验证节点" name="verificationNode">
            <el-carousel>
              <el-carousel-item
                v-for="item in verificationNode"
                :key="item.verificationNode"
              >
                <div class="content-wrap">
                  <div class="title">{{ item.verificationNode }}</div>
                  <div class="content">
                    <div class="item">
                      <div class="name">监测数量</div>
                      <div class="value">{{ item.monitoringQuantity }}</div>
                    </div>
                    <div class="item">
                      <div class="name">可行等级</div>
                      <div class="value">{{ item.credibilityLevel }}</div>
                    </div>
                    <div class="item">
                      <div class="name">监测频率</div>
                      <div class="value">{{ item.monitoringFrequency }}</div>
                    </div>
                    <div class="item">
                      <div class="name">白名单</div>
                      <div class="value">{{ item.whiteList }}</div>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="存证节点" name="certificateStorageNode">
            <el-carousel>
              <el-carousel-item
                v-for="item in certificateStorageNode"
                :key="item.certificateStorageNode"
              >
                <div class="content-wrap">
                  <div class="title">{{ item.certificateStorageNode }}</div>
                  <div class="content">
                    <div class="item">
                      <div class="name">区块高度</div>
                      <div class="value">{{ item.blockHeight }}</div>
                    </div>
                    <div class="item">
                      <div class="name">可信排名</div>
                      <div class="value">{{ item.trustedRanking }}</div>
                    </div>
                    <div class="item">
                      <div class="name">效率排名</div>
                      <div class="value">{{ item.efficiencyRanking }}</div>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <el-carousel class="content">
        <el-carousel-item>
          <div
            class="item"
            v-for="item in situationPerception"
            :key="item.name"
          >
            <div class="value-wrap">
              <div class="value">{{ item.value }}</div>
              <div class="company">{{ item.company }}</div>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div
            class="item"
            v-for="item in situationPerception"
            :key="item.name"
          >
            <div class="value-wrap">
              <div class="value">{{ item.value }}</div>
              <div class="company">{{ item.company }}</div>
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="echarts-wrap">
        <div class="title-wrap">
          <div class="icon"></div>
          <div class="title">重要指数</div>
        </div>

        <div class="select-wrap">
          <div class="select-title">指数维度：</div>
          <el-select
            class="select"
            v-model="exponentialDimension"
            @change="init"
          >
            <el-option
              v-for="i in exponentialDimensionList"
              :key="i.label"
              :label="i.label"
              :value="i.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="echarts" ref="echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  situationPerception,
  exponentialDimensionList,
  exponentialDimensionData,
} from "./config";
export default {
  data() {
    return {
      situationPerception: situationPerception,
      exponentialDimensionList: exponentialDimensionList,
      nodeType: "verificationNode",
      exponentialDimension: "原材料进出口指数",
      verificationNode: [
        {
          verificationNode: "验证节点01",
          monitoringQuantity: 0,
          credibilityLevel: "低",
          monitoringFrequency: "104次/秒",
          whiteList: 483,
        },
        {
          verificationNode: "验证节点02",
          monitoringQuantity: 2,
          credibilityLevel: "低",
          monitoringFrequency: "89次/秒",
          whiteList: 235,
        },
        {
          verificationNode: "验证节点03",
          monitoringQuantity: 5,
          credibilityLevel: "中",
          monitoringFrequency: "156次/秒",
          whiteList: 168,
        },
        {
          verificationNode: "验证节点04",
          monitoringQuantity: 3,
          credibilityLevel: "低",
          monitoringFrequency: "35次/秒",
          whiteList: 89,
        },
        {
          verificationNode: "验证节点05",
          monitoringQuantity: 5,
          credibilityLevel: "高",
          monitoringFrequency: "168次/秒",
          whiteList: 565,
        },
      ],
      certificateStorageNode: [
        {
          certificateStorageNode: "存证节点01",
          blockHeight: 844155,
          trustedRanking: 3,
          efficiencyRanking: 2,
        },
        {
          certificateStorageNode: "存证节点02",
          blockHeight: 953168,
          trustedRanking: 2,
          efficiencyRanking: 1,
        },
        {
          certificateStorageNode: "存证节点03",
          blockHeight: 758534,
          trustedRanking: 4,
          efficiencyRanking: 3,
        },
        {
          certificateStorageNode: "存证节点04",
          blockHeight: 648367,
          trustedRanking: 5,
          efficiencyRanking: 4,
        },
        {
          certificateStorageNode: "存证节点05",
          blockHeight: 538954,
          trustedRanking: 1,
          efficiencyRanking: 5,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const { legend, xAxis, data } =
        exponentialDimensionData[this.exponentialDimension];
      const dom = this.$refs["echarts"];
      const myChart = this.$echarts.init(dom);
      const option = {
        title: {},
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legend,
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "8%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: legend[0],
            type: "line",
            stack: "Total",
            color: "#02BDFF",
            data: data[0],
          },
          {
            name: legend[1],
            type: "line",
            stack: "Total",
            color: "#FFAC02",
            data: data[1],
          },
        ],
      };
      myChart.setOption(option);
      let timer = setInterval(() => update(), 5000);
      myChart.on("mouseover", function (parmas) {
        clearInterval(timer);
      });
      myChart.on("mouseout", function (parmas) {
        timer = setInterval(() => update(), 5000);
      });
      function update() {
        let options = myChart.getOption();
        myChart.clear();
        myChart.setOption(options);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .left {
    position: relative;
    width: 720px;
    height: 545px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background-image: url("../../../static/images/map.png");
    background-position: 10px 3px;
    background-size: 561px 542px;
    background-repeat: no-repeat;
    box-sizing: border-box;
    .tabs-wrap {
      position: absolute;
      right: 10px;
      bottom: 10px;
      height: 202px;
      ::v-deep .el-tabs__active-bar,
      ::v-deep .el-tabs__nav-wrap::after {
        display: none;
      }
      ::v-deep .el-tabs__nav-wrap.is-scrollable {
        padding: 0;
        box-sizing: border-box;
      }
      ::v-deep .el-tabs__item.is-top {
        width: 97px;
        height: 26px;
        padding: 0;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 26px;
        background: #ffffff;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
        &:nth-child(2) {
          border-right: none;
        }
      }
      ::v-deep .el-tabs__header {
        margin: 0;
      }
      ::v-deep .el-tabs__item.is-active {
        color: #fff;
        background: #0084ff;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .content-wrap {
        height: 176px;
        padding: 16px 14px;
        background: rgba(15, 146, 255, 0.05);
        box-sizing: border-box;
        .title {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          padding: 5px 0;
          color: #0084ff;
          line-height: 25px;
          border-bottom: 1px solid rgba(0, 132, 255, 0.32);
        }
        .content {
          margin-top: 11px;
          .item {
            display: flex;
            align-items: center;
            & + .item {
              margin-top: 7px;
            }
            .name {
              margin-right: 22px;
              width: 56px;
              height: 20px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(0, 0, 0, 0.39);
              line-height: 20px;
            }
            .value {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 500;
              color: rgba(0, 0, 0, 0.79);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 444px;
    height: 545px;
    .content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-shrink: 0;
      flex-grow: 0;
      width: 100%;
      padding: 16px 10px;
      height: 185px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      ::v-deep .el-carousel__container {
        width: 100%;
        height: 100%;
      }
      ::v-deep .el-carousel__item.is-active.is-animating {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-shrink: 0;
        flex-grow: 0;
        width: 100%;
        height: 100%;
      }
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 137px;
        height: 73px;
        background: rgba(15, 146, 255, 0.05);
        box-sizing: border-box;
        .name {
          text-align: center;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: rgba(0, 0, 0, 0.34);
          line-height: 20px;
        }
        .value-wrap {
          margin-bottom: 2px;
          .value {
            display: inline-block;
            font-size: 26px;
            font-family: "Microsoft YaHei";
            font-weight: normal;
            color: #0f92ff;
            line-height: 31px;
          }
          .company {
            margin-left: 5px;
            display: inline-block;
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #0f92ff;
            line-height: 17px;
          }
        }
      }
    }
    .echarts-wrap {
      width: 444px;
      height: 350px;
      line-height: 32px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      .title-wrap {
        display: flex;
        align-items: center;
        margin: 10px 0 0 10px;
        .icon {
          margin-right: 3px;
          width: 20px;
          height: 20px;
          background-image: url("../../../static/images/computer.png");
          background-size: cover;
        }
        .title {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 600;
          color: #333333;
          line-height: 25px;
        }
      }

      .select-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 8px;
        margin-right: 10px;
        .select-title {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          line-height: 20px;
        }
        .select {
          width: 178px;
          height: 30px;
        }
      }
      .echarts {
        margin-top: 10px;
        width: 444px;
        height: 265px;
      }
    }
  }
}
</style>
