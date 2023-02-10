<template>
  <chart-title :title="title">
    <div class="supply-table">
      <el-table :data="tableData" stripe :default-sort="{prop: 'cycle', order: 'descending'}" class="table"
        :row-class-name="tableRowClassName" style="width:100%">
        <el-table-column label="序号" width="80px" align="center">
          <template slot-scope="scope">
            {{(currentPage-1)*10+scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column label="周期" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.cycle"> {{scope.row.cycle.slice(0,4)+'-'+scope.row.cycle.slice(4)}}</span>
            <span v-else>--</span>

          </template>
        </el-table-column>
        <el-table-column prop="dealNum" label="交易次数" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.dealNum">{{scope.row.dealNum}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="moneySum" label="金额(美元)" align="center"></el-table-column>
        <el-table-column prop="weight" label="交易量(千克)" align="center"></el-table-column>
        <el-table-column prop="cartonNum" label="箱量" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.cartonNum">{{scope.row.cartonNum}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination v-if="tableData.length > 0" :currentPage="currentPage" :totalCount="totalCount" :pageSize="pageSize"
          @handleCurrentChangeSub="handleCurrentChangeFun" class="pagina"></Pagination>
      </div>
    </div>
  </chart-title>
</template>

<script>
import api from '@/api/resources'
import chartTitle from "../../components/common/chartTitle.vue";
import Pagination from "../../components/common/Pagination.vue";
export default {
  name: 'supplyTable',
  components: {
    chartTitle,
    Pagination
  },
  data () {
    return {
      id: '',
      title: '交易周期分析【2018.12-2021.12】',
      tableData: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 10
    }
  },
  methods: {
    getData () {
      const params = {
        page: this.currentPage,
        rows: this.pageSize,
        search_EQ_companyId: this.id
      }
      api.getSupplyCycleList(params).then(res => {
        this.tableData = res.data.rows
        this.totalCount = Number(res.data.total)
      })
    },
    // 分页
    handleCurrentChangeFun (val) {
      this.currentPage = val
      this.getData()
    },
    tableRowClassName (row) {
      if (row.rowIndex % 2 === 0) {
        return 'row-default'
      } else {
        return 'row-active'
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.supply-table {
  margin-top: 24px;
  .table {
    margin: 37px 0 18px;
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
          &.is-right {
            .cell {
              padding-right: 34px;
            }
          }
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
  }
  .pagination {
    margin-top: 33px;
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-end;
  }
}
::v-deep .el-table tbody tr:hover>td { background-color: transparent !important; }
</style>
