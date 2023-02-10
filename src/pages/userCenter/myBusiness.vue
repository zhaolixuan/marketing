<template>
  <div class="my-business">
    <div class="title">
      我的企业
      <i class="el-icon-error" @click="handleClose"></i>
    </div>
    <div class="content">
      <div class="search-wrap">
        <div class="search">
          <div class="lable">企业名称</div>
          <el-input
            placeholder="请输入企业名称"
            v-model="companyName"
          ></el-input>
        </div>
        <div class="btn-wrap">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
      <el-table
        class="table"
        :data="tableData"
        :cell-style="handleCellStyle"
        :header-cell-style="handleHeaderCellStyle"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="企业名称"
          prop="companyName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="企业类型"
          prop="companyType"
          align="center"
        ></el-table-column>
        <el-table-column
          label="国籍"
          prop="nationality"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native="handleCancelAttention(scope.row)"
              >取消关注</el-button
            >
            <el-button type="text" @click.native="handleDetails(scope.row)"
              >查看详情</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMyBusiness, getCancelAttention } from "@/api/userCenter";
import { to } from "@/common/util";
export default {
  data() {
    return {
      companyName: "",
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const [err, res] = await to(
        getMyBusiness({
          page: this.currentPage,
          rows: this.pageSize,
          search_LIKE_companyName: this.companyName,
          search_EQ_isDel: 0,
        })
      );

      if (err) console.log(err);

      if (res?.status === 200) {
        const { rows, total } = res.data;
        this.total = total - 0;
        this.tableData = rows;
      }
    },
    handleClose() {
      this.$router.push({
        path: "/cydn/userCenter/userInfo",
      });
    },
    handleSearch() {
      this.total = 0;
      this.currentPage = 1;
      this.getData();
    },
    handleReset() {
      this.companyName = "";
      this.total = 0;
      this.currentPage = 1;
      this.getData();
    },
    handleCurrentChange() {
      this.getData();
    },
    // 查看详情
    handleDetails(row) {
      const routeData = this.$router.resolve({
        name: "procurementStatistics",
        query: { id: row.companyId, name: row.companyName },
      });
      window.open(routeData.href, "_blank");
    },
    // 取消关注
    async handleCancelAttention(row) {
      const [err, res] = await to(
        getCancelAttention({
          companyId: row.companyId,
        })
      );

      if (err) console.log(err);

      if (res?.status === 200) {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.getData();
      }
    },
    handleCellStyle() {
      return { "border-color": "rgba(14, 103, 255, 0.23)" };
    },
    handleHeaderCellStyle() {
      return {
        background: "#ECF3FE",
        color: "rgba(0,0,0,0.8)",
        fontSize: "14px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.my-business {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    color: #0d0d0d;
    font-size: 18px;
    font-weight: 600;
    .el-icon-error {
      color: #999;
      font-size: 25px;
      cursor: pointer;
    }
  }
  .content {
    padding: 30px;
    width: 100%;
    min-height: 420px;
    background: #f8f8f8;
    border-radius: 12px;
    box-sizing: border-box;
    .search-wrap {
      display: flex;
      justify-content: space-between;
      .search {
        display: flex;
        align-items: center;
        .lable {
          flex: 0 0 80px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
        }
        ::v-deep .el-input__inner {
          width: 340px;
        }
      }
    }
    .table {
      margin-top: 50px;
      border: 1px solid rgba(14, 103, 255, 0.23);
    }
    .pagination {
      text-align: right;
      margin-top: 16px;
    }
  }
}
</style>
