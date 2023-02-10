<template>
  <div class="goodsCollection">
    <h3>商品收藏<i class="el-icon-error" @click="delClose"></i></h3>
    <div class="content_box">
      <div v-if="listData.length > 0">
        <div class="card_list">
          <div class="card_list_item" v-for="item in listData" :key="item.index" @click.stop="goInfoPage(item)">
            <el-image class="card_item_img" :src="imgUrl+item.goodsPictureOne" fit="cover"></el-image>
            <div class="card_item_text">
              <div class="card_item_name">{{item.goodsName}}</div>
              <div class="card_item_bottom">
                <div class="card_item_price">
                  <span class="price_symbol">￥</span>
                  <span class="price_num">{{item.goodsPrice}}</span>
                </div>
                <span class="card_item_cancel" @click.stop="cancelCollect(item)"><i class="el-icon-delete"></i>删除</span>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          style="text-align:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
      <div class="no_data" v-else>暂时没有收藏商品</div>
    </div>
  </div>
</template>

<script>
import {getListCollectGoodsWeb, collectGoods} from '@/api/userCenter'
  export default {
    name: 'goodsCollection',
    data() {
      return {
        imgUrl: process.env.VUE_APP_IMG_URL,
        total: 0,
        curPage: 1,
        pageSize: 12,
        listData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      delClose(){
        this.$router.push({
          path:"/cydn/userCenter/userInfo"
        })
      },
      goInfoPage(row) {
        this.$router.push({
          path: '/cydn/retail/commodity',
          query: {
            goodsId: row.id,
            shopId: row.decoraShopId
          }
        })
      },
      getList() {
        let params = {
          page: this.curPage,
          rows: this.pageSize
        }
        getListCollectGoodsWeb(params).then(res => {
          if(res.data.success) {
            this.listData = res.data.rows
            this.total = Number(res.data.total)
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      cancelCollect(row) {
        let params = {
          goodsId: row.id
        }
        this.$confirm('此操作将在收藏列表中删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          collectGoods(params).then(res => {
            if(res.data.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          })
        })
      },
      handleSizeChange() {},
      handleCurrentChange(val) {
        this.curPage = val;
        this.getList();
      }
    }
  }
</script>

<style lang="scss" scoped>
h3 {
  padding-bottom: 20px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: 600;
  color: #0d0d0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-error{
    font-size: 25px;
    cursor: pointer;
    color: #999;
  }
}
.content_box {
  width: 100%;
  min-height: 420px;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 30px;
  box-sizing: border-box;
  .card_list {
    display: flex;
    flex-wrap: wrap;
    .card_list_item {
      width: 230px;
      height: 320px;
      background-color: #fff;
      margin-right: 30px;
      margin-bottom: 30px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      &:nth-child(6n) {
        margin-right: 0;
      }
      .card_item_img {
        width: 100%;
        height: 224px;
      }
      .card_item_text {
        height: calc(100% - 224px);
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .card_item_name {
          font-size: 13px;
          font-weight: bold;
          color: #333;
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .card_item_bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .card_item_price {
            color: #ff0000;
            font-size: 21px;
            font-weight: 600;
            .price_symbol {
              font-size: 15px;
            }
          }
          .card_item_cancel {
            cursor: pointer;
            font-size: 14px;
            color: rgba(0,0,0,0.6);
            padding-bottom: 2px;
            box-sizing: border-box;
            .el-icon-delete {
              padding-right: 5px;
            }
          }
        }
      }
    }
  }
  .no_data {
    text-align: center;
    line-height: 420px;
    color: #333;
  }
}
</style>
