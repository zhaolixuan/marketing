<template>
  <div class="declaration-process-wrap">
    <div class="declaration-process-content content">
      <div class="declaration-process">
        <div class="title">申报流程</div>
        <div class="declaration-process-main"></div>
      </div>
      <div class="common-problem">
        <div class="title">常见问题</div>
        <div class="common-problem-main">
          <div class="common-problem-item-wrap" id="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="common-problem-item">
                  <div class="common-problem-title">
                    {{ commonProblem[0].problem }}
                  </div>
                  <div class="common-problem-text">
                    {{ commonProblem[0].answer }}
                  </div>
                </div>
                <div class="common-problem-item">
                  <div class="common-problem-title">
                    {{ commonProblem[1].problem }}
                  </div>
                  <div class="common-problem-text">
                    {{ commonProblem[1].answer }}
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="common-problem-item">
                  <div class="common-problem-title">
                    {{ commonProblem[2].problem }}
                  </div>
                  <div class="common-problem-text">
                    {{ commonProblem[2].answer }}
                  </div>
                </div>
                <div class="common-problem-item">
                  <div class="common-problem-title">
                    {{ commonProblem[3].problem }}
                  </div>
                  <div class="common-problem-text">
                    {{ commonProblem[3].answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <!-- <div class="btn">在线咨询</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/static/js/swiper.min.js";
import "@/static/css/swiper.min.css";
import { commonProblem } from "../data";
export default {
  data() {
    return {
      commonProblem: commonProblem,
    };
  },
  mounted() {
    const swiper = new Swiper("#swiper", {
      direction: "vertical",
      loop: true,
      autoplay: 5000,
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.declaration-process-wrap {
  height: 609px;
  .declaration-process-content {
    display: flex;
    width: $w;
    margin: 0 auto;
    padding-top: 60px;
    box-sizing: border-box;
    .declaration-process {
      margin-right: 16px;
      .title {
        margin-bottom: 24px;
        font-size: 36px;
        font-weight: 600;
        color: rgba(29, 29, 31, 1);
      }
      .declaration-process-main {
        width: 591px;
        height: 415px;
        background: url("~@/static/images/declaration_process.png");
        background-size: cover;
        box-shadow: 0 2px 40px 5px rgba(230, 230, 230, 0.3);
      }
    }
    .common-problem {
      .title {
        margin-bottom: 24px;
        font-size: 36px;
        font-weight: 600;
        color: rgba(29, 29, 31, 1);
      }
      .common-problem-main {
        padding: 50px 44px 50px 43px;
        width: 591px;
        height: 415px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 40px 5px rgba(230, 230, 230, 0.3);
        box-sizing: border-box;
        .common-problem-item-wrap {
          height: 231px;
          overflow: hidden;
          .common-problem-item {
            &:not(:first-child) {
              margin-top: 33px;
            }
            .common-problem-title {
              margin-bottom: 10px;
              font-size: 22px;
              font-weight: 500;
              color: rgba(228, 117, 10, 1);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .common-problem-text {
              font-size: 14px;
              font-weight: normal;
              color: rgba(34, 34, 34, 1);
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              line-height: 1.5;
            }
          }
        }

        .line {
          margin: 0px auto 29px;
          width: 489px;
          height: 1px;
          background-color: rgba(220, 220, 220, 1);
        }
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          float: right;
          width: 116px;
          height: 42px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: rgba(14, 103, 255, 1);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
