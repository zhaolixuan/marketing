<template>
  <div class="policy-details">
    <div class="main">
      <div class="title">
        {{ title }}
      </div>
      <div class="release-time-wrap">
        <div class="release-time">发布时间：{{ releaseTime || "--" }}</div>
        <div
          class="collection"
          @click="collection"
          :class="{ active: isCollection }"
        >
          <div class="iconfont icon-guanzhu"></div>
          <div class="text">{{ isCollection ? "取消关注" : "关注" }}</div>
        </div>
      </div>
      <div class="content" v-html="mainBody"></div>
      <div class="downLoad" v-if="downLoadList.length">
        <div class="downLoad-title">政策附件：</div>
        <div class="downLoad-list">
          <div class="item" v-for="item in downLoadList" :key="item.id">
            <a :href="fileUrl + item.id">
              <img src="../../../static/images/policy_download.png" alt="" />
              <span>{{ item.oldName }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn" @click="declareImmediately" v-if="show">
          政策申报
        </div>
        <!-- <div class="btn">立即咨询</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPolicyDetail,
  getKeeUploadFile,
  cancelCollection,
  collection,
  getDeclare
} from "@/api/hqzc";
import { formatDate, to } from "@/common/util";
import { authorization } from "@/common/authorization";
export default {
  data() {
    return {
      fileUrl: process.env.VUE_APP_FILEURL,
      id: "",
      title: "",
      releaseTime: "",
      mainBody: "",
      isCollection: false,
      downLoadList: [],
      show:true,
      policyCategory: false
    };
  },
  mounted() {
    this.id = this.$route.query?.id;
    this.getPolicyDetail();
    if(this.$route.query?.show){
      this.show = false;
    }
  },
  methods: {
    // 获取政策详情
    async getPolicyDetail() {
      const [err, res] = await to(getPolicyDetail({ policyId: this.id }));

      if (err) console.log(err);

      if (res?.status === 200) {
        const {
          title,
          issueTime,
          mainBody,
          policyAttach,
          isCollection,
          policyCategory
        } = res.data.retData;
        this.title = title;
        this.releaseTime = formatDate(new Date(issueTime), "yyyy-MM-dd");
        this.mainBody = mainBody;
        this.isCollection = isCollection;
        this.show = policyCategory === "declare" ? true : false;
        if (policyAttach) {
          this.downLoadList = [];
          const arr = policyAttach.split(",");
          arr.forEach(async item => {
            const [err, result] = await to(getKeeUploadFile({ ids: item }));

            if (err) console.log(err);

            if (result?.status === 200 && result.data.length) {
              this.downLoadList.push(result.data[0]);
            }
          });
        }
      }
    },
    // 立即申报
    async declareImmediately() {
      const isAuth = await authorization.call(this);
      if (isAuth) {
        const [err, res] = await to(getDeclare({ policyId: this.id }));

        if (err) console.log(err);

        if (res?.status === 200) {
          res.data.success
            ? this.$message.error("您已申请过该政策，看看别的吧！")
            : this.$router.push({
                path: "/cydn/declareImmediately",
                query: {
                  id: this.id,
                  title: this.title
                }
              });
        }
      }
    },
    // 关注/取消关注
    async collection() {
      const isAuth = await authorization.call(this);
      if (isAuth) {
        const [err, res] = await to(
          this.isCollection
            ? cancelCollection({ policyId: this.id })
            : collection({ policyId: this.id })
        );
        if (err) console.log(err);

        if (res?.status === 200) {
          this.isCollection = !this.isCollection;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.policy-details {
  min-height: calc(100vh - 40px - 240px);
  background: #f2f7fb;
  .main {
    width: $w;
    margin: 16px auto;
    padding: 70px 50px 80px;
    background-color: #fff;
    .title {
      font-size: 30px;
      color: #000;
      word-break: break-all;
      width: 800px;
      margin: 0 auto 46px;
    }
    .release-time-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
      color: rgb(102, 102, 102);
      border-bottom: 1px solid rgb(230, 230, 230);
      .release-time {
      }
      .collection {
        display: flex;
        cursor: pointer;
        .text {
          margin-left: 5px;
        }
        &.active {
          color: red;
        }
      }
    }
    .downLoad {
      border-top: 1px solid rgb(230, 230, 230);
      background-color: white;
      padding-top: 17px;
      padding-bottom: 60px;
      .downLoad-title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(39, 42, 64, 1);
      }
      .downLoad-list {
        .item {
          display: flex;
          margin-top: 20px;
          align-items: center;
          cursor: pointer;
          a {
            color: #fff;
            padding: 0px;
            background: rgb(255, 255, 255);
            display: flex;
            align-items: center;
            border-radius: 5px;
            text-decoration: none !important;
            vertical-align: middle !important;
            img {
              vertical-align: middle;
            }
            span {
              font-size: 16px;
              color: rgba(61, 111, 173, 1);
              margin-left: 5px;
            }
          }
        }
      }
    }
    .content {
      margin-top: 30px;
      line-height: 30px;
      margin-bottom: 40px;
    }
    .btn-wrap {
      position: sticky;
      display: flex;
      justify-content: center;
      bottom: 80px;
      left: 0;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 40px;
        font-size: 14px;
        cursor: pointer;
        background: #3171ff;
        color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        &:nth-child(2){
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
