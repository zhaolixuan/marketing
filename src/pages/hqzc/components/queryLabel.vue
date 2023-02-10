<template>
  <div class="query-label">
    <div class="name">{{ name }}</div>
    <div class="content">
      <div
        class="label"
        :class="{ active: active === item.value }"
        v-for="item in data"
        :key="item.title"
        @click="update(item.value)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标签名
    name: {
      type: String,
      required: true
    },
    // 数据
    data: {
      type: Array,
      required: true
    },
    // 选中标签
    active: {
      type: String,
      required: true
    }
  },
  methods: {
    update(value) {
      this.$emit("update:active", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.query-label {
  display: flex;
  .name {
    flex: 0 0 80px;
    width: 80px;
    min-height: 22px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    line-height: 22px;
    margin-right: 21px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    .label {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 22px;
      margin-right: 16px;
      cursor: pointer;
      &.active {
        font-family: "Microsoft YaHei";
        font-weight: 500;
        color: #0e67ff;
      }
    }
  }
}
</style>
