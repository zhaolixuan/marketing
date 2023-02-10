<template>
  <div class="container">
    <div class="title-wrap">
      <div class="icon"></div>
      <div class="title">
        {{ title }}
        <div class="sub-title">{{ subtitle }}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      typs: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  .title-wrap {
    display: flex;
    align-items: flex-start;
    .icon {
      width: 18px;
      height: 18px;
      margin-right: 11px;
      background-image: url("~@/static/images/icon_data.png");
      background-size: cover;
      flex-shrink: 0;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: rgba(13,13,13,1);
      word-break: break-all;
      .sub-title {
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(13,13,13,0.68);
      }
    }
  }
}
</style>
