<template>
  <div class="record app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="态势感知">
        <recordT></recordT>
        <recordC></recordC>
        <recordB></recordB> 
      </el-tab-pane>
      <el-tab-pane label="内容管理">
        <contentManage></contentManage>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>
<script>
import recordT from "./components/record_t.vue";
import recordC from "./components/record_c.vue";
import recordB from "./components/record_b.vue";
import contentManage from "./components/content_manage.vue";
export default {
  components: {
    recordT,
    recordC,
    recordB,
    contentManage
  },
  data() {
    return {
     
    };
  },
  mounted() {
   
  },
  methods: {
  
  },
};
</script>
<style lang="scss" scoped>
  .record{
    //margin:20px auto;
  }
</style>
