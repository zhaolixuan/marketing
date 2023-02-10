<template>
  <div id="tracks">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">我的足迹</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <div class="top_track">
        <h3 class="h3">我的足迹</h3>
        <p class="p" @click.stop="getBatchDeleteAll('all')">
          <i class="el-icon-delete"></i>
          <span>全部清除</span>
        </p>
      </div>

      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="今天" placement="top" color="#CCE5FC">
            <div class="delete" @click.stop="getBatchDeleteToday('today')">删除</div>
            <div class="card_list" v-if="listDataToday.length > 0">
              <div
                class="card_list_item"
                v-for="item in listDataToday"
                :key="item.index"
                @click.stop="goInfoPage(item)"
              >
                <el-image class="card_item_img" :src="imgUrl+item.goodsPictureOne" fit="cover"></el-image>
                <div class="card_item_text">
                  <div class="card_item_name">{{item.goodsName}}</div>
                  <div class="card_item_bottom">
                    <div class="card_item_price">
                      <span class="price_symbol">￥</span>
                      <span class="price_num">{{item.goodsPrice}}</span>
                    </div>
                    <span class="card_item_cancel" @click.stop="cancelCollect(item)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="no_data" v-else>暂时没有今天的足迹</div>
          </el-timeline-item>
          <el-timeline-item timestamp="昨天" placement="top" color="#CCE5FC">
            <div class="delete" @click.stop="getBatchDeleteYester('yester')">删除</div>
            <div class="card_list" v-if="listDataYesterday.length > 0">
              <div
                class="card_list_item"
                v-for="item in listDataYesterday"
                :key="item.index"
                @click.stop="goInfoPage(item)"
              >
                <el-image class="card_item_img" :src="imgUrl+item.goodsPictureOne" fit="cover"></el-image>
                <div class="card_item_text">
                  <div class="card_item_name">{{item.goodsName}}</div>
                  <div class="card_item_bottom">
                    <div class="card_item_price">
                      <span class="price_symbol">￥</span>
                      <span class="price_num">{{item.goodsPrice}}</span>
                    </div>
                    <span class="card_item_cancel" @click.stop="cancelCollect(item)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="no_data" v-else>暂时没有昨天的足迹</div>
          </el-timeline-item>
          <el-timeline-item timestamp="更早之前" placement="top" color="#CCE5FC">
            <div class="delete_last" @click.stop="getBatchDeleteBefore('before')">删除</div>
            <div class="card_list" v-if="listDataLast.length >0">
              <div
                class="card_list_item"
                v-for="item in listDataLast"
                :key="item.index"
                @click.stop="goInfoPage(item)"
              >
                <el-image class="card_item_img" :src="imgUrl+item.goodsPictureOne" fit="cover"></el-image>
                <div class="card_item_text">
                  <div class="card_item_name">{{item.goodsName}}</div>
                  <div class="card_item_bottom">
                    <div class="card_item_price">
                      <span class="price_symbol">￥</span>
                      <span class="price_num">{{item.goodsPrice}}</span>
                    </div>
                    <span class="card_item_cancel" @click.stop="cancelCollect(item)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="no_data" v-else>暂时没有更早之前的足迹</div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMyTracks,
  getMyTracksDelete,
  getMyTracksBatchDelete
} from "@/api/userCenter";

