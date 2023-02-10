<template>
  <chart-title :title="'交易周期分析'" :isShow="true" @changeDimension="handleChangeDimension">
  <div class="mapBox">
    <div class="map" ref="map"></div>
  </div>
    
  </chart-title>
</template>

<script>
import api from '@/api/resources'
import chartTitle from "../../components/common/chartTitle.vue";
export default {
  name: 'procurementChart',
  components: {
    chartTitle
  },
  data () {
    return {
      id: '',
      title: '交易周期分析',
      maxData: 0,
      maxData1: 100,
      maxData2: 100,
      dimension: '',
      yAxisData: [], // y轴数据
      yAxisData1: [], // 同比数据
      yAxisData2: [], // 环比数据
      thbAmountMonth: [], // 金额同比环比
      xAxisData: [],
      chartData: {},
      seriesName: '',
      intervalData1: 20,
      intervalData2: 20
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    handleChangeDimension (type) {
      switch (type) {
        case 1:
          this.seriesName = '总金额'
          this.yAxisData = JSON.parse(this.chartData.YALValueAmountMonth)[0]
          this.yAxisData1 = JSON.parse(this.chartData.thbAmountMonth)[0]
          this.yAxisData2 = JSON.parse(this.chartData.thbAmountMonth)[1]
          break
        case 2:
          this.seriesName = '交易量(千克)'
          this.yAxisData = JSON.parse(this.chartData.YALValueWeightMonth)[0]
          this.yAxisData1 = JSON.parse(this.chartData.thbWeightMonth)[0]
          this.yAxisData2 = JSON.parse(this.chartData.thbWeightMonth)[1]
          break
        case 3:
          this.seriesName = '交易次数'
          this.yAxisData = JSON.parse(this.chartData.YALValueCountMonth)[0]
          this.yAxisData1 = JSON.parse(this.chartData.thbCountMonth)[0]
          this.yAxisData2 = JSON.parse(this.chartData.thbCountMonth)[1]
          break
      }
      const max = Math.max.apply(null, this.yAxisData)
      const max1 = Math.max.apply(null, this.yAxisData1)
      const max2 = Math.max.apply(null, this.yAxisData2)
      const min1 = Math.min.apply(null, this.yAxisData1)
      const min2 = Math.min.apply(null, this.yAxisData2)
      this.getMax(max, 1)
      this.getMax(max1, 2, min1)
      this.getMax(max2, 3, min2)
      this.$nextTick(() => {
        this.init()
      })
    },
    getMax (max, type, min) {
      if (max < 0) {
        max = Math.abs(max)
      }
      max = max.toString()
      const high = max.slice(0, 1)
      const mdata = (Number(high) + 1) * Math.pow(10, max.length - 1)
      if (type === 1) {
        this.maxData = mdata
      } else if (type === 2) {
        this.maxData1 = mdata
        if (min) {
          this.intervalData1 = (this.maxData1 - min) / 5
        }
      } else {
        this.maxData2 = mdata
        if (min) {
          this.intervalData2 = (this.maxData2 - min) / 5
        }
      }
    },
    getData () {
      const parmas = {
        search_EQ_companyId: this.id
      }
      api.getProcurementChartData(parmas).then((res) => {
        this.chartData = res.data.rows[0]
        // this.thbAmountMonth = data.thbAmountMonth
        const xData = JSON.parse(this.chartData.XValueMonth)
        xData.forEach(item => {
          const str = item.toString()
          this.xAxisData.push(str.slice(0, 4) + '-' + str.slice(4))
        })
        this.handleChangeDimension(1)
      })
    },
    init () {
      const dom = this.$refs.map
      const myChart = this.$echarts.init(dom)
      const options = {
        grid: {
          top: '15%',
          left: '10%',
          right:'12%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 0,
          textStyle: {
            color: '#000',
            fontWeight: 600,
            fontFamily: '"Microsoft YaHei"',
            fontSize: 12,
          },
          extraCssText:
            'box-shadow: 0px 0px 12px 0px rgba(12, 49, 183, 0.16);border-radius: 0px;padding:10px;'
        },
        legend: {
          show:false,
          data: ['同比', '环比'],
          left: '0',
          top: '15',
          color: '#333333',
          fontSize: 14,
          itemGap: 10,
          itemHeight: 5,
          itemWidth: 28
        },
        xAxis: [{
          name: '',
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(13, 13, 13, 0.12)'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
              color: 'rgba(89, 89, 89, 1)',
              fontSize: '12'
            }
          }
        }],
        yAxis: [
          {
            name: '',
            min: 0,
            max: this.maxData,
            interval: Math.ceil(this.maxData / 5),
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              color: 'rgba(89, 89, 89, 1)',
              fontSize: '14'
            },
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
          },
          {
            name: '同比',
            nameTextStyle: {
              color:'rgba(89, 89, 89, 1)'
            },
            min: -100,
            position: 'right',
            max: this.maxData1,
            interval: this.intervalData1,
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: 'rgba(89, 89, 89, 1)',
                fontSize: '14'
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
          },
          {
            name: '环比',
            nameTextStyle: {
              color:'rgba(89, 89, 89, 1)'
            },
            offset: 60,
            position: 'right',
            min: -100,
            max: this.maxData2,
            interval: this.intervalData2,
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: 'rgba(89, 89, 89, 1)',
                fontSize: '14'
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
          }
        ],
        series: [
          {
            name: this.seriesName,
            type: 'bar',
            barWidth: 5,
            data: this.yAxisData,
            label: {
              normal: {
                show: false,
                position: 'insideTop',
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              color: '#FF9113', // 渐变色
              barBorderRadius: [128, 128, 0, 0] // 圆角
            }
          },
          {
            name: '同比',
            type: 'line',
            barWidth: 5,
            yAxisIndex: 1,
            data: this.yAxisData1,
            label: {
              normal: {
                show: false,
                position: 'insideTop',
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              color: '#29D3FF', // 渐变色
              barBorderRadius: [128, 128, 0, 0] // 圆角
            }
          },
          {
            name: '环比',
            type: 'line',
            barWidth: 5,
            yAxisIndex: 2,
            data: this.yAxisData2,
            label: {
              normal: {
                show: false,
                position: 'insideTop',
                color: '#fff',
                fontSize: 12
              }
            },
            itemStyle: {
              color: '#2652FF', // 渐变色
              barBorderRadius: [128, 128, 0, 0] // 圆角
            }
          }
        ]
      }
      myChart.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.mapBox{
  width: 100%;
  height: 398px;
  background: rgba(247,248,250,1);
}
.map {
  width: 100%;
  height:100%;
}
</style>
