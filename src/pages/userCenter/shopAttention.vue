<template>
  <div class="shopAttention">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>收藏夹</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">收藏的店铺</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <h3 class="h3">店铺关注</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="headClass"
        :cell-style="cellClass"
      >
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="55"></el-table-column>
        <el-table-column align="left" prop="suppName" label="店铺名称" min-width="180"></el-table-column>
        <el-table-column align="center" prop="contacts" label="联系人" min-width="100"></el-table-column>
        <el-table-column align="center" prop="tel" label="手机号" min-width="100"></el-table-column>
        <el-table-column align="center" prop="poone" label="座机电话" min-width="100"></el-table-column>
        <el-table-column align="center" label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="cancelCollent(scope.row)">取消关注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="total,prev, pager, next"
        style="text-align:right;margin-top:16px;"
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getListFollowSuppWeb, cancelShopAttention} from '@/api/userCenter'
  export default {
    name: 'shopAttention',
    data() {
      return {
        tableData: [],
        loading: false,
        total: 0,
        curPage: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      delClose(){
        this.$router.push({
          path:"/cydn/userCenter/userInfo"
        })
      },
      indexMethod(index) {
        index = (index + 1) + (this.curPage - 1) * this.pageSize
        return index
      },
      getTableList() {
        let params = {
          page: this.curPage,
          rows: this.pageSize
        }
        getListFollowSuppWeb(params).then(res => {
          if(res.data.success) {
            this.tableData = res.data.rows
            this.total = Number(res.data.total)
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      cancelCollent(row) {
        let params = {
          suppId: row.id
        }
        this.$confirm('此操作将取消关注, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelShopAttention(params).then(res => {
            if(res.data.success) {
              this.$message({
                type: 'success',
                message: '取消成功!'
              });
              this.getTableList();
            } else {
              this.$message.error(res.data.message);
            }
          })
        })
      },
      handleCurrentChange(val) {
        this.curPage = val;
        this.getTableList();
      },
      // 表头
      headClass(){
        return "background: #F7F8FA;color: #595959;fontSize:14px;text-align: center;"
      },
      //表格居中
      cellClass() {
        return "text-align: center;";
      },

    }
  }
</script>

<style lang="scss" scoped>
.el-table {
  border: 1px solid #F0F0F0FF;
  border-radius: 10px;
}
::v-deep .el-table tr{
    color: #0D0D0D;
}
::v-deep .el-button--text{
  color: #929292;
}
h3 {
  padding-bottom: 20px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: 600;
  color: #0d0d0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-error{
    font-size: 25px;
    cursor: pointer;
    color: #999;
  }
}
.bread{
    ::v-deep .is-link {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #929292;
  }
  ::v-deep .diff {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #0d0d0d;
    .el-breadcrumb__inner {
      font-weight: 600;
    }
  }
}
.content_box {
  width: 100%;
  background: #FFFFFF;
  margin-top: 15px;
  border-radius: 10px;
  padding: 23px 31px 30px 29px;
  box-sizing: border-box;
  .h3{
    font-size: 20px;
    font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
    font-weight: 600;
    color: #0D0D0D;
  }
  .pagination{
    margin-top: 30px;
    ::v-deep .btn-prev{
      border-radius: 8px;
    }
    ::v-deep .btn-next{
      border-radius: 8px;
    }
    ::v-deep .el-pager li{
      border-radius: 8px;
    }
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0078E3FF!important;
    color: #FFF;
}
</style>
