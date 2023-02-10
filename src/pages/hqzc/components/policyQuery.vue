<template>
  <div class="policy-query">
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
        <div class="query-times-wrap">
          累计查询
          <div class="query-times">{{ queryTimes }}</div>
          次
        </div>
        <div class="access-precision-policies" @click="handlePolicyMatching">
          <div class="el-icon-right"></div>
          <div class="text">点击这里，获取更精准政策</div>
        </div>
        <div class="query-label-wrap">
          <queryLabel
            :active.sync="policyLevel"
            :name="policyLevelData.name"
            :data="policyLevelData.data"
          ></queryLabel>
          <queryLabel
            class="label"
            :active.sync="policyType"
            :name="policyTypeData.name"
            :data="policyTypeData.data"
          ></queryLabel>
          <queryLabel
            :active.sync="policyTheme"
            :name="policyThemeData.name"
            :data="policyThemeData.data"
          ></queryLabel>
        </div>
      </div>
    </div>
    <div class="content">
      <div
        class="item-wrap"
        @click="handlePolicyDetails(item)"
        v-for="item in policyData"
        :key="item.id"
      >
        <div class="item">
          <div class="title-wrap">
            <div class="title">{{ item.title || "--" }}</div>
            <div class="message">
              <div class="release-time">
                发布时间：{{
                  formatDate(new Date(item.issueTime), "yyyy-MM-dd") || "--"
                }}
              </div>
              <div class="issued-by">发布单位：{{ item.createDepartment || "--" }}</div>
            </div>
          </div>
          <div class="lable-wrap">
            <div class="name">政策主题：</div>
            <div class="label-content">
              <div
                class="label"
                v-for="i in item.policyThemes"
                :key="i"
              >
                {{ i || "--" }}
              </div>
            </div>
          </div>
          <div class="text-wrap">
            <div class="text">
              {{ item.contextAbstract || "..." }}
            </div>
            <div class="declare-immediately-wrap">
              <div
                class="declare-immediately"
                @click.stop="handleDeclareImmediately(item)"
              >
                立即申报
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="policyData.length === 0 && status">
        <img src="../../../static/images/empty.png" alt="" />
        <p>暂无数据</p>
      </div>
      <el-pagination
        class="pagination"
        background
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :total="total"
        layout="total, prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getKeyWordSearch, indexGet, getDeclare } from "@/api/hqzc";
