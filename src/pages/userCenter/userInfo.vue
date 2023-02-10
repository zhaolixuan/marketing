<template>
  <div id="homeIndex">
    <section class="content-left">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <jd-content title="待办事项">
        <div class="pending-con">
          <div class="p-con-item">
            <h4 class="item-tit">待发货</h4>
            <p class="item-con">{{numberObj.dfh}}</p>
          </div>
          <div class="p-con-item">
            <h4 class="item-tit">待收货</h4>
            <p class="item-con">{{numberObj.yfh}}</p>
          </div>
          <div class="p-con-item">
            <h4 class="item-tit">已完成</h4>
            <p class="item-con">{{numberObj.ywc}}</p>
          </div>
          <div class="p-con-item">
            <h4 class="item-tit">已取消</h4>
            <p class="item-con">{{numberObj.qx}}</p>
          </div>
        </div>
      </jd-content>
      <jd-content title="我的订单" class="shop-data" more="查看更多 >" @goMore="getMoreOrderList('order')">
        <ul :class="orderList.length > 0 ? 'orderUl' : 'noOrderUl'" v-if="orderList.length>0">
          <li v-for="(item,index) in orderList" :key="index" class="li">
            <div class="imgBox">
              <el-image :src="orderItenschange(item.orderItems).imgUrl" fit="contain" class="img"></el-image>
            </div>
            <div class="c_title">
              <p class="t_title">{{item.orderDesc}}</p>
              <p class="p_more">
                <span>数量: {{item.totalCount}}</span>
              </p>
            </div>
            <p class="p_orderlist">{{item.id}}</p>
            <p class="p_status">{{stateFilter(item.status)}}</p>
            <p class="p_pirce">￥ {{item.realPayPrice}}</p>
            <p
              class="p_orderStatus orderStatus1"
              v-if="item.status === '02'"
              @click="confirm(item)"
            >确认收货</p>
            <p
              class="p_orderStatus orderStatus3"
              v-if="item.status === '01'|| item.status === '02'"
              @click="cancelOrder(item)"
            >取消订单</p>
            <p
              class="p_orderStatus orderStatus3"
              v-if="item.status === '01' || item.status === '02' || item.status === '03' || item.status === '00'"
              @click="getBuy(item)"
            >再次购买</p>
          </li>
        </ul>
        <div class="no_data" v-else>暂时没有我的订单</div>
      </jd-content>
      <jd-content
        title="收藏商品"
        class="App-data"
        more="查看更多 >"
        @goMore="getMoreOrderList('collection')"
      >
        <div class="content_box">
          <div v-if="collectionList.length > 0">
            <div class="card_list">
              <div
                class="card_list_item"
                v-for="item in collectionList"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no_data" v-else>暂时没有收藏商品</div>
        </div>
      </jd-content>
      <jd-content title="我的足迹" class="App-data" more="查看更多 >" @goMore="getMoreOrderList('tracks')">
        <div class="content_box">
          <div v-if="trackList.length > 0">
            <div class="card_list">
              <div
                class="card_list_item"
                v-for="item in trackList"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no_data" v-else>暂时没有我的足迹</div>
        </div>
      </jd-content>
      <jd-content title="基于购买偏好为您推荐的商品" class="App-data">
        <div class="content_box">
          <div v-if="likeList.length > 0">
            <div class="card_list">
              <div
                class="card_list_item"
                v-for="item in likeList"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no_data" v-else>暂时没有购买偏好为您推荐的商品</div>
        </div>
      </jd-content>
    </section>
    <section class="content-right" v-if="userInfo.buyerApprovalStatus == 'success'">
      <img src="../../static/images/c_bg.png" class="r-con-bg" />
      <div class="r-con">
        <div class="r-user-logo">
          <el-image :src="imgUrl+userInfo.userAuthBuyer.headSculpt" fit="cover" class="logo-img"></el-image>
        </div>
        <h3 class="r-con-tit">{{userInfo.userAuthBuyer.userName}}</h3>
        <ul class="r-con-list">
          <li class="r-list-item">
            <div class="item-label">绑定手机号</div>
            <div class="item-val">{{userInfo.tel}}</div>
          </li>
          <li class="r-list-item">
            <div class="item-label">联系邮箱</div>
            <div class="item-val">{{userInfo.userAuthBuyer.contactsEmail}}</div>
          </li>
          <li class="r-list-item">
            <div class="item-label">联系电话</div>
            <div class="item-val">{{userInfo.userAuthBuyer.contactsTel}}</div>
          </li>
          <li class="r-list-item">
            <div class="item-label">买家地址</div>
            <div class="item-val">{{userInfo.userAuthBuyer.fullAddress}}</div>
          </li>
        </ul>
        <div class="r-common-box">
          <div class="common-l">
            <img src="../../static/images/c-pass.png" class="com-l-img" />
          </div>
          <div class="common-r">
            <p class="com-r-top">登录密码</p>
            <p class="com-r-tips">用于保护账号信息和登录安全</p>
            <el-button class="com-r-btn" @click="getPassword">更改密码</el-button>
          </div>
        </div>
        <div class="r-common-box">
          <div class="common-l">
            <img src="../../static/images/c-tel.png" class="com-l-img" />
          </div>
          <div class="common-r">
            <p class="com-r-top">
              <span class="top-tit">安全手机</span>
              <span>{{userInfo.telPas}}</span>
            </p>
            <p class="com-r-tips">已验证，可通过手机登录或者找回密码</p>
            <el-button class="com-r-btn" @click="getTel">绑定新手机</el-button>
          </div>
        </div>
      </div>
    </section>
    <section class="content-right" v-else>
      <div class="no_auth">
        <div class="content_txt">{{authObj.conText}}</div>
        <div class="d_unauth">
          <!-- 买家 -->
          <el-button type="parmary" @click="goPage()" class="btn_dif" v-if="userInfo.buyerApprovalStatus == 'unauth' || userInfo.buyerApprovalStatus == 'approvaling' || userInfo.buyerApprovalStatus == 'reject'">{{authObj.btnText}}</el-button>
          <!-- 卖家 -->
          <el-button type="parmary" @click="getAuthEnterprise()" class="btn_dif" v-if="userInfo.supplierApprovalStatus == 'unauth'">企业认证</el-button>
          <el-button type="parmary" @click="getAuthEnterprise()" class="btn_dif" v-if="userInfo.supplierApprovalStatus == 'reject'">企业认证</el-button>
          <el-button type="info" disabled class="btn_dif" v-if="userInfo.supplierApprovalStatus == 'success'">企业已认证</el-button>
        </div>

      </div>
      <div class="r-con diff-con">
        <div class="r-common-box">
          <div class="common-l">
            <img src="../../static/images/c-pass.png" class="com-l-img" />
          </div>
          <div class="common-r">
            <p class="com-r-top">登录密码</p>
            <p class="com-r-tips">用于保护账号信息和登录安全</p>
            <el-button class="com-r-btn" @click="getPassword">更改密码</el-button>
          </div>
        </div>
        <div class="r-common-box">
          <div class="common-l">
            <img src="../../static/images/c-tel.png" class="com-l-img" />
          </div>
          <div class="common-r">
            <p class="com-r-top">
              <span class="top-tit">安全手机</span>
              <span>{{userInfo.telPas}}</span>
            </p>
            <p class="com-r-tips">已验证，可通过手机登录或者找回密码</p>
            <el-button class="com-r-btn" @click="getTel">绑定新手机</el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getDataIndexBuyer, cancelOrder, confirmOrder } from "@/api/userCenter";

