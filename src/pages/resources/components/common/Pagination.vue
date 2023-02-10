<template>
  <section class="tabListPage">
    <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
      layout="prev, pager, next, jumper, total" :total="totalCount"></el-pagination>
  </section>
</template>
<script>
export default {
  name: 'pagination',
  props: ['currentPage', 'totalCount', 'pageSize'],
  methods: {
    // 当前页
    handleCurrentChange (val) {
      var maxPage = Math.ceil(this.totalCount / this.pageSize)
      if (val > maxPage) {
        // 输入页面大于最大页时传递最大页
        val = maxPage
      }
      // 事件传递
      this.$emit('handleCurrentChangeSub', val)
      this.jumpPage = ''
    }
  }
}
</script>
<style scoped>
.tabListPage /deep/ .el-pagination {
  padding: 0 !important;
}
.tabListPage /deep/ .el-pagination span {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 28px;
}
.tabListPage /deep/ .el-pagination.is-background .el-pager li ,.tabListPage /deep/ .el-pagination.is-background .btn-next,.tabListPage  /deep/ .el-pagination.is-background .btn-prev{
  width: 30px;
  height: 30px;
  border: 1px solid rgba(13, 13, 13, 0.08);
  background: #f7f8fa;
  border-radius: 0;
  font-weight: 400;
}

.tabListPage
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: #0E67FF;
  border: #0E67FF;
}
::v-deep .el-input__inner{
      border-radius: 0 !important;
}
</style>
