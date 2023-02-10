<template>
  <div class="container">
    <div class="search">
      <el-input clearable v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="getSearch">搜索</el-button>
    </div>
    <div class="box">
      <el-table v-loading="loading" :data="tableData" border style="width: 100%">
        <el-table-column prop="content" label="内容名" width="200"></el-table-column>
        <el-table-column prop="name" label="操作人" width="120"></el-table-column>
        <el-table-column prop="time" label="操作时间" width="180"></el-table-column>
        <el-table-column prop="go" label="节点共识" width="80"></el-table-column>
        <el-table-column prop="id" label="区块链唯一标识"></el-table-column>
        <el-table-column label="历史内容" width="105">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" style="small">查看内容</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
    </div>
    <div class="dialog">
      <el-dialog width="700" title="内容详情" :visible.sync="dialogVisible" :before-close="handleClose">
        <div class="dialog_content">
          <div>
            <span>order_id</span>
            <span>1364</span>
          </div>
          <div>
            <span>user_id</span>
            <span>2871</span>
          </div>
          <div>
            <span>sell_user_id</span>
            <span>2736</span>
          </div>
          <div>
            <span>sale_id</span>
            <span>33</span>
          </div>
          <div>
            <span>order_num</span>
            <span>202110250355463761</span>
          </div>
          <div>
            <span>amount</span>
            <span>20.1010</span>
          </div>
          <div>
            <span>total_money</span>
            <span>1072333.40</span>
          </div>
          <div>
            <span>order_id</span>
            <span>1364</span>
          </div>
          <div>
            <span>contract_image</span>
            <span></span>
          </div>
          <div>
            <span>create_date</span>
            <span>2021-10-22 15:55:46</span>
          </div>
          <div>
            <span>pay_date</span>
            <span></span>
          </div>
          <div>
            <span>is_del</span>
            <span>0</span>
          </div>
          <div>
            <span>finish_date</span>
            <span></span>
          </div>
          <div>
            <span>comment</span>
            <span></span>
          </div>
          <div>
            <span>buyer_payment_voucher</span>
            <span></span>
          </div>
          <div>
            <span>payment_voucher</span>
            <span></span>
          </div>
          <div>
            <span>buyer_compact</span>
            <span>http://a-news.oss-cn-hangzhou.aliyuncs.com/famen/2021-10-25/3e62b57e006e8b1776e65dae4eecacf6.jpg</span>
          </div>
          <div>
            <span>buyer_compact_money</span>
            <span>1072333.4</span>
          </div>
          <div>
            <span>seller_compact</span>
            <span>http://a-news.oss-cn-hangzhou.aliyuncs.com/famen/2021-10-25/c5eb971c7caee0ae837bc5b198b19c56.jpg</span>
          </div>
          <div>
            <span>seller_compact_money</span>
            <span>1072333.4</span>
          </div>
          <div>
            <span>ship_image</span>
            <span></span>
          </div>
          <div>
            <span>compact_no</span>
            <span>2021102203</span>
          </div>
          <div>
            <span>sort</span>
            <span>848</span>
          </div>
          <div>
            <span>prepay_money</span>
            <span>0.00</span>
          </div>
          <div>
            <span>new_status</span>
            <span>5</span>
          </div>
          <div>
            <span>prepay_img</span>
            <span></span>
          </div>
          <div>
            <span>prepay_image_name</span>
            <span></span>
          </div>
          <div>
            <span>buyer_compact_name</span>
            <span>2021102203.jpg</span>
          </div>
          <div>
            <span>seller_compact_name</span>
            <span>2021102203.jpg</span>
          </div>
          <div>
            <span>is_admin_create</span>
            <span>1</span>
          </div>
          <div>
            <span>pre_receive_at</span>
            <span>2021-11-01 15:55:46</span>
          </div>
          <div>
            <span>is_confirm</span>
            <span>0</span>
          </div>
          <div>
            <span>info1</span>
            <span>oinfo_id-1346,product_id-68,price-53300.00,amount-16.9340,unit-,name-C37700,create_date-2021-10-25 15:55:46,user_id-2871,area-台州,factory-智联商城,</span>
          </div>
          <div>
            <span>info2</span>
            <span>oinfo_id-1347,product_id-68,price-53600.00,amount-3.1670,unit-,name-C37700,create_date-2021-10-25 15:55:46,user_id-2871,area-台州,factory-智联商城,</span>
          </div>
          <div>
            <span>pick1</span>
            <span>id-916,order_id-1364,pick_no-1364202111091623121,status-2,created_at-2021-11-09 16:23:12,updated_at-2021-11-09 16:23:12,times-1,total_amount-20.1010,total_money-1072333.40,is_del-0,send_time-1636446239,receive_time-0,</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      loading: false,
      tableData: [
        {
          content: "order_2021102203",
          name: "admins",
          time: "2021/11/17 下午4:38:16",
          go: "完成",
          id: "846ec14f5a69f77da7f335bf417274cb5aad13be1a0b2034a0e638bd9246db21"
        },
        {
          content: "order_2021111101",
          name: "admins",
          time: "2021/11/17 下午4:33:04",
          go: "完成",
          id: "77b960ae426fcb06bd31289a7a30fe70ded5cf7d5ebed98059fb5d7b0a55ded6"
        },
        {
          content: "order_2021102902",
          name: "admins",
          time: "2021/11/17 下午4:32:04",
          go: "完成",
          id: "145d0808ff53fa300ad3cb0d152c6553856f7860c9eeb55f7464909b4722dc88"
        },
        {
          content: "order_2021111202",
          name: "admins",
          time: "2021/11/17 下午4:30:56",
          go: "完成",
          id: "f2189d7b572daac01b86696247862fc0399bfad28b54e76c6035e31c6604d362"
        },
        {
          content: "order_2021111302",
          name: "admins",
          time: "2021/11/17 下午4:27:32",
          go: "完成",
          id: "5d8952b84c7f0a8434b61422dbb5d0ea1c4dbdea3cfbd2602a08c42ca2087a8a"
        },
        {
          content: "order_2021111504",
          name: "admins",
          time: "2021/11/16 下午4:49:50",
          go: "完成",
          id: "7f45b0cbda097d0462f9ebb9f98a6dd1c68271828230806e5b17a99fa5041790"
        },
        {
          content: "order_2021111503",
          name: "admins",
          time: "2021/11/16 下午4:50:05",
          go: "完成",
          id: "664abed3449937edd9d94c714b2cbd25ff0dff43a1efacd5887ed6e3641381f9"
        },
        {
          content: "order_2021111502",
          name: "admins",
          time: "2021/11/16 下午4:50:28",
          go: "完成",
          id: "88f6f2c82880d47378eecc5bd06d3747463f1ae06c1b28507c997c84a0cd34cc"
        },
        {
          content: "order_2021111501",
          name: "admins",
          time: "2021/11/16 下午4:50:46",
          go: "完成",
          id: "e532f872c1e7f092c4f0fe415027f3e55cd2fc6022715b1184a9fd6125a20507"
        },
        {
          content: "order_2021110902",
          name: "admins",
          time: "2021/11/16 下午4:43:52",
          go: "完成",
          id: "3c7330dd73a147f51821f5c9fce8554bed8f24d44b898e41526f38eafe5310b0"
        }
      ],
      dialogVisible: false
    };
  },
  mounted() {},
  methods: {
    getSearch() {
      // var arr = [];
      // this.loading = true;
      // this.tableData.filter(item => {
      //   if (item.address.indexOf(this.input) > -1) {
      //     arr.push(item);
      //   }
      // });
      // this.tableData = arr;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1000);
    },
    handleClick() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .search {
    display: flex;
    width: 500px;
    .el-input {
      margin-right: 20px;
    }
  }
  .box {
    margin-top: 20px;
    // width: 1000px;
    .el-pagination {
      margin: 20px 0;
      text-align: right;
    }
  }
  .dialog {
    .dialog_content {
      border: 1px solid #ebeef5;
      border-bottom: none;
      div {
        display: flex;
        width: 100%;
      }
      span {
        flex: 1;
        padding: 10px;
        line-height: 20px;
        border-bottom: 1px solid #ebeef5;
      }
      span:nth-child(odd) {
        border-right: 1px solid #ebeef5;
      }
    }
  }
}
</style>
