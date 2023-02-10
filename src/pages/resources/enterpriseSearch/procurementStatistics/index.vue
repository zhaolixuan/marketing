<template>
  <div class="procurementStatistics">
    <div class="container">
      <div class="search">
        <div class="filter">
          供应商: <el-input v-model="supplierText" placeholder="请输入供应商名称" @keyup.enter.native="search" @clear="search"
            class="m_r"></el-input>
          国家/地区: <el-input v-model="countryText" placeholder="请输入所属国家/地区" @keyup.enter.native="search" @clear="search">
          </el-input>
        </div>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
      <div class="data_table">
        <el-table :data="tableData" stripe :row-class-name="tableRowClassName" style="width:100%" class="table">
          <el-table-column label="序号" width="80px" align="center">
            <template slot-scope="scope">
              {{(currentPage-1)*10+scope.$index +1}}
            </template>
          </el-table-column>
          <el-table-column prop="PDate" label="日期" align="center" width="100px"></el-table-column>
          <el-table-column prop="hsEncod" label="HS编码" align="center" width="100px"></el-table-column>
          <el-table-column prop="supplyEnterprises" label="供应商" align="center" width="150px"></el-table-column>
          <el-table-column prop="purContent" label="交易内容" align="center" width="300px"></el-table-column>
          <el-table-column prop="amount" label="交易金额(美元)" align="center"></el-table-column>
          <el-table-column prop="district" label="关区" align="center" width="120px"></el-table-column>
          <el-table-column prop="country" label="国家/地区" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.country">{{scope.row.country}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <pagination v-if="tableData.length > 0" :currentPage="currentPage" :totalCount="totalCount"
            :pageSize="pageSize" @handleCurrentChangeSub="handleCurrentChangeFun" class="pagina"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/resources'
import pagination from "../../components/common/Pagination.vue";
export default {
  name: 'procurementStatistics',
  components: {
    pagination
  },
  data () {
    return {
      id: '',
      supplierText: '',
      countryText: '',
      tableData: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 10
    }
  },
  methods: {
    // 数据列表
    getData () {
      const params = {
        page: this.currentPage,
        rows: this.pageSize,
        search_EQ_companyId: this.id,
        search_LIKE_supplyEnterprises: this.supplierText,
        search_LIKE_country: this.countryText,
      }
      api.getProcurementList(params).then(res => {
        this.tableData = res.data.rows
        this.totalCount = Number(res.data.total)
      })
    },
    search () {
      this.currentPage = 1
      this.getData()
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
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.procurementStatistics {
  padding: 0 40px;
  box-sizing: border-box;
  background: #fff;
  .container {
    .search {
      height: 83px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .filter {
        display: flex;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #595959;
        line-height: 40px;
        .el-input {
          width: auto;
          // height: 22px;
          margin-left: 18px;
        }
        .m_r {
          margin-right: 47px;
        }
      }
      ::v-deep .el-input__inner {
        width: 260px;
        height: 32px;
        line-height: 32px;
        background: #ffffff;
        border-radius: 0px;
        border: 1px solid rgba(13, 13, 13, 0.16);
      }
      ::v-deep .el-input__suffix {
        display: flex;
        align-items: center;
      }
      .el-button {
        width: 80px;
        height: 32px;
        // background: #1d4ad4;
        // border: #1d4ad4;
        // border-radius: 2px;
        // margin-right: 20px;
        line-height: 0 !important;
        border: none;
        background: #0E67FF;
        border-radius: 0px;
        // border-image: linear-gradient(180deg, rgba(99, 156, 255, 1), rgba(45, 164, 255, 1)) 1 1;
        margin-left: 30px;
      }
    }
    .data_table {
      margin-bottom: 20px;
      // background: rgba(75, 182, 255, 0.05);
      // padding: 23px 19px 29px 19px;
      box-sizing: border-box;
      .table {
        margin: 0 0 18px;
        border: 1px solid #dee7f7;
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
            color: #333333;
          }
        }
      }
    }
    .pagination {
      margin-top: 14px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
::v-deep .el-table tbody tr:hover>td { background-color: transparent !important; }
</style>
