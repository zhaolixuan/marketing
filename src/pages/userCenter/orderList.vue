<template>
  <div class="cyzj_info">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>交易</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">我的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <h3 class="h3">订单列表</h3>
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>商品订单号</p>
            <el-input v-model="orderID" placeholder="请输入商品订单号"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>商品名称</p>
            <el-input v-model="tradeName" placeholder="请输入商品名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click="getSearch" type="primary">搜索</el-button>
            <el-button @click="getRefresh">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="info_table">
        <el-tabs v-model="state" @tab-click="getSearch">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="待发货" name="01"></el-tab-pane>
          <el-tab-pane label="待收货" name="02"></el-tab-pane>
          <el-tab-pane label="已完成" name="03"></el-tab-pane>
          <el-tab-pane label="已取消" name="00"></el-tab-pane>
        </el-tabs>
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="headClass"
          :cell-style="tableRowStyle"
          @row-click="getRowDetails"
        >
          <el-table-column center type="index" label="序号" width="55"></el-table-column>

          <el-table-column prop="expertsName" label="商品信息" min-width="180">
            <template slot-scope="scope">
              <div class="special_tem">
                <el-image :src="orderItenschange(scope.row.orderItems).imgUrl" fit="contain" class="table_img">
                </el-image>
                <div class="table_txt">{{orderItenschange(scope.row.orderItems).goodsName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="订单号" min-width="150"></el-table-column>
          <el-table-column prop="supplierName" label="店铺名称" min-width="150"></el-table-column>
          <el-table-column prop="totalCount" label="数量" min-width="60"></el-table-column>
          <el-table-column prop="realPayPrice" label="实付款(元)" min-width="60"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="60">
            <template slot-scope="scope">
              <span>{{stateFilter(scope.row.status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.status === '01'" @click="cancelOrder(scope.row)" style="color: #929292;">取消订单</el-button>
              <el-button type="text" v-if="scope.row.status === '02'" @click="confirm(scope.row)" style="color: #929292;">确认收货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          layout="total,prev, pager, next"
          style="text-align:right;margin-top:16px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList, cancelOrder, confirmOrder } from "@/api/userCenter";
export default {
  data() {
    return {
      orderID: '',
      tradeName: '',
      state: '0',
      loading: false,
      total: 0,
      curPage: 1,
      pageSize: 10,
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    stateFilter(state){
      let name = ''
      switch (state) {
        case '01':
          name = '待发货'
          break;
        case '02':
          name = '待收货'
          break;
        case '03':
          name = '已完成'
          break;
        case '00':
          name = '已取消'
          break;
        case '99':
          name = '未支付'
        default:
          break;
      }
      return name
    },
    orderItenschange(str) {
      let orderObj = {
        imgUrl: '',
        goodsName: ''
      }
      if(str) {
        let jsonArr = JSON.parse(str)[0]
        orderObj = {
          imgUrl: process.env.VUE_APP_IMG_URL + jsonArr.imgId,
          goodsName: jsonArr.goodsName
        }
      }
      return orderObj
    },
    cancelOrder(row) {
      this.$confirm("确定要取消当前订单么?", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let params = {
          id: row.id
        }
        const res = await cancelOrder(params)
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    confirm(row) {
      this.$confirm("确认收货!", "收货确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let params = {
          id: row.id
        }
        const res = await confirmOrder(params)
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    getList() {
      this.loading = true;
      let params = {
        search_EQ_id: this.orderID,
        search_LIKE_orderDesc: this.tradeName,
        search_EQ_status: this.state,
        page: this.curPage,
        rows: this.pageSize
      }
      // 后端不给‘全部’状态值，暂时只能这么判断一下。
      if(this.state === '0') {
        delete params.search_EQ_status
      }
      getOrderList(params).then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.tableData = res.data.rows;
          this.total = Number(res.data.total);
        }
      });
    },
    getSearch() {
      console.log(this.state)
      this.curPage = 1;
      this.getList();
    },
    getRefresh() {
      this.curPage = 1;
      this.orderID = '',
      this.tradeName = '',
      this.state = '0',
      this.getList();
    },
    tableRowStyle() {
      return "border-color: #F0F0F0FF;text-align: center;"
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.curPage = val;
      this.getList();
    },
    // 表头
    headClass(){
      return "background: #F7F8FA;color: #595959;fontSize:14px;text-align: center;"
    },
    getRowDetails(row){
      this.$router.push({
        path: "/cydn/retail/commodity",
        query: {
          goodsId: row.id,
          shopId: row.decoraShopId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cyzj_info {
  h3 {
    padding-bottom: 20px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0d0d0d;
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
    min-height: 420px;
    background: #ffffff;
    border-radius: 10px;
    padding: 29px 30px;
    margin-top: 15px;
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
    .el-row {
      .el-col {
        padding-right: 0 !important;
        .grid-content {
          display: flex;
          align-items: center;
          margin-right: 30px;
          p {
            // width: 80px;
            font-size: 14px;
            font-family: 'PingFangSC-Regular, PingFang SC';
            font-weight: 400;
            color: #595959;
            margin-right: 10px;
          }
          .el-input {
            flex: 1;
          }
          ::v-deep .el-input__inner {
            // width: 220px;
            border-radius: 8px;
            line-height: 40px;
            height: 40px;
          }
          ::v-deep .el-button--mini, .el-button--small{
            border-radius: 8px;
          }
        }
      }
    }
    .info_table {
      margin-top: 30px;
      ::v-deep .el-tabs__nav-wrap::after{
        position: static !important;
      }
      ::v-deep .el-tabs__item{
        font-size: 16px;
        font-family: 'Microsoft YaHei';
        font-weight: 500;
        color: #929292;
      }
      ::v-deep .el-tabs__item.is-active{
        font-weight: 600;
        color: #0D0D0D;
      }
      ::v-deep .el-tabs__active-bar{
        background-color: #007FEFFF;
      }
      ::v-deep .el-table tr{
          color: #0D0D0D;
          cursor: pointer;
      }
      .el-table {
        border: 1px solid #F0F0F0FF;
        border-radius: 10px;
         .aaa{
          display: flex;
          justify-content: space-between;
          div{
            display: flex;
            align-items: center;
            img{
              width: 14px;
              height: 14px;
              margin-right: 2px;
            }
            button{
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #0E67FF;
            }
          }
        }
      }
      .special_tem {
        width: 100%;
        display: flex;
        align-items: center;
        // justify-content: center;
        .table_img {
          display: inline-block;
          width: 100px;
          height: 100px; 
        }
        .table_txt {
          flex: 1;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0078E3FF!important;
    color: #FFF;
}
::v-deep .el-button{
    width: 96px;
    border-radius: 8px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0078E3;
    height: 40px;
}
::v-deep .el-button--default{
    font-size: 14px;
    border: 1px solid #0078E3;
}
::v-deep .el-button--primary{
    width: 96px;
    color: #FFF;
    font-size: 14px;
    background-color: #0078E3FF;
    border-color: #0078E3FF;
}
::v-deep .el-button--default:focus,
::v-deep .el-button--default:hover {
  background-color: #ffffff;
}
</style>
