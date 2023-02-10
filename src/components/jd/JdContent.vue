<template>
  <div id="jdContent">
    <div v-if="title" class="title-box">
      <div class="title-left">
        <span class="tit-text">{{title}}</span>
        <slot name="titleLeft"></slot>
      </div>
      <div class="title-right">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'JdContent',
    props: {
      title: {
        type: String,
        require: false,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
#jdContent {
  width: 100%;
  background-color: #fff;
  border-radius: 0.625rem;
  padding: 1.875rem;
  box-sizing: border-box;
  margin-bottom: 1.875rem;
  .title-box {
    padding-bottom: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-left {
      display: flex;
      align-items: center;
      .tit-text {
        font-weight: 600;
        font-size: 1.25rem;
      }
    }
  }
}
</style>
