<template>
  <div class="import-statistics-continent">
    <container title="进口数据统计" subtitle="2018.12-2021.12">
      <el-table
        :data="tableData"
        class="table"
        stripe
        :default-sort="{ prop: sort, order }"
        @sort-change="handleSortChange"
        :header-cell-style="headClass"
        :cell-style="cellClass"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="120"
        ></el-table-column>
        <el-table-column
          label="交易月份"
          prop="tradingMonth"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.tradingMonth || "--" }}
          </template>
        </el-table-column>
        <el-table-column
          label="交易次数"
          prop="transactionNumber"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.transactionNumber || "--" }}
          </template>
        </el-table-column>
        <el-table-column
          label="净重（千克）"
          prop="weight"
          align="right"
          sortable
        >
          <template slot-scope="scope">
            {{ Number(scope.row.weight).toFixed(2) || "--" }}
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="number" align="right" sortable
          ><template slot-scope="scope">
            {{ Number(scope.row.number).toFixed(2) || "--" }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="getData"
        layout="prev, pager, next, jumper, total"
      ></el-pagination>
    </container>
  </div>
</template>

<script>
import api from "@/api/resources";
import container from "../../components/common/container.vue";
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
      // 列表数据
      tableData: [],
      // 数据总数
      total: 0,
      // 当前页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 排序字段
      sort: "tradingMonth",
      // 排序规则
      order: "descending",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //表头背景色
    headClass() {
      return "text-align: center;";
    },
    //表格居中
    cellClass() {
      return "text-align: center;";
    },
    // 获取数据
    async getData() {
      let {
        currentPage: page,
        pageSize: rows,
        sort,
        order,
        countryOrArea,
      } = this;
      if (order === "descending") order = "desc";
      if (order === "ascending") order = "asc";
      const res = await api.getGlobalMarketTrendAnalysisSearch({
        page,
        rows,
        sort,
        order,
        search_EQ_countriesCode: countryOrArea,
      });
      const { total, rows: data } = res.data;
      this.total = total - 0;
      this.tableData = data;
    },
    // 切换排序规则
    handleSortChange({ prop, order }) {
      this.sort = prop;
      this.order = order;
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
.import-statistics-continent {
  width: 100%;
  .table {
    margin: 19px 0 30px;
    border: 1px solid rgba(230,230,230,0.3);
    ::v-deep .el-table__header {
      tr {
            background: linear-gradient(90deg, rgba(0,123,255,1) 0%,rgba(2,70,208,1) 100%);        
        th {
          padding: 0;
          background: rgba(14, 103, 255, 0.08);
        }
      }
      .cell {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        font-weight: 500;
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
        font-weight: 400;
        color: #0d0d0d;
      }
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
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
    
    ::v-deep .btn-prev,
    ::v-deep .btn-next {
      height: 32px;
      border-radius: 0px;
      border: 1px solid rgba(13, 13, 13, 0.08);
    }
    ::v-deep .el-pager {
      height: 32px;
    }
    ::v-deep .el-pagination__jump {
      margin: 0 20px;
      height: 32px;
      line-height: 32px;
    }
    // ::v-deep .el-pagination__jump .el-input__inner{
    //   border-radius: 0 !important;
    // }
    ::v-deep .number {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 0px;
      font-size: 14px;
      font-weight: 400;
      color: #0d0d0d;
      border-radius: 0 !important;
      border: 1px solid rgba(13, 13, 13, 0.08);
      &:not(.disabled) {
        &.active {
          color: #ffffff;
          background: #0e67ff;
        }
      }
    }
  }
}
::v-deep .el-input__inner{
      border-radius: 0 !important;
}
::v-deep .el-table tbody tr:hover>td { background-color: transparent !important; }
</style>
