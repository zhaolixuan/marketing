<template>
  <div class="policyOn">
    <h3>政策浏览<i class="el-icon-error" @click="delClose"></i></h3>
    <div class="content_box">
      <el-row :gutter="30">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>政策名称</p>
              <el-input
                v-model="policyName"
                placeholder="请输入政策名称"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>政策类型</p>
              <el-select v-model="policyType" placeholder="请选择">
                <el-option
                  v-for="item in policyTypeList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <p>浏览时间</p>
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
          :header-cell-style="{
            background: '#ECF3FE',
            color: 'rgba(0,0,0,0.8)',
            fontSize: '14px',
          }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="政策名称"
            width="500"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="createDepartment" label="发布单位">
            <template slot-scope="scope">
              <span>{{ scope.row.createDepartment | defaultValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="policyCategory" label="政策类型">
            <template slot-scope="scope">
              <span>{{
                scope.row.policyCategory
                  ? scope.row.policyCategory === "declare"
                    ? "可申报政策"
                    : "普通政策"
                  : "--"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="浏览时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | filterTime("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                @click="getRepeatedly(scope.row)"
                type="text"
                size="small"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total,prev, pager, next"
          style="text-align:right;margin-top:16px;"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { to } from "@/common/util";
import { dictList, getMyBrowse } from "@/api/userCenter";
export default {
  data() {
    return {
      time: "",
      loading: false,
      policyTypeList: [],
      policyName: "",
      policyType: "",
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.dictionary("policy_type");
    this.myBrowsing();
  },
  methods: {
    //字典
    async dictionary(dictType) {
      const res = await dictList({ dictType: dictType });
      this.policyTypeList = res.data;
    },
    //获取关注列表
    async myBrowsing() {
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await getMyBrowse({
        page: this.currentPage,
        size: this.pageSize,
        title: this.policyName,
        type: this.policyType,
        startTime: this.time[0],
        endTime: this.time[1],
      });
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      }).close();
      this.tableData = res.data.rows || [];
      this.total = res.data.total - 0;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.myBrowsing();
    },
    //搜索
    getSearch() {
      this.currentPage = 1;
      this.myBrowsing();
    },
    //重置
    getRefresh() {
      this.time = "";
      this.policyName = "";
      this.policyType = "";
      this.currentPage = 1;
      this.myBrowsing();
    },
    //样式
    tableRowStyle() {
      return { "border-color": "rgba(14, 103, 255, 0.23)" };
    },
    //查看详情
    getRepeatedly(row) {
      const { href } = this.$router.resolve({
        path: "/cydn/policyDetails",
        query: {
          id: row.id,
        },
      });
      window.open(href, "_blank");
    },
    delClose() {
      this.$router.push({
        path: "/cydn/userCenter/userInfo",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.policyOn {
  h3 {
    padding-bottom: 20px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0d0d0d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-icon-error {
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
            width: 220px;
          }
        }
      }
    }
    .info_table {
      margin-top: 50px;
      .el-table {
        border: 1px solid rgba(14, 103, 255, 0.23);
      }
    }
  }
  ::v-deep .el-table th.el-table__cell,
  ::v-deep .el-table td.el-table__cell {
    text-align: center;
  }
}
</style>
