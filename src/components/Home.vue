<template>
  <div class="wrapper">
    <v-head></v-head>
    <router-view></router-view>
    <div id="retail"></div>
    <div id="bmc"><!--商家管理中心--></div>
    <v-footer v-show="isShowFooter"></v-footer>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vFooter from "@/components/Footer.vue";
import { start } from "qiankun";
export default {
  data() {
    return {
      collapse: false,
      isShowFooter: null
    };
  },
  components: {
    vHead,
    vFooter
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
  watch: {
    $route: {
      handler: function(e) {
        if(e.path.indexOf('/bmc/') !== -1) {
          this.isShowFooter = false
        } else {
          this.isShowFooter = true
        }
      },
      immediate: true
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
