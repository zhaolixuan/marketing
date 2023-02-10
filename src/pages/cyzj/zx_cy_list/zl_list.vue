<template>
  <div class="zl_class">
    <el-image style="height: 300px;margin-bottom:20px;" :src="bannerImg" fit="cover"></el-image>
    <div class="app-container">
      <div class="wrap">
        <div class="nav-title">
          <ul>
            <li
              v-for="(item,index) in classs"
              :key="item.id"
              :class="{'active':index==activeIndex}"
              @click="navClick(item,index)"
            >
              <div style="border:none;" class="nav-text">{{ item.category }}</div>
            </li>
          </ul>
        </div>
        <div class="content-list">
          <div v-show="bodyList.length<1">
            <el-empty description="暂无数据" class="empty"/>
          </div>
          <ul v-show="bodyList.length>0">
            <li v-for="(item,index) in bodyList" :key="index">
              <div class="title" @click="toDetalis(item)">{{ item.title }}</div>
              <div class="date">{{ item.releaseTime|hendelDate }}</div>
              <div class="fn" v-if="item.fileUrl">
                <!-- <el-button type="text" class="btn" @click="preView(item)">在线预览</el-button> -->
                <el-button type="text" class="btn" @click="downLoad(item)">下载附件</el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
import filUrl from "@/config/index.js";
import { getClass, getZLDataList } from "@/api/cyzj.js";
export default {
  data() {
    return {
      bannerImg: require("../../../static/images/zl_banner.png"),
      imgUrl: process.env.VUE_APP_IMG_URL,
      classs: [],
      activeIndex: 0,
      activeClassObj: {}, //选中的分类信息
      bodyList: [],
      total: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.initClass();
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy年MM月dd日 hh:mm:ss");
    }
  },
  methods: {
    initClass() {
      //获取分类
      getClass({ type: 2 }).then(res => {
        this.classs = res.data.retData;
        this.getDataList(res.data.retData[0]?.id);
      });
    },
    getDataList(id) {
      //获取列表
      getZLDataList({ categoryId: id, curPage: this.currentPage, pageSize: 10 })
        .then(res => {
          console.log(res, "111111111");
          this.bodyList = res?.data?.retData[0]?.data || [];
          this.total = res?.data?.retData[0]?.total || 0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    navClick(item, i) {
      this.activeIndex = i;
      this.activeClassObj = item;
      this.currentPage = 1;
      this.getDataList(this.activeClassObj.id);
    },
    //TODO
    downLoad(item) {
      window.open(this.imgUrl + item.fileUrl);
    },
    toDetalis(item) {
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: {
          type: 1,
          id: item.id
        }
      });
      // this.$router.push(`/cydn/cyzj/detali/${item.id}/1`)
    },
    handleCurrentChange(page) {
      this.getDataList(this.activeClassObj.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  background: #ffffff;
}
.wrap {
  padding: 35px 15px;
  box-sizing: border-box;
  display: flex;
  .nav-title {
    position: relative;
    z-index: 1;
    width: 17%;
    // padding-top: 27px;
    ul {
      li {
        box-sizing: border-box;
        width: 200px;
        height: 50px;
        color: #000;
        padding: 0 13px;
        cursor: pointer;
        div {
          width: 100%;
          height: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(2, 95, 172, 0.22);
        }
        &:last-child {
          div {
            border-bottom: none;
          }
        }
      }
      .active {
        background-color: #ffffff;
        color: #0f92ff;
        //   box-shadow: -3px 0px 4px 0px rgba(0, 18, 97, 0.2);
        border-right: 2px solid #0e67ff;
      }
    }
  }
  .content-list {
    width: 82%;
    //   box-shadow: 0px 0px 10px 0px rgba(0, 18, 97, 0.2);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0px 20px;
    font-size: 14px;
    .empty {
      height: 300px;
    }
    ul {
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      li {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 20px;
        padding: 0 20px;
        border-left: 1px solid rgba(0, 0, 0, 0.05);
        border-right: 1px solid rgba(0, 0, 0, 0.05);
        .title {
          width: 65%;
          margin-right: 2%;
          cursor: pointer;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .date {
          width: 25%;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
        }
        .fn {
          width: 8%;
        }
      }
      li:nth-child(odd) {
        background-color: #f7f7f7;
      }
      li + li {
        border-top: 1px solid #f1ecec;
      }
    }
  }
}
.content-page {
  text-align: right;
  margin: 15px 15px 38px 0;
  ::v-deep .el-pagination {
    .el-pagination__total {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      margin-right: 20px;
    }
    .el-pager {
      li {
        width: 32px;
        height: 32px;
        line-height: 32px;
        background: #f7f8fa;
        border-radius: 2px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
      }
      .active {
        background: #0e67ff !important;
        border-radius: 2px;
        border: 1px solid #0e67ff;
        color: #ffffff;
      }
    }
    .btn-prev,
    .btn-next {
      width: 32px;
      height: 32px;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 2px;
    }
  }
}
</style>