export default {
  data() {
    return {
      formData: {
        nowPass: null
      },
      listDataToday: [],
      listDataYesterday: [],
      listDataLast: [],
      curPage: 1,
      pageSize: 12,
      imgUrl: process.env.VUE_APP_IMG_URL
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 收藏商品列表
    getList() {
      let params = {
        page: this.curPage,
        rows: this.pageSize
      };
      getMyTracks().then(res => {
        if (res.data.success) {
          this.listDataToday = res.data.map.todayList;
          this.listDataYesterday = res.data.map.yesterList;
          this.listDataLast = res.data.map.beforeList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 单个删除
    cancelCollect(row) {
      let params = {
        goodsId: row.id
      };
      this.$confirm("此操作将把该数据项从列表中删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        getMyTracksDelete(params).then(res => {
          if (res.data.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    // 今天批量删除
    getBatchDeleteToday(types){
      if(this.listDataToday.length !== 0){
            this.$confirm(
          `此操作将把列表中今日数据全部删除, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          let params = {
            delType: types
          };
          getMyTracksBatchDelete(params).then(res => {
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
      }
    },
    // 昨天批量删除
    getBatchDeleteYester(types){
      if(this.listDataYesterday.length !== 0){
        this.$confirm(
          `此操作将把列表中昨日数据全部删除, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          let params = {
            delType: types
          };
          getMyTracksBatchDelete(params).then(res => {
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
      }
        
    },
    // 更早批量删除
    getBatchDeleteBefore(types){
      if(this.listDataLast.length !== 0){
        this.$confirm(
          `此操作将把列表中更早之前数据全部删除, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          let params = {
            delType: types
          };
          getMyTracksBatchDelete(params).then(res => {
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
      }
    },
    // 全部批量删除
    getBatchDeleteAll(types){
        this.$confirm(
          `此操作将清空全部数据, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          let params = {
            delType: types
          };
          getMyTracksBatchDelete(params).then(res => {
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
    },
    // 商品详情
    goInfoPage(row) {
      this.$router.push({
        path: "/cydn/retail/commodity",
        query: {
          goodsId: row.id,
          shopId: row.decoraShopId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#tracks {
  .bread {
    ::v-deep .is-link {
      font-size: 14px;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      color: #929292;
    }
    ::v-deep .diff {
      font-size: 14px;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      color: #0d0d0d;
      .el-breadcrumb__inner {
        font-weight: 600;
      }
    }
  }
  .content_box {
    width: 100%;
    background: #ffffff;
    margin-top: 15px;
    border-radius: 10px;
    padding: 23px 31px 0px 29px;
    box-sizing: border-box;
    .top_track {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .h3 {
        font-size: 20px;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
        font-weight: 600;
        color: #0d0d0d;
      }
      .p {
        cursor: pointer;
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #007fef;
        i {
          font-size: 16px;
          margin-right: 6px;
        }
      }
    }

    .block {
      margin-top: 29px;
      position: relative;
      .delete {
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
        font-weight: 500;
        color: #929292;
        position: absolute;
        top: 6px;
        left: 75px;
        cursor: pointer;
      }
      .delete_last {
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
        font-weight: 500;
        color: #929292;
        position: absolute;
        top: 6px;
        left: 108px;
        cursor: pointer;
      }
      ::v-deep .el-timeline-item__timestamp.is-top {
        font-size: 16px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        font-weight: 400;
        color: #0d0d0d;
      }
      .card_list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-left: 41px;
        margin-top: 20px;
        margin-bottom: 45px;
        box-sizing: border-box;
        &:last-child {
          margin-bottom: 0;
        }
        .card_list_item {
          position: relative;
          padding: 25px 24px 22px 26px;
          width: 16%;
          height: 294px;
          cursor: pointer;
          background-color: #fff;
          border-top: 1px solid #f0f0f0ff;
          border-right: 1px solid #f0f0f0ff;
          border-bottom: 1px solid #f0f0f0ff;
          box-sizing: border-box;
          &:nth-child(1) {
            border-left: 1px solid #f0f0f0ff;
            border-top-left-radius: 10px;
          }
          &:nth-child(6) {
            border-top-right-radius: 10px;
          }
          &:nth-child(7) {
            border-left: 1px solid #f0f0f0ff;
            border-top: none;
            border-bottom-left-radius: 10px;
          }
          &:nth-child(8) {
            border-top: none;
          }
          &:nth-child(9) {
            border-top: none;
          }
          &:nth-child(10) {
            border-top: none;
          }
          &:nth-child(11) {
            border-top: none;
          }
          &:nth-child(12) {
            border-top: none;
            border-bottom-right-radius: 10px;
          }
          .card_item_img {
            width: 100%;
            height: 169px;
          }
          .card_item_text {
            height: calc(100% - 164px);
            padding: 15px 0 0px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .card_item_name {
              font-size: 13px;
              font-weight: bold;
              color: #595959;
              line-height: 21px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom: 10px;
            }
            .card_item_bottom {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .card_item_price {
                color: #ec0810;
                font-size: 16px;
                font-weight: 600;
                .price_symbol {
                  font-size: 15px;
                }
              }
              .card_item_cancel {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
                width: 25px;
                height: 25px;
                background: #f0f0f0;
                border-radius: 0px 0px 0px 8px;
                font-size: 14px;
                color: #929292;
                padding-bottom: 2px;
                box-sizing: border-box;
                i {
                  margin-left: 6px;
                  margin-top: 5px;
                }
              }
            }
          }
          &:hover .card_item_text .card_item_bottom .card_item_cancel {
            display: block;
          }
        }
      }
      .no_data {
        text-align: center;
        color: #333;
      }
    }
  }
}
</style>
