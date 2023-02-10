<template>
  <div class="major-trading-partners">
    <container :title="title">
      <el-table :data="tableData" class="table" stripe>
        <el-table-column
          type="index"
          :index="transaction_index"
          label="序号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="国家/地区"
          align="center"
          prop="countries"
        ></el-table-column>
        <el-table-column
          label="贸易类型"
          align="center"
          prop="tradeType"
        ></el-table-column>
        <el-table-column
          label="交易次数"
          align="center"
          prop="transactionNumber"
        ></el-table-column>
        <el-table-column
          label="金额(美元)"
          align="center"
          prop="amount"
        ></el-table-column>
        <el-table-column
          label="交易量"
          align="center"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="箱量"
          align="center"
          prop="cartonQuantity"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-if="tableData.length > 0"
        class="pagination"
        background
        :total="total"
        :page-size="pageSize"
        :current-page.sync="pageIndex"
        @current-change="currentChangeTransaction"
        layout="total, prev, pager, next,jumper"
      >
      </el-pagination>
    </container>
    <container :title="titleEcharts" style="margin-top:25px;">
      <div
        ref="echarts"
        style="width:100%;height:300px;background: rgba(247,248,250,1);margin-top:20px;"
      ></div>
    </container>
    <container :title="titleTrade" style="margin-top:25px;">
      <el-table :data="itemData" class="table" stripe>
        <el-table-column
          type="index"
          :index="item_index"
          label="序号"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="HS码"
          align="center"
          prop="HSCode"
        ></el-table-column>
        <el-table-column
          label="物品描述"
          align="center"
          prop="describe"
        ></el-table-column>
        <el-table-column
          label="交易次数"
          align="center"
          prop="number"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-if="itemData.length > 0"
        class="pagination"
        background
        :total="totalTrade"
        :page-size="pageSizeTrade"
        :current-page.sync="pageIndexTrade"
        @current-change="currentChange"
        layout="total, prev, pager, next,jumper"
      ></el-pagination>
    </container>
  </div>
</template>

