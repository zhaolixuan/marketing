<template>
  <div class="home">
    <div class="banner-wrap">
      <div class="banner">
        <img src="../../../static/images/policy_bannar.png" alt="" style="width:100%;height:100%;" v-if="bannerList.length == 0">
        <el-carousel height="490px" arrow="nerver" v-else>
          <el-carousel-item>
            <div class="img">
              <img src="../../../static/images/policy_bannar.png" alt="">
            </div>
            <div class="text">
              
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="search-wrap">
      <div class="search-content">
        <div class="search">
          <el-input
            class="search-input"
            placeholder="请输入搜索关键字"
            suffix-icon="el-icon-search"
            v-model="keyword"
          ></el-input>
          <div class="sesrch-btn" @click="search">查询</div>
        </div>
        <div class="access-precision-policies" @click="authorization">
          <div class="el-icon-right"></div>
          <div class="text">点击这里，获取更精准政策</div>
        </div>
      </div>
    </div>
    <main>
      <div class="main">
        <div class="content">
          <div class="policy-list">
            <el-tabs v-model="policyType" @tab-click="handleClick">
              <el-tab-pane label="政策文件" name="zhnegcewenjian"></el-tab-pane>
              <el-tab-pane label="法律法规" name="falvfagui"></el-tab-pane>
              <el-tab-pane label="通知公告" name="tongzhigonggao"></el-tab-pane>
            </el-tabs>
            <el-table
              :data="policyData"
              :cell-style="handleCellStyle"
              :header-cell-style="handleHeaderCellStyle"
              @row-click="handlePolicyDetails"
            >
              <el-table-column
                label="政策名称"
                prop="title"
                width="355"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                label="发布单位"
                prop="createDepartment"
                width="254"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                label="发布时间"
                prop="issueTime"
                width="130"
              ></el-table-column>
            </el-table>
            <div class="view-all-wrap" @click="handleViewAll">
              <div class="text">查看全部</div>
              <div class="el-icon-arrow-right"></div>
            </div>
          </div>
          <div class="right">
            <div class="policy-data">
              <div class="title">政策数据</div>
              <div class="policy-data-content">
                <div class="policy-data-item">
                  <div class="name">查询次数</div>
                  <div class="value-wrap">
                    <div class="value">{{ numObj[1] }}</div>
                    <div class="unit">次</div>
                  </div>
                </div>
                <div class="policy-data-item">
                  <div class="name">匹配次数</div>
                  <div class="value-wrap">
                    <div class="value">{{ numObj[2] }}</div>
                    <div class="unit">次</div>
                  </div>
                </div>
                <div class="policy-data-item">
                  <div class="name">惠及企业</div>
                  <div class="value-wrap">
                    <div class="value">{{ numObj[4] }}</div>
                    <div class="unit">家</div>
                  </div>
                </div>
                <div class="policy-data-item">
                  <div class="name">政策申请</div>
                  <div class="value-wrap">
                    <div class="value">{{ numObj[3] }}</div>
                    <div class="unit">次</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="popular-policy">
              <div class="title">热门政策</div>
              <div class="popular-policy-content" ref="popular-policy-content">
                <div
                  class="popular-policy-item"
                  v-for="(item, index) in heatList"
                  :key="index"
                  @click="handlePolicyDetail(item)"
                >
                  <div class="popular-policy-item-text">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="floor-title">成功案例</div>
        <div class="successful-cases-wrap">
          <el-carousel height="420px" arrow="never">
            <el-carousel-item>
              <div class="successful-cases-left">
                <img src="../../../static/images/commerce_policy_cases.png" alt="" />
              </div>
              <div class="successful-cases-right">
                <div class="successful-cases-title">电商政策案例</div>
                <div class="successful-cases-text">
                  北京XXX电商初创企业通过城市产业服务平台获得五星级电商指导服务，电商诊断、爆品打造、品牌推广共节省运营成本20万元，获得电商专项补贴资金10万元，免租办公空间100平，电商发展步入快车道
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="successful-cases-left">
                <img src="../../../static/images/science_and_technology.png" alt="" />
              </div>
              <div class="successful-cases-right">
                <div class="successful-cases-title">科技政策案例</div>
                <div class="successful-cases-text">
                 深圳XXX科技创新公司获得一对一的城市信息产业扶持资金申报辅导，城市产业服务平台对企业发展阶段及所属行业深入分析与规划，平台金牌服务商提供量身定制申报方案，顺利帮助企业成功申报获取扶持资金45万元，助力企业完成新技术研发产业升级。
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="successful-cases-left">
                <img src="../../../static/images/system_standard.png" alt="" />
              </div>
              <div class="successful-cases-right">
                <div class="successful-cases-title">体系标准类政策案例</div>
                <div class="successful-cases-text">
                 杭州XXX食品企业通过城市产业服务平台申请ISO9001，10年申报经验辅导老师定制申报方案，申报一次性成功，时间节省一半，助力企业产品出口快人一步。
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="floor-title declaration-process-title">申报流程</div>
        <div class="declaration-process"></div>
      </div>
    </main>
  </div>
