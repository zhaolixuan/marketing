<template>
  <div class="container">
    <div class="left">
      <div class="title">
        <img src="../../../static/images/ss_title.png"/>
        <h3>可信节点排名</h3>
      </div>
      <el-table
        class="table"
        :data="tableData"
        ref="table"
        width="100%"
        height="280"
        :cell-style="cellClass"
        :header-cell-style="headClass"
      >
        <el-table-column label="排名" type="index" align="center" width="50"></el-table-column>

        <el-table-column prop="information" label="可信节点" width="250"></el-table-column>
      </el-table>
    </div>
    <div class="center">
      <div class="title">
        <img src="../../../static/images/ss_title.png"/>
        <h3>错误节点</h3>
      </div>
      <div class="img">
        <img src="../../../static/images/lssj_empty.png" alt />
      </div>
      <div class="word">当前没有数据错误节点</div>
    </div>
    <div class="right">
      <div class="title">
        <img src="../../../static/images/ss_title.png"/>
        <h3>核心数据监测</h3>
      </div>
      <div class="eacharts">
        <div class="one">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>
            <h3>当前节点数</h3>
          </div>
          <div class="num">6</div>
          <div id="myChartTop1" ref="myChartTop1" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
        <div class="one">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>            
            <h3>区块高度</h3>
          </div>
          <div class="num">844155</div>
          <div id="myChartTop2" ref="myChartTop2" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
        <div class="one" style="margin-right:0;">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>
            <h3>平均出块速度</h3>
          </div>
          <div class="num">3.9</div>
          <div id="myChartTop3" ref="myChartTop3" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
        <div class="one" style="margin-right:0;">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>
            <h3>峰值交易数</h3>
          </div>
          <div class="num">4</div>
          <div id="myChartTop4" ref="myChartTop4" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
        <div class="one" style="margin-right:0;">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>
            <h3>当日总成交笔数</h3>
          </div>
          <div class="num">4360</div>
          <div id="myChartTop5" ref="myChartTop5" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
        <div class="one" style="margin-right:0;">
          <div class="one_top">
            <img src="../../../static/images/lssj_icon.png"/>
            <h3>不可逆交易数</h3>
          </div>
          <div class="num">851870</div>
          <div id="myChartTop6" ref="myChartTop6" :style="{ width: '155px', height: '80px',marginTop:'5px' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { time, distributionChannelList, lineData, pieData } from "./config";
