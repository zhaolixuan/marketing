<template>
  <div class="map-wrap">
    <div class="map-view" id="map" ref="map"></div>
    <div class="tip">
      <div class="tip-title">
        当前选中国家：
        <div class="country">{{ this.countryOrArea }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import world from "../world.json";
import { nameMap, mapData, getMapData } from "../config";
export default {
  data() {
    return {
      countryOrArea: "秘鲁",
      map: null
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      this.initMap(getMapData());
    },
    // 初始化地图
    initMap(data = []) {
      const dom = this.$refs.map;
      this.map = this.$echarts.init(dom);
      this.$echarts.registerMap("world", world);
      this.setOption(data);

      // 添加点击事件
      this.map.on("click", ({ name }) => {
        const index = mapData.findIndex((item) => item.name === name);
        // // 没有数据的直接退出
        if (index === -1) return;
        this.countryOrArea = name;
        this.$emit("changeCountryOrArea", name);
        this.setOption(getMapData(name));
      });
    },
    setOption(data){
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            // 没有数据时不显示
            if (!params.data) return;
            const {
              data: { ranking, name, value },
            } = params;
            return `<div class='tooltip'>
              <div class='tooltip-title'>${name}</div>
              <div class='tooltip-item'>贸易量<div class='value'>${value}</div></div>
              <div class='tooltip-item'>排名<div class='value'>${ranking}</div></div>
            </div>`;
          },
          backgroundColor: "transparent",
          borderWidth: 0,
        },
        visualMap: {
          left: 60,
          bottom: 10,
          min: 360,
          max: 20000,
          itemWidth: 10,
          itemHeight: 120,
          hoverLink:true, 
          inRange: {
            color: [
              "rgba(29, 74, 212, 0.4)",
              "rgba(29, 74, 212, 0.45)",
              "rgba(29, 74, 212, 0.5)",
              "rgba(29, 74, 212, 0.55)",
              "rgba(29, 74, 212, 0.6)",
              "rgba(29, 74, 212, 0.65)",
              "rgba(29, 74, 212, 0.7)",
              "rgba(29, 74, 212, 0.75)",
              "rgba(29, 74, 212, 0.8)",
              "rgba(29, 74, 212, 0.85)",
              "rgba(29, 74, 212, 0.9)",
              "rgba(29, 74, 212, 0.95)",
              "rgba(29, 74, 212, 1)",

            ],
          },
          text: ["High", "Low"],
          textGap: 5,
          calculable: false,
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
            },
            emphasis: {
              label: {
                show: false,
                color: "#fff",
              },
              itemStyle: { areaColor: "#eee" },
            },
            select: {
              label: {
                show: false,
                color: "#fff",
              },
              itemStyle: {
                areaColor: "#eee",
              },
            },
          },
        ],
      };
      this.map && this.map.setOption(option);
    }
  },
};
</script>

<style lang="scss" scoped>
.map-wrap {
  position: relative;
  padding: 30px 40px;
  box-sizing: border-box;
}
.map-view {
  width: 100%;
  height: 455px;
  z-index: 1;
}
.tip {
  position: absolute;
  left: 40px;
  bottom: 30px;
  width: 200px;
  height: 237px;
  background: rgba(13, 13, 13, 0.04);
  border-radius: 0;
  .tip-title {
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: 400;
    color: #0d0d0d;
    margin: 0 20px;
    border-bottom: 1px solid rgba(13, 13, 13, 0.08);
    .country {
      display: inline-block;
      font-size: 14px;
      font-weight: 500;
      color: rgba(14,103,255,1);
    }
  }
  &::before,&::after{
    display: inline-block;
    position: absolute;
    font-size: 12px;
    font-weight: 400;
    color: #0d0d0d;
    line-height: 17px;
  }
  &::before {
    content: "20000";
    top: 64px;
    left: 20px;
  }
  &::after {
    content: "360";
    bottom: 14px;
    left: 20px;
  }
}
::v-deep .tooltip {
  position: relative;
  padding: 10px 22px;
  background: #ffff;
  box-shadow: 0px 5px 9px 3px rgba(31, 38, 50, 0.07);
  border-radius: 0;
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
  .tooltip-title {
    font-size: 14px;
    font-weight: 500;
    color: #0d0d0d;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .tooltip-item {
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
