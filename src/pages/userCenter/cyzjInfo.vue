<template>
  <div class="cyzj_info">
    <h3>我的预约<i class="el-icon-error" @click="delClose"></i></h3>
    <div class="content_box">
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>预约时间</p>
            <el-date-picker
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>预约次数</p>
              <el-select v-model="serviceTimes" placeholder="请选择">
                <el-option
                  v-for="item in serviceList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>回复状态</p>
              <el-select v-model="replyState" placeholder="请选择">
                <el-option
                  v-for="item in replyList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>专家姓名</p>
              <el-input v-model="expertsName" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button @click="getSearch" type="primary">查 询</el-button>
            <el-button @click="getRefresh">重 置</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="info_table">
        <el-table
          :data="tableData"
          style="width: 100%"
          :cell-style="tableRowStyle"
          v-loading="loading"
          :header-cell-style="{background:'#ECF3FE',color:'rgba(0,0,0,0.8)',fontSize:'14px',textAlign: 'center'}"
        >
          <el-table-column center type="index" label="ID编号" width="80"></el-table-column>
          <el-table-column prop="expertsName" label="专家姓名" width="180"></el-table-column>
          <el-table-column prop="serviceTimes" label="预约次数"></el-table-column>
          <el-table-column prop="status" label="回复状态">
            <template slot-scope="scope">
              <span>{{scope.row.status == '1' ? '未回复' : '已回复'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="回复时间">
            <template slot-scope="scope">
              <span v-if="scope.row.status != '1'">{{scope.row.updateTime | hendelDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <div class="aaa">
                <div>
                  <img src="../../static/images/info_icon1.png" alt>
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查 看</el-button>
                </div>
                <div>
                  <img src="../../static/images/info_icon2.png" alt>
                  <el-button @click="getRepeatedly(scope.row)" type="text" size="small">再次预约</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
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
      <info-popup @close="close" v-if="formShow" :formShow="formShow" :id="id"></info-popup>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
import infoPopup from "./components/infoPopup";
import { getDictionaries, getInfoList } from "@/api/userCenter";
import api from "@/api/cyzjApi";
export default {
  data() {
    return {
      time: "",
      loading: false,
      serviceTimes: "",
      replyState: "",
      expertsName: "",
      total: 0,
      curPage: 1,
      pageSize: 10,
      formShow: false,
      id: "",
      tableData: [],
      serviceList: [],
      replyList: []
    };
  },
  components: {
    infoPopup
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
      this.$forceUpdate();
    }
  },
  mounted() {
    this.getList();
    //预约次数字典
    getDictionaries({
      name: "service_times"
    }).then(res => {
      if (res.status == 200) {
        this.serviceList = res.data;
      }
    });
    //回复状态字典
    getDictionaries({
      name: "reply_state"
    }).then(res => {
      if (res.status == 200) {
        this.replyList = res.data;
      }
    });
  },
  methods: {
    getList() {
      var userId = JSON.parse(localStorage.vuex).userInfo.userId;
      this.loading = true;
      if (Array.isArray(this.time)) {
        var search_GTE_createTime = this.time[0] + " 00:00:00";
        var search_LTE_createTime = this.time[1] + " 23:59:59";
      }
      getInfoList({
        search_EQ_isDel: 0,
        search_EQ_userId: userId,
        order: this.serviceTimes != 1 ? "desc" : "asc",
        sort: "serviceTimes,updateTime",
        search_LIKE_expertsName: this.expertsName,
        search_EQ_status: this.replyState, //回复状态
        rows: this.pageSize,
        page: this.curPage,
        search_GTE_createTime: search_GTE_createTime, //开始时间
        search_LTE_createTime: search_LTE_createTime //结束时间
      }).then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.tableData = res.data.rows;
          this.total = Number(res.data.total);
        }
      });
    },
    delClose(){
      this.$router.push({
        path:"/cydn/userCenter/userInfo"
      })
    },
    getSearch() {
      this.curPage = 1;
      this.getList();
    },
    getRefresh() {
      this.time = "";
      this.expertsName = "";
      this.replyState = "";
      this.serviceTimes = "";
      this.curPage = 1;
      this.getList();
    },
    tableRowStyle() {
      return {
        "border-color": "rgba(14, 103, 255, 0.23)",
        textAlign: "center"
      };
    },
    handleClick(row) {
      this.formShow = true;
      this.id = row.id;
    },
    close(val) {
      this.formShow = val;
      this.getList();
    },
    getRepeatedly(row) {
      api
        .getRepeatedly({
          expertsId: row.expertsId
        })
        .then(res => {
          if (res.status == 200) {
            this.getList();
            this.$confirm(
              "系统已经收到您的反馈，请耐心等待，谢谢 ^-^",
              "预约结果",
              {
                confirmButtonText: "确定",
                type: "success",
                showClose: false,
                showCancelButton: false,
                center: true
              }
            ).then(() => {
              //   this.$message({
              //     type: "success",
              //     message: "删除成功!"
              //   });
            });
          }
        });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.curPage = val;
      this.getList();
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-icon-error{
      font-size: 25px;
      cursor: pointer;
      color: #999;
    }
  }
  .content_box {
    width: 100%;
    min-height: 420px;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 30px;
    box-sizing: border-box;
    .el-row {
      .el-col {
        padding-right: 0 !important;
        .grid-content {
          display: flex;
          align-items: center;
          p {
            width: 80px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
          }
          .el-input {
            flex: 1;
          }
          ::v-deep .el-input__inner {
            width: 160px;
          }
        }
        &:first-child {
          //   width: 290px;
          ::v-deep .el-input__inner {
            width: 220px;
          }
        }
      }
    }
    .info_table {
      margin-top: 50px;
      .el-table {
        border: 1px solid rgba(14, 103, 255, 0.23);
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
    }
  }
}
</style>
