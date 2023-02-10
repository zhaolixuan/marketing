<template>
  <div id="jd_pagination" style="text-align: right;">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    pageSize: {
      type: Number,
      require: true,
      default: 10
    },
    total: {
      type: Number,
      require: true,
      default: 0
    },
    currentPage: {
      type: Number,
      require: true,
      default: 1
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
#jd_pagination {
  // width: 700px;
  ::v-deep .el-pagination {
    // position: relative;
    .btn-prev,.btn-next, .el-pager>li {
      border-radius: 8px;
    }
    // .el-pagination__total {
    //   position: absolute;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   right: 0;
    // }
  }
  ::v-deep .el-pagination__total {
    color: #0D0D0D;
    font-size: 14px;
  }
  ::v-deep .el-pagination.is-background .btn-next, ::v-deep .el-pagination.is-background .btn-prev, ::v-deep .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: #fff;
    color: #606266;
    min-width: 32px;
    border-radius: 0px;
    height: 32px;
    line-height: 32px;
  }
  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0E67FF;
    color: #fff;
  }
  ::v-deep .el-pagination__jump {
    color: rgba(0,0,0,0.7);
  }
  ::v-deep .el-input__inner {
    border:none;
    border-radius: 0px;
  }
} 
</style>
