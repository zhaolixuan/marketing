<template>
  <div id="app" style="background: rgba(247, 247, 247, 1)">
    <router-view></router-view>
  </div>
</template>
<script>
import DevicePixelRatio from "./common/devicePixelRatio";
export default {
  data() {
    return {};
  },
  created() {
    // new DevicePixelRatio().init();
    this.$store.dispatch("getUserInfo").then((res) => {});
  },
};
</script>

<style>
/* @import url("./common/common.css"); */
@import url("./common/iconfont/iconfont.css");
</style>
<style lang="scss">
@import "./common/authorization.scss";
</style>