import { authorization } from "@/common/authorization";
import mix from "../config";
import queryLabel from "./queryLabel.vue";
import { to } from "@/common/util";
export default {
  components: {
    queryLabel
  },
  mixins: [mix],
  data() {
    return {
      // 搜索关键字
      keyword: "",
      // 累计查询次数
      queryTimes: 0,
      // 政策列表
      policyData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      status: false
    };
  },
  mounted() {
    this.policyType = this.$route.query?.policyType || "";
    this.keyword = this.$route.query?.keyword || "";
    this.search();
  },
  methods: {
    // 搜索
    async search() {
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
      this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const data = {
        // 页码
        page: this.currentPage,
        // 每页数据量
        rows: this.pageSize,
        // 政策级别
        policyLevel: this.policyLevel,
        // 政策类型
        policyType: this.policyType,
        // 政策主题
        policyTheme: this.policyTheme,
        // 关键字
        query: this.keyword
      };
      const [err, res] = await to(getKeyWordSearch(data));

      if (err){
        this.status = false;
        console.log(err);
      }

      if (res?.status === 200) {
        this.status = true;
        this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        }).close();
        const { queryPolicyListRes, count } = res.data.retData;
        this.total = count - 0;
        queryPolicyListRes.forEach(item => {
          if(item.policyThemes.length){
            item.policyThemes = item.policyThemes.split(",").filter(Boolean);
          }else{
            queryPolicyListRes.push("--");
          }
        })
        this.policyData = queryPolicyListRes;
      }

      this.indexGet();
    },
    // 获取查询次数
    async indexGet() {
      const [err, res] = await to(indexGet());

      if (err) console.log(err);

      if(res?.status === 200){
        this.queryTimes = res.data.retData[1];
      }
    },
    // 跳转到详情
    handlePolicyDetails(item) {
      this.$router.push({
        path: "/cydn/policyDetails",
        query: {
          id: item.id
        }
      });
    },
    // 立即申报
    async handleDeclareImmediately(item) {
      const isAuth = await authorization.call(this);
      if (isAuth) {
        const [err, res] = await to(getDeclare({ policyId: item.id }));

        if (err) console.log(err);

        if (res?.status === 200) {
          res.data.success
            ? this.$message.error("您已申请过该政策，看看别的吧！")
            : this.$router.push({
                path: "/cydn/declareImmediately",
                query: {
                  id: item.id,
                  title: item.title
                }
              });
        }
      }
    },
    async handlePolicyMatching() {
      const isAuth = await authorization.call(this);
      if (isAuth) {
        this.$router.push("/cydn/hqzc/policyMatching");
      }
    },
    authorization() {
      return authorization.call(this);
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 1200px;
.policy-query {
  margin-bottom: 16px;
  background: #f2f7fb;
  .search-wrap {
    min-height: 290px;
    padding: 38px 0 24px;
    background: rgba(14, 103, 255, 0.03);
    box-sizing: border-box;
    .search-content {
      position: relative;
      width: $w;
      padding: 0 50px;
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
        position: absolute;
        top: 64px;
        right: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
      .query-times-wrap {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 20px;
        margin: 16px 0;
        .query-times {
          font-size: 28px;
          font-weight: 500;
          color: #ff700d;
          line-height: 40px;
          margin: 0 12px 0 4px;
        }
      }
      .query-label-wrap {
        .label {
          margin: 11px 0;
        }
      }
    }
  }
  .content {
    width: $w;
    margin: 16px auto 0;
    padding: 0 21px 40px 19px;
    box-sizing: border-box;
    background: #ffffff;
    .item-wrap {
      cursor: pointer;
      &:not(:first-child)::before {
        display: block;
        content: "";
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .item {
        padding: 34px 0 28px;
        box-sizing: border-box;
        .title-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            flex: 0 0 710px;
            font-size: 30px;
            font-weight: 600;
            color: #000000;
            line-height: 42px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              color: #0e67ff;
            }
          }
          .message {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
            line-height: 22px;
            .release-time {
              flex: 0 0 auto;
              margin-right: 40px;
            }
            .issued-by {
              flex: 0 0 223px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .lable-wrap {
          display: flex;
          flex-wrap: wrap;
          font-size: 16px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          line-height: 22px;
          margin: 8px 0 20px;
          .name {
            flex: 0 0 80px;
          }
          .label-content {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .label {
              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }
        }
        .text-wrap {
          display: flex;
          .text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            flex: 0 0 891px;
            width: 891px;
            text-indent: 2em;
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
            line-height: 28px;
          }
          .declare-immediately-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 0 auto;
            .declare-immediately {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 122px;
              height: 42px;
              background: #0e67ff;
              border-radius: 8px;
              font-size: 18px;
              font-weight: 400;
              color: #ffffff;
              cursor: pointer;
            }
          }
        }
      }
    }
    .no-data {
      display: flex;
      flex-direction: column;
      padding-top: 60px;
      padding-bottom: 20px;
      margin: 0 auto;
      img {
        width: 400px;
        height: 400px;
        margin: 0 auto;
      }
      p{
        margin-top: 15px;
        font-size: 25px;
        font-weight: 600;
        color: #0a88ff;
        line-height: 36px;
        text-align: center;
      }
    }
    ::v-deep .pagination {
      margin-top: 12px;
      text-align: right;
      padding: 0;
      .el-pagination__total {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        height: 32px;
        line-height: 32px;
        margin-right: 8px;
      }
      .btn-prev,
      .btn-next {
        width: 32px;
        height: 32px;
        line-height: 32px;
        background: #f7f8fa;
        border-radius: 2px;
      }
      .el-pager {
        .number {
          margin: 0 4px;
          width: 32px;
          height: 32px;
          line-height: 32px;
          background: #f7f8fa;
          border-radius: 2px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          box-sizing: border-box;
          &.active {
            color: #ffffff;
            background: #0e67ff;
            border: 1px solid #0e67ff;
          }
        }
      }
    }
  }
}
</style>
