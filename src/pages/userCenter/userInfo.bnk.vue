<template>
  <div id="user_info">
    <section class="user_info_l">
      <jd-content title="待处理">
        <div class="left_header">
          <div class="header_item">
            <p>待付款</p>
            <h3>0</h3>
          </div>
          <div class="header_item">
            <p>待发货</p>
            <h3>0</h3>
          </div>
          <div class="header_item">
            <p>待售后</p>
            <h3>0</h3>
          </div>
          <div class="header_item">
            <p>订单数量</p>
            <h3>0</h3>
          </div>
          <div class="header_item">
            <p>待处理投诉</p>
            <h3>0</h3>
          </div>
          <div class="header_item">
            <p>违规</p>
            <h3>0</h3>
          </div>
        </div>
      </jd-content>
      
      <!-- <div class="left_pending">
        <div class="pending_top">
          <span class="top_title">待处理</span>
          <div class="top_btn">
            <span>暂无待处理任务</span>
            <el-button type="text">查看全部 ></el-button>
          </div>
        </div>
      </div> -->
      <div class="shop_data">
        <div class="common_title">
          <span class="title_l">店铺数据</span>
          <span class="title_r">数据更新时间：{{nowTime}}</span>
        </div>
        <div class="data_con">
          <div class="data_item">
            <p class="item_title">分销商管理</p>
            <p class="item_num">
              <span>0</span>
              <span>0</span>
            </p>
            <p class="item_old">
              <span>已授权</span>
              <span>待授权</span>
            </p>
          </div>
          <div class="data_item" @click="goPage('goodsCollection')">
            <p class="item_title">商品收藏</p>
            <p class="item_num">{{numData.countAllGoods}}</p>
            <p class="item_old">昨日 {{numData.countYesGoods}}</p>
          </div>
          <div class="data_item" @click="goPage('shopAttention')">
            <p class="item_title">店铺关注</p>
            <p class="item_num">{{numData.countAllSupp}}</p>
            <p class="item_old">昨日 {{numData.countYesSupp}}</p>
          </div>
          <div class="data_item">
            <p class="item_title">支付金额</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">访客数</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">支付订单数</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">支付转化率</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">浏览量</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">加购人数</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">客单价</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
          <div class="data_item">
            <p class="item_title">支付卖家数</p>
            <p class="item_num">0</p>
            <p class="item_old">昨日 0</p>
          </div>
        </div>
      </div>
      <div class="active_information">
        <div class="active_box">
          <div class="common_title">
            <span class="title_l">活动中心</span>
            <span class="title_r">数据更新时间：{{nowTime}}</span>
          </div>
          <div class="common_show">
            <div class="show_item">
              <div class="item_top">
                <img src="../../static/images/view-icon.png" class="item_t_img height_auto">
                <span>活动浏览量</span>
              </div>
              <p class="item_b">0</p>
            </div>
            <div class="show_item" @click="goPage('activityParticipation')">
              <div class="item_top">
                <img src="../../static/images/canyu-icon.png" class="item_t_img height_auto">
                <span>活动参与量</span>
              </div>
              <p class="item_b">{{numData.participation}}</p>
            </div>
          </div>
        </div>
        <div class="information_box">
          <div class="common_title">
            <span class="title_l">资讯数据</span>
            <span class="title_r">数据更新时间：{{nowTime}}</span>
          </div>
          <div class="common_show">
            <div class="show_item">
              <div class="item_top">
                <img src="../../static/images/view-icon.png" class="item_t_img height_auto">
                <span>资讯浏览量</span>
              </div>
              <p class="item_b">0</p>
            </div>
          </div>
        </div>
      </div>
      <div class="active_information">
        <div class="active_box">
          <div class="common_title">
            <span class="title_l">惠企政策</span>
            <span class="title_r">数据更新时间：{{nowTime}}</span>
          </div>
          <div class="common_show">
            <div class="show_item" @click="goPage('policyOn')">
              <div class="item_top">
                <img src="../../static/images/guanzhu-icon.png" class="item_t_img">
                <span>我的政策</span>
              </div>
              <p class="item_b">{{numData.attention}}</p>
            </div>
            <div class="show_item" @click="goPage('policyDeclare')">
              <div class="item_top">
                <img src="../../static/images/shenbao-icon.png" class="item_t_img width_auto">
                <span>我的申请</span>
              </div>
              <p class="item_b">{{numData.declare}}</p>
            </div>
            <div class="show_item" @click="goPage('policyBrowse')">
              <div class="item_top">
                <img src="../../static/images/view-icon.png" class="item_t_img height_auto">
                <span>我的浏览</span>
              </div>
              <p class="item_b">{{numData.browse}}</p>
            </div>
          </div>
        </div>
        <div class="information_box">
          <div class="common_title">
            <span class="title_l">行业专家</span>
            <span class="title_r">数据更新时间：{{nowTime}}</span>
          </div>
          <div class="common_show">
            <div class="show_item" @click="goPage('cyzjInfo')">
              <div class="item_top">
                <img src="../../static/images/hyzj-iocn.png" class="item_t_img height_auto" style="margin-top: -6px;">
                <span>专家预约</span>
              </div>
              <p class="item_b">{{numData.subscribe}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="active_information">
        <div class="active_box">
          <div class="common_title">
            <span class="title_l">外贸数据</span>
            <span class="title_r">数据更新时间：{{nowTime}}</span>
          </div>
          <div class="common_show">
            <div class="show_item" @click="goPage('myBusiness')">
              <div class="item_top">
                <img src="../../static/images/guanzhu-icon.png" class="item_t_img">
                <span>企业关注量</span>
              </div>
              <p class="item_b">{{numData.enterprise}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="user_info_r">
      <div v-if="userInfo.supplierApprovalStatus === 'success'">
        <div class="right_top">
          <el-image
            class="right_img_box"
            :src="userInfo.companyInfo.companyLogo ? `${imgurl}${userInfo.companyInfo.companyLogo}` :'../../static/images/defaultUrl.png'"
            fit="contain"
          >
          </el-image>
          <div class="right_name_box">{{userInfo.companyInfo.companyName}}</div>
          <div class="right_state_box">
            <img src="../../static/images/renzheng-icon.png">
            <span>已认证</span>
          </div>
        </div>
        <div class="right_b">
          <div class="right_b_item">
            <p class="item_title">绑定手机号</p>
            <p class="item_text">{{userInfo.tel}}</p>
          </div>
          <div class="right_b_item">
            <p class="item_title">联系人</p>
            <p class="item_text">{{userInfo.companyInfo.contactsName}}</p>
          </div>
          <div class="right_b_item">
            <p class="item_title">联系电话</p>
            <p class="item_text">{{userInfo.companyInfo.contactsTel}}</p>
          </div>
          <div class="right_b_item">
            <p class="item_title">电子邮箱</p>
            <p class="item_text">{{userInfo.companyInfo.contactsEmail}}</p>
          </div>
        </div>
      </div>
      <div class="no_auth" v-else>
        <div class="content_txt">{{authObj.conText}}</div>
        <el-button type="parmary" @click="goPage('EnterpriseCertification')">{{authObj.btnText}}</el-button>
      </div>
    </section>
  </div>
</template>
<script>
import { loginOut } from "@/api/loginApi";
import { getCmsUserShow } from "@/api/userCenter"
import JdContent from '../../components/jd/JdContent.vue';
export default {
  components: { JdContent },
  data() {
    return {
      userInfo: {},
      imgurl: process.env.VUE_APP_IMG_URL,
      numData: {},
      nowTime: ''
    }
  },
  computed: {
    authObj() {
      // supplierApprovalStatus:  unauth 未认证, approvaling 审核中, reject 未通过, success 已通过
      let obj = {}
      switch (this.userInfo.supplierApprovalStatus) {
        case 'unauth':
          obj = {
            state: 'unauth',
            conText: '您当前尚未进行企业账号认证，请先去认证。',
            btnText: '去认证'
          }
          break;
        case 'approvaling':
          obj = {
            state: 'approvaling',
            conText: '您提交的企业认证资料审核中，请耐心等待。',
            btnText: '查看认证信息'
          }
          break;
        case 'reject':
          obj = {
            state: 'reject',
            conText: '您提交的企业认证资料尚审核未通过。',
            btnText: '查看认证信息'
          }
          break;
      
        default:
          obj = {
            state: 'success'
          }
          break;
      }
      return obj
    }
  },
  created() {
    this.nowTime = this.$time(new Date(),'yyyy.MM.dd hh:mm:ss')
    this.$store.dispatch('getUserInfo').then(res => {
      this.userInfo = this.$store.getters.userInfo
    }).catch(res => {
      this.$message.error(`${res.message}`);
      loginOut().then(res2 => {
        if (res2.data.success) {
          const currentOrgId = localStorage.currentOrgId;
          localStorage.clear();
          localStorage.currentOrgId = currentOrgId;
          setTimeout(() => {
            this.$router.push({
              path: "/login",
            });
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_USERINFO', {})
          }, 500);
        }
      })
    })
    this.getCmsUserShow()
  },
  methods: {
    // 跳转个人中心里面的页面
    goPage(path) {
      this.$router.push({
        path: `/cydn/userCenter/${path}`
      })
    },
    // 数据统计接口
    getCmsUserShow() {
      getCmsUserShow().then(res => {
        if(res.data.success) {
          this.numData = res.data.retData
        } else {
          this.$message.error(res.data.message);
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
#user_info {
  width: 100%;
  display: flex;
  .common_title {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .title_l {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #0D0D0D;
      padding-right: 15px;
    }
    .title_r {
      font-size: 12px;
      font-family: "Microsoft YaHei";
      color: #929292;
    }
  }
  .common_show {
    width: 100%;
    height: 106px;
    background-color: #F8F8F8;
    border-radius: 12px;
    display: flex;
    .show_item {
      height: 100%;
      padding: 24px 0 20px 30px;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      .item_top {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: #0D0D0D;
        height: 30px;
        .item_t_img {
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .height_auto {
          height: auto;
        }
        .width_auto {
          width: auto;
        }
      }
      .item_b {
        font-size: 22px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0D0D0D;
        padding-left: 32px;
      }
    }
  }
  .user_info_l {
    min-width: 72.875rem;
    margin-right: 1.875rem;
    .left_header {
      width: 100%;
      height: 118px;
      border-radius: 12px;
      background-color: #F8F8F8FF;
      display: flex;
      .header_item {
        width: calc(100% / 6);
        height: 100%;
        padding-left: 30px;
        p {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          color: #0D0D0D;
          padding: 28px 0 10px 0;
        }
        h3 {
          font-size: 34px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: #0E67FF;
          height: 48px;
          line-height: 48px;
        }
      }
    }
    .left_pending {
      color: #929292;
      padding: 40px 0;
      .pending_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .top_title {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 600;
          color: #0D0D0D;
        }
        .top_btn {
          font-size: 12px;
          span {
            padding-right: 20px;
          }
        }
      }
    }
    .shop_data {
      padding-bottom: 20px;
      .data_con {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .data_item {
          width: 18%;
          height: 134px;
          background: #F8F8F8;
          border-radius: 12px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          color: #595959;
          padding: 22px 30px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: calc(10% / 4);
          margin-bottom: 20px;
          .item_num {
            font-size: 22px;
            font-family: "Microsoft YaHei";
            font-weight: 600;
            color: #0D0D0D;
            
          }
          .item_old {
            font-size: 14px;
          }
          .item_num, .item_old {
            span {
              display: inline-block;
              width: 49%;
              &:last-child {
                margin-left: 2%;
              }
            }
          }
          &:nth-child(5n) {
            margin-right: 0;
          }
        }
        
      }
    }
    .active_information {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      .active_box {
        width: 59%;
        .common_show > .show_item {
          width: calc(100% / 3);
        }
      }
      .information_box {
        width: 38.5%;
        .common_show > .show_item {
          width: calc(100% / 2);
        }
      }
    }
  }
  .user_info_r {
    width: 25rem;
    min-height: 59rem;
    background: #FFFFFF;
    border-radius: 0.625rem;
    .right_top {
      height: 270px;
      background: #EBF3FF;
      background: url('../../static/images/user-info-bg.png') no-repeat center;
      border-radius: 0.625rem 0.625rem 0px 0px;
      background-color: #EBF3FF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .right_img_box {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        border: 2px solid #fff;
        margin-top: 44px;
      }
      .right_name_box {
        text-align: center;
        width: 90%;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        font-weight: 600;
        color: #0D0D0D;
        padding: 30px 0 20px;
      }
      .right_state_box {
        width: 84px;
        height: 24px;
        background-color: rgba(14, 103, 255, 0.08);
        border-radius: 12px;
        font-size: 12px;
        font-family: "Microsoft YaHei";
        color: #1492FF;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 16px;
          height: 12px;
          margin-right: 6px;
        }
      }
    }
    .right_b {
      padding: 40px 0 20px;
      .right_b_item {
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        color: #0D0D0D;
        padding-bottom: 18px;
        .item_title {
          width: 150px;
          padding-right: 20px;
          text-align: right;
          line-height: 16px;
          font-family: "Microsoft YaHei";
        }
        .item_text {
          box-sizing: border-box;
          width: calc(100% - 150px);
          font-family: "Microsoft YaHei";
          font-weight: 600;
          padding-right: 30px;
          line-height: 16px;
        }
      }
    }
  }
  .no_auth {
    box-sizing: border-box;
    text-align: center;
    // height: 300px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    color: #0D0D0D;
    line-height: 22px;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-button {
      width: 102px;
      height: 38px;
      background: #0E67FF;
      border-radius: 5px;
      border: 1px solid #0E67FF;
      margin-top: 30px;
      font-family: "Microsoft YaHei";
      font-weight: 600;
      color: #FFFFFF;
    }
  }
}  
</style>
