<template>
  <div id="jdContent">
    <div v-if="title" class="title-box">
      <div class="title-left">
        <span class="tit-text">{{title}}</span>
        <slot name="titleLeft"></slot>
      </div>
      <div class="title-right" @click="getMore">
        <span class="more">{{more}}</span>
        <slot name="titleRight"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "JdContent",
  props: {
    title: {
      type: String,
      require: false,
      default: ""
    },
    more: {
      type: String,
      require: false,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    getMore() {
      this.$emit("goMore", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
#jdContent {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 30px;
  .title-box {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-left {
      display: flex;
      align-items: center;
      .tit-text {
        font-weight: 600;
        font-size: 20px;
      }
    }
    .title-right {
      display: flex;
      align-items: center;
      cursor: pointer;
      .more {
        color: #007fef;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
}
</style>