export default {
  data() {
    return {
      tableData: [
        {
          information: "125.244.32.231"
        },
        {
          information: "219.122.241.181"
        },
        {
          information: "81.111.240.163"
        },
        {
          information: "83.134.255.48"
        },
        {
          information: "220.255.1.166"
        },
        {
          information: "156.34.215.68"
        },
        {
          information: "125.111.215.154"
        },
        {
          information: "153.125.67.233"
        },
        {
          information: "82.124.36.125"
        },
        {
          information: "189.256.36.176"
        },
      ]
    };
  },
  mounted() {
    this.infinitScroll();
    this.drawLineTop1();
    this.drawLineTop2();
    this.drawLineTop3();
    this.drawLineTop4();
    this.drawLineTop5();
    this.drawLineTop6();



  },
  methods: {
    headClass() {
      return "text-align: center;font-size:14px;font-weight: 400;color: rgba(51, 51, 51, 1);background: rgba(247, 248, 250, 1);";
    },
    //表格居中
    cellClass() {
      return "text-align: center;font-size:14px;";
    },
    infinitScroll() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.table;
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper;
      divData.onmouseover = function() {
        clearInterval(t);
      }; //鼠标移入，停止滚动
      divData.onmouseout = function() {
        start();
      }; //鼠标移出，继续滚动

      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      let t;
      function start() {
        // 数据少于表格高度停止滚动
        if (divData.clientHeight >= divData.scrollHeight) {
          return;
        }
        t = setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 1;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0;
          }
        }, 50);
      }
      start();
    },
    drawLineTop1() {
      var bar_dvOneTop = this.$refs.myChartTop1;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop1 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop1.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [60, 40, 284, 218, 105],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},

            }
          ]
        });
        window.onresize = myChartTop1.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop1.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop1.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop1.getOption();
	        myChartTop1.clear();
	        myChartTop1.setOption(options);
	      }
      }
    },
    drawLineTop2() {
      var bar_dvOneTop = this.$refs.myChartTop2;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop2 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop2.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [40, 230, 134, 218, 135],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},
            }
          ]
        });
        window.onresize = myChartTop2.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop2.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop2.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop2.getOption();
	        myChartTop2.clear();
	        myChartTop2.setOption(options);
	      }
      }
    },
    drawLineTop3() {
      var bar_dvOneTop = this.$refs.myChartTop3;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop3 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop3.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [10, 30, 54, 88, 145],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},
            }
          ]
        });
        window.onresize = myChartTop3.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop3.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop3.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop3.getOption();
	        myChartTop3.clear();
	        myChartTop3.setOption(options);
	      }
      }
    },
    drawLineTop4() {
      var bar_dvOneTop = this.$refs.myChartTop4;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop4 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop4.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [150, 230, 224, 218, 135],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},
            }
          ]
        });
        window.onresize = myChartTop4.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop4.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop4.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop4.getOption();
	        myChartTop4.clear();
	        myChartTop4.setOption(options);
	      }
      }
    },
    drawLineTop5() {
      var bar_dvOneTop = this.$refs.myChartTop5;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop5 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop5.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [50, 30, 84, 168, 135],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},
            }
          ]
        });
        window.onresize = myChartTop5.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop5.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop5.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop5.getOption();
	        myChartTop5.clear();
	        myChartTop5.setOption(options);
	      }
      }
    },
    drawLineTop6() {
      var bar_dvOneTop = this.$refs.myChartTop6;
      if (bar_dvOneTop) {
        // 基于准备好的dom，初始化echarts实例
        let myChartTop6 = this.$echarts.init(bar_dvOneTop);
        // 绘制图表
        myChartTop6.setOption({
          color: ["#02BDFF"],
          grid: {
            left: "0%",
            right: "4%",
            top: "8%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            show: true,
            type: "value",
            scale: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            minorTick: {
              show: false
            },
            splitLine: {
              show: true,
               lineStyle:{
                  color: ['rgba(71, 123, 255, 0.3)'],
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
            },
            axisLabel: {
              formatter: function() {
                return "";
              }
            }
          },
          series: [
            {
              data: [20, 50, 104, 58, 35],
              type: "line",
              symbol: 'none',
              areaStyle: { //折线颜色不取渐变色，取color设置值
                normal: {
                    color: {
                        type: 'LinearGradient',
                        x: 0,
                        y: 0,
                        x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#B4F0FF' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(125, 221, 255, 0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            	},
            }
          ]
        });
        window.onresize = myChartTop6.resize;
        let timer = setInterval(() => update(), 5000);
	      myChartTop6.on("mouseover", function(parmas) {
	        clearInterval(timer);
	      });
	      myChartTop6.on("mouseout", function(parmas) {
	        timer = setInterval(() => update(), 5000);
	      });
	      function update() {
	        let options = myChartTop6.getOption();
	        myChartTop6.clear();
	        myChartTop6.setOption(options);
	      }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  box-sizing: border-box;
  div {
    .title {
      display: flex;
      width: 100%;
      align-items: center;
      line-height: 45px;
      height: 45px;
      img{
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
      h3 {
        font-size: 18px;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .left {
    width: 28%;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.08);
		box-sizing: border-box;
    .table {
      width: 300px;
    }
    ::v-deep .el-table--scrollable-y .el-table__body-wrapper {
      overflow-y: hidden;
      overflow-x: hidden;
    }
  }
  .center {
    width: 28%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.08);
		box-sizing: border-box;
    .img {
      width: 200px;
      height: 120px;
      margin-top: 40px;
      img {
        width: 100%;
      }
    }
    .word {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #000000;
      margin-top: 10px;
    }
  }
  .right {
    width: 42%;
    padding: 0 10px 10px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    .eacharts {
      display: flex;
      flex-wrap: wrap;
      .one {
        width: 32%;
        margin-right: 5px;
        .one_top {
          display: flex;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
          h3 {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color:#0F92FF;
          }
        }
        .num {
          font-size: 26px;
          font-family: "Microsoft YaHei";
          font-weight: 600;
          color: #0f92ff;
          margin-left: 5px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