</template>

<script>
import { indexGet, indexGetPolicyByType } from "@/api/hqzc.js";
import { authorization } from "@/common/authorization";
import { formatDate } from "@/common/util";
import { getBanner } from "@/api/baseApi";
export default {
  data() {
    return {
      // 政策类型
      policyType: "zhnegcewenjian",
      policyData: [],
      heatList: [],
      numObj: {},
      keyword: "",
      bannerList: [],
    };
  },
  mounted() {
    const dom = this.$refs["popular-policy-content"];
    dom && setTimeout(() => this.infinitScroll(dom), 1000);
    this.getBanner();
    this.indexGetPolicyByType("heat");
    this.indexData();
    this.handleClick();
  },
  methods: {
    getBanner() {
      getBanner({search_EQ_type: "hqzc" }).then(res=>{
        this.bannerList = res.data.rows;
          
      })
    },
    handleHeaderCellStyle() {
      return "height: 38px;background: #EDF2FF;font-size: 14px;font-weight: 500;color: rgba(0, 0, 0, 0.8);line-height: 20px;box-sizing: border-box;padding: 7px 0;";
    },
    handleCellStyle({ row, column, rowIndex, columnIndex }) {
      const styleArr = [
        "font-weight: 500;color: rgba(0, 0, 0, 0.8);",
        "font-weight: 400;color: rgba(0, 0, 0, 0.6);",
        "font-weight: 400;color: rgba(0, 0, 0, 0.4);"
      ];
      return `${styleArr[columnIndex]}font-size: 14px;line-height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 7px 0;cursor: pointer;`;
    },
    /**
     * 无限滚动
     * @param {object} dom 滚动的盒子，需要子元素长度超出父元素
     * @param {number} minChildren 滚动时子元素最低个数
     */
    infinitScroll(dom, minChildren = 7) {
      let timer;
      const stop = () => clearInterval(timer);
      const start = () => {
        // 数据少于表格高度停止滚动
        if (
          dom.children.length <= minChildren - 1 ||
          dom.clientHeight >= dom.scrollHeight
        )
          return;
        timer = setInterval(() => {
          // 元素自增距离顶部1像素
          dom.scrollTop += 1;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (dom.clientHeight + dom.scrollTop === dom.scrollHeight)
            dom.scrollTop = 0;
        }, 50);
      };
      // 鼠标移入，停止滚动
      dom.onmouseover = () => stop();
      // 鼠标移出，继续滚动
      dom.onmouseout = () => start();

      start();
    },
    //政策数据接口
    indexData() {
      indexGet().then(res => {
        this.numObj = res.data.retData;
      });
    },
    handleClick() {
      this.indexGetPolicyByType(this.policyType);
    },
    //	政策文件/法律法规/通知公告/热门政策首页列表接口
    indexGetPolicyByType(type) {
      var that = this;
      indexGetPolicyByType({ type: type }).then(res => {
        res.data.retData.forEach(item => {
          item.createDepartment = this.addDefaultValue(item.createDepartment);
          item.title = this.addDefaultValue(item.title);
          item.issueTime = this.addDefaultValue(formatDate(Number(item.issueTime), "yyyy年MM月dd日"))
        });
        if (type == "heat") {
          that.heatList = res.data.retData;
        } else {
          that.policyData = res.data.retData;
        }
      });
    },
    // 跳转到详情
    handlePolicyDetails(row, column, event) {
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: row.id
        }
      });
    },
    // 查看更多
    handleViewAll() {
      this.$router.push({
        path: "/cydn/hqzc/policyQuery",
        query: {
          policyType: this.policyType
        }
      });
    },
    search() {
      if (this.keyword.length > 50) {
        this.$alert("政策名称最多可输入50个字符", "提示", {
          confirmButtonText: "确定",
          center: true,
          customClass: "alert",
          iconClass: "alert-icon",
          showClose: false
        });
        return;
      }
      this.$router.push({
        path: "/cydn/hqzc/policyQuery",
        query: {
          keyword: this.keyword
        }
      });
    },
    async authorization() {
      let isAuth = await authorization.call(this);
      if (isAuth) {
        this.$router.push("/cydn/hqzc/policyMatching");
      }
    },
    handlePolicyDetail(item) {
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: item.id
        }
      });
    },
    addDefaultValue(value, defaultValue = "--"){
      return value === null || value === undefined || value === "" ? defaultValue : value;
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.home {
  background: #f2f7fb;
  .banner-wrap {
    width: 100%;
    height: 490px;
    background: url("~@/static/images/hqzc_bg.png") no-repeat;
    background-size: cover;
    .banner {
      width: $w;
      height: 490px;
      margin: 0 auto;
      ::v-deep .el-carousel {
        .el-carousel__container {
          .el-carousel__item {
            .img {
              width: 100%;
              height: 100%;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .text {
              position: absolute;
              left: 24px;
              bottom: 13px;
              width: 900px;
              height: 33px;
              font-size: 24px;
              font-weight: 500;
              color: #ffffff;
              line-height: 33px;
              text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .el-carousel__indicators {
          left: calc(100% - 122px);
          bottom: 25px;
          transform: translateX(0);
          .el-carousel__indicator {
            padding: 0 10px;
            &:last-child,
            &:first-child {
              padding: 0 9px;
            }
            &.is-active {
              .el-carousel__button {
                opacity: 1;
              }
            }
            .el-carousel__button {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #ffffff;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
  .search-wrap {
    height: 149px;
    margin-bottom: 21px;
    background: rgba(14, 103, 255, 0.03);
    .search-content {
      width: $w;
      height: 100%;
      padding: 38px 50px 0;
      margin: 0 auto;
      box-sizing: border-box;
      .search {
        display: flex;
        box-shadow: 0px 0px 10px 6px rgba(14, 103, 255, 0.07);
        .search-input {
          width: 998px;
          margin-right: 15px;
          ::v-deep .el-input__inner {
            height: 40px;
            background: linear-gradient(180deg, #f3f7ff 0%, #fcfdfe 100%);
            border-radius: 8px;
            border: 1px solid #ffffff;
          }
        }
        .sesrch-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 86px;
          height: 40px;
          background: #0e67ff;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }
      .access-precision-policies {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 18px;
        font-size: 18px;
        font-weight: 400;
        color: #0e67ff;
        line-height: 24px;
        cursor: pointer;
        .el-icon-right {
          margin-right: 8px;
        }
        .text {
          text-decoration: underline;
        }
      }
    }
  }
  main {
    .main {
      width: $w;
      margin: 0 auto;
      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .policy-list {
          width: 794px;
          height: 538px;
          padding: 17px 36px 17px 17px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 8px;
          ::v-deep .el-tabs {
            .el-tabs__active-bar {
              background-color: #1492ff;
            }
            .el-tabs__item {
              width: 120px;
              padding: 0 12px;
              text-align: center;
              font-size: 16px;
              font-weight: 600;
              color: #333333;
              height: 38px;
              line-height: 38px;
              &.is-active {
                color: #0e67ff;
              }
            }
            .el-tabs__nav-wrap::after {
              display: none;
            }
          }
          ::v-deep .el-table {
            border: 1px solid rgba(14, 103, 255, 0.08);
          }
          .view-all-wrap {
            display: flex;
            align-items: center;
            margin-top: 13px;
            font-size: 14px;
            font-weight: 400;
            color: #0e67ff;
            line-height: 20px;
            cursor: pointer;
            .text {
              margin-right: 10px;
            }
          }
        }
        .right {
          .policy-data {
            width: 390px;
            height: 245px;
            padding: 15px 32px 19px 45px;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 8px;
            .title {
              font-size: 18px;
              font-weight: 500;
              color: #0d0d0d;
              line-height: 25px;
              padding-left: 29px;
              margin-left: -29px;
              background: url("~@/static/images/icon_policy_data.png") no-repeat;
              background-size: 21px;
            }
            .policy-data-content {
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              margin-top: 20px;
              .policy-data-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                &:not(:last-child) {
                  margin-bottom: 26px;
                }
                .name {
                  color: #0d0d0d;
                }
                .value-wrap {
                  display: flex;
                  align-items: center;
                  .value {
                    margin-right: 7px;
                    font-size: 28px;
                    color: #ff700d;
                  }
                  .unit {
                    font-weight: 400;
                    color: rgba(13, 13, 13, 0.6);
                  }
                }
              }
            }
          }
          .popular-policy {
            margin-top: 16px;
            width: 390px;
            height: 277px;
            padding: 18px 35px 17px 15px;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 8px;
            .title {
              padding-left: 31px;
              font-size: 18px;
              font-weight: 500;
              color: #0d0d0d;
              line-height: 25px;
              background: url("~@/static/images/icon_popular_policy.png")
                no-repeat;
              background-size: 24px;
            }
            .popular-policy-content {
              margin-top: 13px;
              height: 200px;
              overflow: hidden;
              .popular-policy-item {
                display: flex;
                align-items: center;
                padding-left: 7px;
                margin: 12px 0;
                cursor: pointer;
                &::before {
                  display: block;
                  content: "";
                  width: 8px;
                  height: 8px;
                  background: #0e67ff;
                  transform: rotate(45deg);
                }
                .popular-policy-item-text {
                  margin-left: 10px;
                  width: 313px;
                  font-size: 16px;
                  font-weight: 400;
                  color: rgba(13, 13, 13, 0.9);
                  line-height: 22px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
      .floor-title {
        padding: 0 54px;
        margin: 38px auto 21px;
        width: 120px;
        font-size: 30px;
        font-weight: 500;
        color: #0d0d0d;
        line-height: 42px;
        background: url("../../../static/images/beat_left.png") no-repeat left
            center,
          url("../../../static/images/beat_right.png") no-repeat right center;
        background-size: 26px 20px;
      }
      .successful-cases-wrap {
        ::v-deep .el-carousel {
          .el-carousel__container {
            .el-carousel__item {
              display: flex;
              background-color: #fff;
              border-radius: 8px;
              .successful-cases-left {
                width: 642px;
                height: 420px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .successful-cases-right {
                width: 558px;
                height: 420px;
                padding: 54px 35px 40px 52px;
                box-sizing: border-box;
                .successful-cases-title {
                  font-size: 24px;
                  font-weight: 500;
                  color: #0d0d0d;
                  line-height: 33px;
                  margin-bottom: 16px;
                }
                .successful-cases-text {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 8;
                  overflow: hidden;
                  font-size: 16px;
                  font-weight: 400;
                  color: #595959;
                  line-height: 33px;
                }
              }
            }
          }
          .el-carousel__indicators {
            .el-carousel__indicator {
              &.is-active {
                .el-carousel__button {
                }
              }
            }
          }
        }
      }
      .declaration-process-title {
        margin: 64px auto 40px;
      }
      .declaration-process {
        width: 1200px;
        height: 130px;
        background: url("~@/static/images/declaration_process_old.png") no-repeat;
        background-size: cover;
        margin-bottom: 84px;
      }
    }
  }
}
</style>
