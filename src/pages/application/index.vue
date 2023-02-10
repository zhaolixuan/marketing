<template>
  <div class="application">
    <top></top>
    <div class="box">
      <router-view v-if="isReload"></router-view>
    </div>
    
  </div>
</template>
<script>
import top from "./components/top";
export default {
  components: {
    top
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isReload:true
    };
  },
  methods: {
    reload() {
      this.isReload = false;
      this.$nextTick(() => {
        this.isReload = true;
      });
    },
  },
  created(){
    // if(!(window.localStorage.token)){
    //    this.$message('您尚未登录,暂无法使用该应用');
    //    this.$router.push('/login')
    //    return
    // }
  },
  mounted(){
    if(this.$route.path == '/cydn/application') //#endregion
    this.$router.push({path:'/cydn/application/home'})
  },
};
</script>
<style lang="scss" scoped>
.application {
  .box{
    background-color:rgba(245,249,255,1) ;
  }
}
</style>
