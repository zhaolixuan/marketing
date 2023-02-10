<template>
  <div class="policyDeclare">
    <h3>政策申报<i class="el-icon-error" @click="delClose"></i></h3>
    <div class="content_box">
      <el-row :gutter="30">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <p>政策名称</p>
              <el-input v-model="policyName" placeholder="请输入内容政策名称"></el-input>
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
            <p>申请时间</p>
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
          :header-cell-style="{background:'#ECF3FE',color:'rgba(0,0,0,0.8)',fontSize:'14px'}"
        >
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="declarationPolicy" label="政策名称" width="500">
            <template slot-scope="scope">
              <span>{{scope.row.declarationPolicy || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDepartment" label="发布单位">
            <template slot-scope="scope">
              <span>{{scope.row.createDepartment || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="typeName" label="政策类型">
            <template slot-scope="scope">
              <span>{{scope.row.typeName || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | hendelDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              >取消申报</el-button>
              <el-button
                @click="getRepeatedly(scope.row)"
                type="text"
                size="small"
              >查看详情</el-button>
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
    </div>
  </div>
</template>
<script>
import { formatDate, to } from "@/common/util";
import { dictList, myDeclare, removeByIds } from "@/api/userCenter";
import api from "@/api/cyzjApi";
export default {
  data() {
    return {
      time: "",
      loading: false,
      policyTypeList:[],
      policyName:"",
      policyType:"",
      tableData: [],
      total: 0,
      curPage: 1,
      pageSize: 10,

    };
  },
  components: {
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd");
      this.$forceUpdate();
    }
  },
  mounted() {
    this.dictionary('policy_type');
    this.myDeclare();
  },
  methods: {
    //字典
    dictionary(dictType) {
      dictList({dictType:dictType}).then(res=>{
        if(dictType=='policy_type'){ // 企业类型
          this.policyTypeList = res.data;
        }
      })
    },
    //获取申请列表
    myDeclare() {
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      myDeclare({
        page:this.curPage,
        rows:this.pageSize,

        declarationPolicy:this.policyName,
        type:this.policyType,
        startApplyTime:this.time[0],
        endApplyTime:this.time[1],
        
      }).then(res=>{
        this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      }).close();
        this.tableData = res.data.rows;
        this.total = Number(res.data.total);
      })
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.curPage = val;
      this.myDeclare();
    },
    //搜索
    getSearch() {
      this.curPage = 1;
      this.myDeclare();
    },
    //重置
    getRefresh() {
      this.time = "";
      this.policyName = "";
      this.policyType = "";
      this.curPage = 1;
      this.myDeclare();
    },
    //样式
    tableRowStyle() {
      return { "border-color": "rgba(14, 103, 255, 0.23)" };
    },
    //取消申请
    handleClick(row) {
      this.$alert("此操作将撤销申报，是否继续？", "提示", {
        callback: async (status) => {
          if(status=="confirm"){
            const [err, res] = await to(removeByIds({ids:row.id}));
              if(err){
                  this.$message({
                    type: 'warning',
                    message: res.data.message
                  })
                  
                }else{
                  this.$message({
                    type: 'success',
                    message: "已取消申报"
                  })
                  this.myDeclare();
                }
          }else{
            this.$message({
              type: 'info',
              message: "已取消操作"
            });  
          }
        },
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        center: true,
        customClass: "alert",
        iconClass: "alert-icon",
        showClose: false
      });
    },
    //查看详情
    getRepeatedly(row) {
      const { href } = this.$router.resolve({
        path: "/cydn/policyDetails",
        query: {
          id: row.policyId,
          show: false
        },
      });
      window.open(href, "_blank");
    },
    delClose(){
      this.$router.push({
        path:"/cydn/userCenter/userInfo"
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.policyDeclare {
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
  ::v-deep .el-table th.el-table__cell,::v-deep .el-table td.el-table__cell{
    text-align: center;
  }
}
</style>