export default {
  name: "homeIndex",
  data() {
    return {
      userInfo: {},
      numberObj: {},
      imgUrl: process.env.VUE_APP_IMG_URL,
      orderList: [],
      collectionList: [],
      trackList: [],
      likeList: [],
      curPage: 1,
      pageSize: 5,
      userAuth:this.$store.getters.userInfo
    };
  },
  computed: {
    authObj() {
      // supplierApprovalStatus:  unauth 未认证, approvaling 审核中, reject 未通过, success 已通过
      let obj = {};
      switch (this.userInfo.buyerApprovalStatus) {
        case "unauth":
          obj = {
            state: "unauth",
            conText: "您当前尚未进行实名信息认证，请先去认证",
            btnText: "身份认证"
          };
          break;
        case "approvaling":
          obj = {
            state: "approvaling",
            conText: "您提交的身份认证资料审核中，请耐心等待",
            btnText: "查看认证信息"
          };
          break;
        case "reject":
          obj = {
            state: "reject",
            conText: "您提交的身份认证资料，审核未通过",
            btnText: "查看认证信息"
          };
          break;

        default:
          obj = {
            state: "success"
          };
          break;
      }
      return obj;
    }
  },
  created() {
    this.$store
      .dispatch("getUserInfo")
      .then(res => {
        this.userInfo = this.$store.getters.userInfo;
        console.log(this.userInfo, "this.userInfothis.userInfo");
      })
      .catch(res => {
        this.$message.error(`${res.message}`);
        loginOut().then(res2 => {
          if (res2.data.success) {
            const currentOrgId = localStorage.currentOrgId;
            localStorage.clear();
            localStorage.currentOrgId = currentOrgId;
            setTimeout(() => {
              this.$router.push({
                path: "/login"
              });
              this.$store.commit("SET_TOKEN", "");
              this.$store.commit("SET_USERINFO", {});
            }, 500);
          }
        });
      });
    this.getBuyerList();
  },
  methods: {
    getMoreOrderList(types) {
      console.log(types, "types");
      if (types == "order") {
        this.$router.push("/cydn/userCenter/orderList");
      } else if (types == "collection") {
        this.$router.push("/cydn/userCenter/goodsCollection");
      } else if (types == "tracks") {
        this.$router.push("/cydn/userCenter/myTracks");
      }
    },
    // 首页列表
    getBuyerList() {
      getDataIndexBuyer().then(res => {
        if (res.data.success) {
          this.orderList = res.data.map.igOrderList;
          this.collectionList = res.data.map.collectList;
          this.trackList = res.data.map.browseList;
          this.likeList = res.data.map.prefList;
          this.numberObj = res.data.map.orderMap;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    orderItenschange(str) {
      let orderObj = {
        imgUrl: "",
        goodsName: ""
      };
      if (str) {
        let jsonArr = JSON.parse(str)[0];
        orderObj = {
          imgUrl: process.env.VUE_APP_IMG_URL + jsonArr.imgId,
          goodsName: jsonArr.goodsName
        };
      }
      return orderObj;
    },
    stateFilter(state) {
      let name = "";
      switch (state) {
        case "01":
          name = "待发货";
          break;
        case "02":
          name = "待收货";
          break;
        case "03":
          name = "已完成";
          break;
        case "00":
          name = "已取消";
          break;
        case "99":
          name = "未支付";
          break;
        default:
          break;
      }
      return name;
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
    },
    // 再次购买
    getBuy(row) {
      this.$router.push({
        path: "/cydn/retail/commodity",
        query: {
          goodsId: row.id,
          shopId: row.decoraShopId
        }
      });
    },
    goPage() {
      this.$router.push("/cydn/userCenter/EnterpriseCertification");
    },
    cancelOrder(row) {
      this.$confirm("确定要取消当前订单么?", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let params = {
          id: row.id
        };
        const res = await cancelOrder(params);
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.getBuyerList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    confirm(row) {
      this.$confirm("确认收货!", "收货确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let params = {
          id: row.id
        };
        const res = await confirmOrder(params);
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.getBuyerList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 企业认证
    getAuthEnterprise() {
        this.$router.push("/cydn/bmc/enterpriseAuth");
    },
    getPassword() {
      this.$router.push("/cydn/userCenter/editPassword");
    },
    getTel() {
      this.$router.push("/cydn/userCenter/bindTelephone");
    }
  }
};
</script>

<style lang="scss" scoped>
#homeIndex {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  .content-left {
    width: 75%;
    box-sizing: border-box;
    padding-right: 30px;
    .bread {
      margin-bottom: 15px;
      ::v-deep .is-link {
        font-size: 14px;
        font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
        color: #929292;
      }
    }
    .pending-con {
      display: flex;
      flex-wrap: wrap;
      .p-con-item {
        width: 23%;
        height: 100px;
        box-sizing: border-box;
        padding: 20px 30px;
        background-color: #f3f9ff;
        margin-right: 2.65%;
        border-radius: 10px;
        &:last-child {
          margin-right: 0;
        }
        .item-tit {
          font-size: 16px;
          font-weight: 400;
          color: #595959;
          padding-bottom: 15px;
        }
        .item-con {
          font-size: 32px;
          font-weight: 500;
          color: #007fef;
        }
      }
    }
    .shop-data {
      .orderUl {
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          box-sizing: border-box;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          &:last-child {
            border-bottom: none;
          }
          .imgBox {
            .img {
              width: 60px;
              height: 60px;
              border-radius: 10px;
            }
            margin-right: 20px;
          }
          .c_title {
            width: 295px;
            margin-right: 30px;
            .t_title {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #0d0d0d;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .p_more {
              margin-top: 10px;
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #929292;
                margin-right: 20px;
              }
            }
          }
          .p_status,
          .p_pirce{
            width: 50px;
            margin-right: 7px;
          }
          .p_orderStatus {
            width: 60px;
            margin-right: 20px;
          }
          .p_orderlist{
            margin-right: 20px;
            // width: 297px;
          }
          .p_status,.p_orderlist {
            color: #0d0d0d;
          }
          .p_pirce {
            color: #0d0d0d;
          }
          .p_orderStatus {
            cursor: pointer;
            &:last-child{
              margin-right: 0;
            }
          }
          .orderStatus1 {
            color: #007fef;
          }
          .orderStatus2 {
            color: #929292;
          }
          .orderStatus3 {
            color: #929292;
          }
        }
      }
      .no_data {
        text-align: center;
        color: #333;
      }
      .noOrderUl {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          box-sizing: border-box;
          border-bottom: 1px solid #f0f0f0;
          &:last-child {
            border-bottom: none;
          }
          .imgBox {
            .img {
              width: 60px;
              height: 60px;
              border-radius: 10px;
              border: 1px solid #979797;
            }
            margin-right: 20px;
          }
          .c_title {
            width: 295px;
            margin-right: 70px;
            .t_title {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #0d0d0d;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .p_more {
              margin-top: 10px;
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #929292;
                margin-right: 20px;
              }
            }
          }
          .p_status,
          .p_pirce,
          .p_orderStatus {
            flex: 1;
            margin-right: 84px;
          }
          .p_status {
            color: #0d0d0d;
          }
          .p_pirce {
            color: #0d0d0d;
          }
          .p_orderStatus {
            margin-right: 0;
            cursor: pointer;
          }
          .orderStatus1 {
            color: #007fef;
          }
          .orderStatus2 {
            color: #929292;
          }
          .orderStatus3 {
            color: #929292;
          }
        }
      }
    }
    .App-data {
      &:last-child {
        margin-bottom: 0 !important;
      }
      .content_box {
        width: 100%;
        background: #ffffff;
        .card_list {
          display: flex;
          flex-wrap: wrap;
          .card_list_item {
            padding: 25px 24px 22px 26px;
            width: 20%;
            height: 294px;
            background-color: #fff;
            border-top: 1px solid #f0f0f0ff;
            border-right: 1px solid #f0f0f0ff;
            border-bottom: 1px solid #f0f0f0ff;
            box-sizing: border-box;
            cursor: pointer;
            &:nth-child(1) {
              border-left: 1px solid #f0f0f0ff;
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }
            &:nth-child(5) {
              border-top-right-radius: 10px;
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
                  cursor: pointer;
                  font-size: 14px;
                  color: #929292;
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
          color: #333;
        }
      }
    }
  }
  .content-right {
    width: 25%;
    height: auto;
    border-radius: 10px;
    background-color: #fff;
    margin-top: 28px;
    .no_auth {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
      .content_txt {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0d0d0d;
        line-height: 22px;
      }
      .d_unauth {
        .btn_dif {
          // margin-right: 20px;
        }
      }
      // .el-button {
      //   width: 144px;
      //   height: 40px;
      //   margin-top: 30px;
      //   font-family: "Microsoft YaHei";
      //   font-weight: 600;
      //   color: #ffffff;
      //   border-radius: 8px;
      //   font-size: 14px;
      // }
      ::v-deep .el-button--parmary{
          margin-top: 30px;
          font-family: "Microsoft YaHei";
          font-weight: 600;
          width: 144px;
          border-radius: 8px;
          color: #FFF;
          height: 40px;
          font-size: 14px;
          background-color: #0078E3FF;
          border-color: #0078E3FF;
      }
      ::v-deep .el-button--info{
          margin-top: 30px;
          width: 144px;
          border-radius: 8px;
          height: 40px;
          font-size: 14px;
      }
    }
    .r-con-bg {
      width: 100%;
      height: 95px;
    }
    .r-con {
      position: relative;
      padding: 0 30px;
      box-sizing: border-box;
      .r-user-logo {
        position: absolute;
        left: 50%;
        top: -50px;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        border-radius: 50%;
        background: #007fef;
        box-shadow: 4px 20px 14px 0px rgba(14, 103, 255, 0.07);
        border: 2px solid #ffffff;
        .logo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .logo-text {
          font-size: 40px;
          color: #ffffff;
        }
      }
      .r-con-tit {
        width: 100%;
        font-size: 22px;
        font-weight: 600;
        color: #0d0d0d;
        padding-top: 78px;
        text-align: center;
      }
      .r-con-list {
        padding: 95px 0;
        .r-list-item {
          width: 100%;
          display: flex;
          align-items: flex-start;
          font-size: 14px;
          color: #929292;
          padding-bottom: 20px;
          .item-label {
            width: 30%;
            text-align: right;
          }
          .item-val {
            width: 70%;
            padding-left: 10px;
            box-sizing: border-box;
            color: #0d0d0d;
          }
        }
      }
      .r-common-box {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: #f3f9ff;
        display: flex;
        margin-bottom: 30px;
        border-radius: 10px;
        .common-l {
          padding-right: 10px;
          .com-l-img {
            width: 40px;
            height: 40px;
          }
        }
        .common-r {
          width: clac(100% -50px);
          .com-r-top {
            font-size: 16px;
            color: #0d0d0d;
            .top-tit {
              padding-right: 10px;
            }
          }
          @media screen and (max-width: 1600px) {
            .com-r-top {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              .top-tit {
                padding-bottom: 10px;
              }
            }
          }
          .com-r-tips {
            font-size: 14px;
            color: #929292;
            padding: 10px 0 20px;
            line-height: 20px;
          }
          .com-r-btn {
            height: 40px;
            border-color: #007fef;
            border-radius: 8px;
            color: #007fef;
            font-size: 14px;
            font-weight: 600;
          }
          &::v-deep .el-button:focus,
          &::v-deep .el-button:hover {
            background-color: #ffffff;
          }
        }
      }
    }
    .diff-con{
      margin-top: 101px;
    }
  }
}
</style>
