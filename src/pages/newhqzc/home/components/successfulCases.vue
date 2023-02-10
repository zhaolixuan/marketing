<template>
  <div class="successful-cases-wrap" :class="{ active: isActive }">
    <slot></slot>
    <div class="successful-cases-content content">
      <div class="title">成功案例</div>
      <el-carousel height="500px">
        <el-carousel-item v-for="item in carousels" :key="item.title">
          <div class="successful-cases-left">
            <div class="successful-cases-title">{{ item.title }}</div>
            <div class="successful-cases-text">
              {{ item.text }}
            </div>
          </div>
          <div class="successful-cases-right">
            <img :src="item.src" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { carousels } from "../../data";
export default {
  data() {
    return {
      carousels: carousels,
      isActive: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.successful-cases-wrap {
  // max-height: 2181px;
  background: url("~@/static/images/successful_cases_bg.png");
  background-size: cover;
  &.active {
    max-height: 2425px;
  }
  .successful-cases-content {
    width: $w;
    margin: 0 auto;
    transform: translateY(-220px);
    .title {
      margin-bottom: 24px;
      font-size: 36px;
      font-weight: 600;
      color: #fff;
    }
    ::v-deep .el-carousel {
      .el-carousel__container {
        .el-carousel__item {
          display: flex;
          background-color: #fff;
          .successful-cases-left {
            width: 610px;
            height: 500px;
            padding: 136px 95px 50px 93px;
            box-sizing: border-box;
            .successful-cases-title {
              font-size: 44px;
              font-weight: 600;
              color: rgba(2, 90, 229, 1);
              margin-bottom: 31px;
            }
            .successful-cases-text {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 8;
              overflow: hidden;
              font-size: 18px;
              font-weight: 500;
              color: rgba(34, 34, 34, 1);
              line-height: 33px;
            }
          }
          .successful-cases-right {
            width: 590px;
            height: 500px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-carousel__arrow {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 40px 5px rgba(230, 230, 230, 0.3);
  &.el-carousel__arrow--left {
    background: url("~@/static/images/left_arrow.png");
    background-size: cover;
  }
  &.el-carousel__arrow--right {
    background: url("~@/static/images/right_arrow.png");
    background-size: cover;
  }
}
::v-deep .el-carousel__indicator {
  &.is-active {
    .el-carousel__button {
      width: 40px;
      height: 9px;
      background: rgba(207, 213, 220, 1);
      border-radius: 5px;
    }
  }
  .el-carousel__button {
    width: 10px;
    height: 9px;
    background: rgba(225, 229, 234, 1);
    border-radius: 5px;
    transition: width 0.5s linear 0s;
  }
}
</style>
