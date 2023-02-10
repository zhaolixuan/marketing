<template>
  <div class="chart-title">
    <div class="chart-title-dev">
      <div class="title-wrapper">
        <img :src="require('@/static/images/icon_data.png')" alt="">
        <div class="title">{{ title }}</div>
      </div>
      <div class="select-wrapper" v-show="isShow">
        <p>统计维度</p>
        <el-select v-model="dimension" @change="handleSelect">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
      default: ''
    },
    isShow: {
      typs: Boolean,
      default: false
    }
  },
  data () {
    return {
      dimension: 1,
      options: [{ name: '总金额', id: 1 }, { name: '交易量(千克)', id: 2 }, { name: '交易次数', id: 3 }]
    }
  },
  methods: {
    handleSelect (value) {
      this.$emit('changeDimension', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-title {
  width: 100%;
  // padding: 21px 33px 15px 26px;
  margin-bottom: 26px;
  box-sizing: border-box;
  // background: rgba(75, 182, 255, 0.05);
  position: relative;
  .chart-title-dev{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .title-wrapper {
    display: flex;
    align-items: center;
    img {
      width: 17px;
      height: 17px;
      margin-right: 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #0D0D0D;
    }
  }
  .select-wrapper {
    // position: absolute;
    // right: 33px;
    display: flex;
    z-index: 10;
    p {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 500;
      color: rgba(0, 0, 0, 0.59);
      line-height: 56px;
      margin-right: 5px;
    }
    .el-select {
      line-height: 52px;
      margin-left: 5px;
    }
    ::v-deep .el-input__inner {
      width: 260px;
      height: 32px;
      line-height: 32px;
      background: #ffffff;
      border-radius: 0;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
