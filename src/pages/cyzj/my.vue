<template>
  <div class="cyzj app-container">
     <div class="search-wrap">
       <div>
         <el-input v-model="input" placeholder="请输入专家姓名" class="placeholder"></el-input>
       </div>
       <div>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="placeholder"></el-date-picker>
       </div>
       <div>
          <el-select v-model="value" placeholder="回复状态" class="placeholder">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </div>
       <div>
          <el-input v-model="input" placeholder="预约次数" class="placeholder"></el-input>
       </div>
       <div>
          <el-button type="primary" class="placeholder">查询</el-button>
          <el-button class="placeholder">重置</el-button>
       </div>
     </div>
     <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="ID编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="被预约专家姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="预约次数">
          </el-table-column>
           <el-table-column
            prop="address"
            label="回复状态">
          </el-table-column>
           <el-table-column
            prop="address"
            label="回复时间">
          </el-table-column>
           <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="operation">查看</el-button>
              <el-button type="text" class="operation" @click="repeatService">再次预约</el-button>
            </template> 
          </el-table-column>
        </el-table>
        <div class="content-page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              page-size="10"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
        </div>
     </div>
      <!-- 再次预约弹出框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="20%">
          <el-result icon="success" title="系统已经收到您的反馈，请耐心等待，谢谢 ^-^" ></el-result>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看弹出框 -->
      <el-dialog
      title="专家预约"
      :visible.sync="seeDialog"
      width='40%'>
      <div class="content">
        内容
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="senSubmit">提交预约</el-button>
      </span>
      </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
export default {
  data() {
    return {
      imgurl: process.env.VUE_APP_IMG_URL,
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        total:100,
        currentPage:1,
        dialogVisible:false,
        seeDialog:true
    };
  },
  mounted() {
   
  },
  methods: {
   handleCurrentChange(page){},
   repeatService(){
     this.dialogVisible = true
   }
  }
};
</script>
<style lang="scss" scoped>



.cyzj{
  .search-wrap{
    width: 100%;
    display: flex;
    justify-content: space-between;
    &>div{
      width: 17%;
    }
  }
  .table-wrap{
    margin-top: 25px;
    .content-page{
        text-align: right;
        margin: 15px 15px 0 0;
    }
  }
}

.lnms {
    font-size: 30px;
    .placeholder{
      font-size: 18px;
    }
  .operation{
    font-size: 20px;
  }
}
</style>
