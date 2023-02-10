<template>
  <button
    class="login-btn"
    :class="{ active: active }"
    :style="{ width: width + 'px' }"
    :disabled="!active"
    @click="click"
  >
    <slot>确认</slot>
  </button>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 320,
    },
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
.login-btn {
  width: 400px;
  height: 48px;
  box-sizing: border-box;
  background: rgba($color: #0e67ff, $alpha: 0.36);
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-top: 40px;
  cursor: pointer;
}
.active {
  background: #0e67ff !important;
  border-color: #0e67ff !important;
}
</style>
