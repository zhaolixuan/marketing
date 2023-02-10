<template>
  <div id="user_center">
    <div class="menu_box">
      <center-menu></center-menu>
    </div>
    <div class="content_box_all">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import centerMenu from "./components/centerMenu.vue";
export default {
  components: {
    centerMenu,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getUserInfo");
    console.log(process.env);
  },
};
</script>
<style lang="scss" scoped>
#user_center {
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: relative;
  .menu_box {
    width: 13.5%;
    height: 100%;
    box-sizing: border-box;
  }
  .content_box_all {
    background-color: #f7f8faff;
    position: relative;
    left: 13.5%;
    top: 0;
    width: 86.5%;
    box-sizing: border-box;
    padding: 16px 30px 30px;
    height: 100%;
    min-height: calc(100vh - 40px);
  }
}
</style>