<script>
import container from '../../components/common/container.vue'
import api from '@/api/resources'
export default {
  components: {
    container
  },
  data () {
    return {
      title: '公司主要贸易国交易统计',
      titleEcharts: '主要贸易物品次数统计',
      titleTrade: '公司主要贸易物品列表',
      tableData: [],
      itemData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      totalTrade: 0,
      pageIndexTrade: 1,
      pageSizeTrade: 10,
      XValueHsocd: [],
      YACValueHscode: [],
      YALValueHscode: []
    }
  },
  mounted () {
    this.getTransactionStatistics()
    this.getFrequency()
    this.getItem()
  },
  methods: {
    transaction_index (index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    item_index (index) {
      return (this.pageIndexTrade - 1) * this.pageSizeTrade + index + 1
    },
    // 交易统计
    getTransactionStatistics () {
      const params = {
        page: this.pageIndex,
        rows: this.pageSize,
        sort: 'updatetime',
        order: 'desc',
        search_EQ_companyId: this.$route.query.id
      }
      api.getTransactionStatistics(params).then((res) => {
        this.tableData = res.data.rows
        this.total = Number(res.data.total)
      })
    },
    currentChangeTransaction (val) {
      this.pageIndex = val
      this.getTransactionStatistics()
    },
    // 次数统计
    async getFrequency () {
      const params = {
        search_EQ_companyId: this.$route.query.id
      }
      api.getFrequencyStatistics(params).then((res) => {
        this.XValueHsocde = res.data.rows[0].XHsocde
        // 交易次数
        this.YACValueHscode = JSON.parse(res.data.rows[0].YACValueHscode)[0]
        // 占比
        this.YALValueHscode = JSON.parse(res.data.rows[0].YALValueHscode)[0]
        this.init({
          XValueHsocde: this.XValueHsocde,
          YACValueHscode: this.YACValueHscode,
          YALValueHscode: this.YALValueHscode
        })
      })
    },
    // 公司主要贸易物品列表
    getItem () {
      const params = {
        page: this.pageIndexTrade,
        rows: this.pageSizeTrade,
        sort: 'updatetime',
        order: 'desc',
        search_EQ_companyId: this.$route.query.id
      }
      api.getItemList(params).then((res) => {
        this.itemData = res.data.rows
        this.totalTrade = Number(res.data.total)
      })
    },
    currentChange (val) {
      this.pageIndexTrade = val
      this.getItem()
    },
    init ({ XValueHsocde, YACValueHscode, YALValueHscode }) {
      const dom = this.$refs.echarts
      const myChart = this.$echarts.init(dom)
      const option = {
        color: ['rgba(38, 144, 255, 1)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(255,255,255,1)',
          borderWidth: 0,
          textStyle: {
            color: '#000',
            fontWeight: 600,
            fontFamily: '"Microsoft YaHei"',
            fontSize: '12',
          },
          extraCssText:
            'box-shadow: 0px 0px 12px 0px rgba(12, 49, 183, 0.16);border-radius: 0px;padding:10px;',
          formatter: function (params) {
            const { marker, name, value } = params[0]
            const { value: proportion, marker: lineMarker } = params[1]
            return `HS码：${name}<br/>${marker}交易次数：${value}<br/>${lineMarker}交易占比：${proportion}%`
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            
            axisLabel: {
              rotate: 30,
              textStyle: {
                color: 'rgba(89, 89, 89, 1)',
                fontSize: '12'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12);'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: { show: false },
            data: XValueHsocde
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: 'rgba(89, 89, 89, 1)',
                fontWeight: 'normal'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },// y轴网格线，一般都会隐藏，x轴亦是如此
          },
          {
            show: true,
            type: 'value',
            axisLabel: {
              textStyle: {
                color: 'rgba(89, 89, 89, 1)',
                fontSize: 14,
                fontWeight: 'normal'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(13, 13, 13, 0.12)'
              }
            },
            splitLine: { show: false },
            inverse: false
          }
        ],
        series: [
          {
            type: 'bar',
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 6, // 折线点的大小
            barWidth: '17px',
            itemStyle: {
              color:'rgba(14,103,255,1)'
            },
            data: YACValueHscode
          },
          {
            type: 'line',
            yAxisIndex: 1,
            data: YALValueHscode,
            itemStyle: {
              color: '#FF9113FF' // 动态配置折现颜色
            },
            symbolSize: 10
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.major-trading-partners {
  padding:30px 40px;
  box-sizing: border-box;
  background: #fff;
  .table {
    margin: 20px 0 18px;
    border: 1px solid rgba(230,230,230,0.3);
    ::v-deep .el-table__header {
      tr {
        background: linear-gradient(90deg, rgba(0,123,255,1) 0%,rgba(2,70,208,1) 100%);
        th {
          padding: 0;
          background-color: rgba(14, 103, 255, 0.08);
        }
      }
      .cell {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #ffffff;
      }
    }
    ::v-deep .el-table__body {
      tr {
        &.el-table__row {
          &.el-table__row--striped {
            background: rgba(247,248,250,1);
            td {
            background: rgba(247,248,250,1);
            }
          }
        }
        td {
          padding: 0;
        }
      }
      .cell {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #0D0D0D;
      }
    }
    .detail {
      color: #1d62d4;
      cursor: pointer;
    }
  }
  .pagination {
    text-align: right;
    height: 32px;
    padding: 0;
    margin: 0;
    ::v-deep .el-pagination__total {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
    ::v-deep .btn-prev,
    ::v-deep .btn-next,
    ::v-deep .el-pager {
      height: 32px;
    }
    ::v-deep .number {
      // width: 32px;
      // height: 32px;
      // line-height: 32px;
      &:not(.disabled) {
        &.active {
          background: #0E67FF;
          border: #0E67FF;
        }
      }
    }
    
  }
  ::v-deep.el-pagination.is-background .el-pager li , ::v-deep .el-pagination.is-background .btn-next,::v-deep .el-pagination.is-background .btn-prev{
      width: 30px;
      height: 30px;
      border: 1px solid rgba(13, 13, 13, 0.08);
      background: #f7f8fa;
      border-radius: 0px;
      font-weight: 400;
    }
}
::v-deep .el-table tbody tr:hover>td { background-color: transparent !important; }
</style>
