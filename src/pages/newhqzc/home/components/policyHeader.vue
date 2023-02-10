<template>
  <div class="policy-list-header">
    <div class="policy-wrap">
      共匹配到
      <div class="policy">{{ value }}</div>
      项政策
    </div>
    <div class="btn" @click="updateRecommendationPolicy">更新推荐政策</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    updateRecommendationPolicy() {
      this.$router.push("/cydn/matching");
    },
  },
};
</script>

<style lang="scss" scoped>
.policy-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  margin: 16px 0 1px;
  height: 56px;
  background: #fff;
  box-sizing: border-box;
  .policy-wrap {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    .policy {
      margin: 0 5px;
      color: #ff9f0a;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 144px;
    height: 36px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(14, 103, 255, 1);
    border: 1px solid currentColor;
    cursor: pointer;
    &:hover {
      background-color: rgba(14, 103, 255, 1);
      color: rgb(255, 255, 255);
    }
  }
}
</style>
