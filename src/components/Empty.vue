
<template>
  <div class="empty">
    <div class="image">
      <img src="../static/images/empty.png" alt="" />
    </div>
    <div class="desc">暂无数据</div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 27px 0 113px;
  .image {
    width: 400px;
    height: 240px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc {
    // width: 100px;
    // height: 36px;
    margin-top: 5px;
    font-size: 25px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0a88ff;
    line-height: 36px;
  }
}
</style>
