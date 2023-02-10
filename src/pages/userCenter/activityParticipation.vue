<template>
  <div class="activityParticipation">
    <h3>我的活动<i class="el-icon-error" @click="delClose"></i></h3>
    <div class="content_box">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{background:'#ECF3FE',color:'rgba(0,0,0,0.8)',fontSize:'14px'}"
      >
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="title" label="活动标题" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="activityPlace" label="活动地点" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="活动开始/结束时间" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.beginTime | filterTime('YYYY-MM-DD HH:mm')}}{{(scope.row.beginTime && scope.row.endTime) ? ' / ' : ''}}{{scope.row.endTime | filterTime('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动报名开始/结束时间" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.enterBeginTime | filterTime('YYYY-MM-DD HH:mm')}}{{(scope.row.enterBeginTime && scope.row.enterEndTime) ? ' / ' : ''}}{{scope.row.enterEndTime | filterTime('YYYY-MM-DD HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="hostUnit" label="主办单位" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="现场报名" width="90">
          <template slot-scope="scope">{{scope.row.isxcbm === 'yes' ? '是' : '否'}}</template>
        </el-table-column>
      </el-table>
      <el-pagination
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
import {getActivityParticipation} from '@/api/userCenter'
export default {
  name: 'activityParticipation',
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
    timeReset(time) {
      if(time) {
        return this.$time(time,'yyyy-MM-dd hh:mm:ss')
      }
    },
    getTableList() {
      let params = {
        page: this.curPage,
        rows: this.pageSize
      }
      getActivityParticipation(params).then(res => {
        console.log(res)
        if(res.data.success) {
          this.tableData = res.data.rows
          this.total = Number(res.data.total)
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    delClose(){
      this.$router.push({
        path:"/cydn/userCenter/userInfo"
      })
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getTableList();
    }
  }
}
</script>

<style lang="scss" scoped>
.activityParticipation {
  .el-table {
    border: 1px solid rgba(14, 103, 255, 0.23);
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
  .content_box {
    width: 100%;
    min-height: 420px;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>
