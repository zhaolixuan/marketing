<template>
  <div class="label-wrap" :class="{ bottomline: bottomLine }">
    <div class="label-title">{{ name }}</div>
    <div class="label-content">
      <div
        class="label-item"
        v-for="item in data"
        :key="item.value"
        :class="{ active: active === item.value }"
        @click="handleClick(item.value)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    data: {
      tyep: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: "",
    },
    bottomLine: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick(value){
      this.$emit("update:active", value);
      this.$emit("change");
    }
  }
};
</script>

<style lang="scss" scoped>
.label-wrap {
  display: flex;
  align-content: flex-start;
  padding: 24px 0;
  margin: 0 20px;
  box-sizing: border-box;
  &.bottomline{
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  }
  .label-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 80px;
    margin: 0 14px 0 10px;
    height: 28px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0px;
  }
  .label-content {
    display: flex;
    flex-wrap: wrap;
    .label-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 18px;
      min-width: 68px;
      margin-bottom: 4px;
      height: 28px;
      font-size: 16px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
      &.active {
        font-weight: 500;
        color: #fff;
        background: rgba(14, 103, 255, 1);
      }
      &:not(:last-child){
        margin-right: 10px;
      }
      cursor: pointer;
    }
  }
}
</style>
