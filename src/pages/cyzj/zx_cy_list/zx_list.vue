<template>
  <div class="zx_class">
    <el-image style="height: 300px;margin-bottom:20px;" :src="bannerImg" fit="cover"></el-image>
    <div class="app-container">
      <div class="wrap">
        <div class="nav-wrap">
          <!-- <div class="h3"><img src="../../../static/images/zx_title.png" alt="" class="icon"> 产业要问</div> -->
          <ul>
            <li
              v-for="(item) in navList"
              :class="{'active':activeNav===item.id}"
              :key="item.id"
              @click="activeNavClick(item)"
            >{{ item.category }}</li>
          </ul>
        </div>
        <div class="content-wrap">
          <!-- <div class="title">
           <span>{{ actiiveTitle }}</span> 
           <div></div>
          </div>-->
          <div v-show="articleContent.length<1">
            <el-empty description="暂无数据" class="empty"/>
          </div>
          <ul v-show="articleContent.length>0">
            <li v-for="(item,index) in articleContent" :key="index">
              <div class="article-title" @click="toDetali(item)">{{item.title}}</div>
              <div class="article-date">{{item.createTime|hendelDate}}</div>
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
import { getClass, getYWDataList } from "@/api/cyzj.js";
export default {
  data() {
    return {
      bannerImg: require("../../../static/images/zx_banner.png"),
      articleContent: [],
      total: 0,
      currentPage: 1,
      navList: [],
      activeNav: ""
    };
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy年MM月dd日");
    }
  },
  mounted() {
    this.initClass();
  },
  methods: {
    initClass() {
      getClass({ type: 1 }).then(res => {
        this.navList = res.data.retData;
        this.activeNav = this.navList[0].id;
        this.getDataList(this.navList[0].id);
        // this.getDataList(res.data.retData[0]?.id)
      });
    },
    getDataList(id) {
      //获取列表
      getYWDataList({ categoryId: id, curPage: this.currentPage, pageSize: 10 })
        .then(res => {
          console.log(res, "111111111");
          this.articleContent = res?.data?.retData[0]?.data || [];
          this.total = res?.data?.retData[0]?.total || 0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      this.getDataList(this.activeNav);
    },
    activeNavClick(item) {
      this.activeNav = item.id;
      this.actiiveTitle = item.category;
      this.currentPage = 1;
      this.getDataList(this.activeNav);
    },
    toDetali(item) {
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: {
          type: 2,
          id: item.id
        }
      });
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
  .nav-wrap {
    width: 20%;
    max-height: 80vh;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    //  border: 1px solid rgba(0, 0, 0, 0.15);
    // .h3{
    //   width: 100%;
    //   height: 45px;
    //   text-align: center;
    //   line-height: 45px;
    //   background-color: #E3F2FF;
    //   color: #0F92FF;
    //   font-size: 16px;
    //   .icon{
    //     width: 29px;
    //     vertical-align: middle;
    //     margin-right: 5px;
    //   }
    // }
    ul {
      // padding: 20px 0;
      li {
        text-align: center;
        height: 38px;
        line-height: 50px;
        font-size: 14px;
        cursor: pointer;
      }
      li + li {
        // border-top: 1px solid rgba(2, 95, 172, 0.22);;
      }
      .active {
        color: #0f92ff;
        border-right: 2px solid #0f92ff;
      }
    }
  }
  .content-wrap {
    box-sizing: border-box;
    width: 79%;
    margin-left: 1%;
    // border: 1px solid #cccccc;
    // padding: 20px;
    // &>.title{
    //   position: relative;
    //   border-bottom: 1px solid #cccccc;
    //   height: 30px;
    //   font-size: 19px;
    //   font-weight: 600;
    //   span{
    //     margin-left: 12px;
    //   }
    //   div{
    //     position: absolute;
    //     bottom: -2px;
    //     width: 100px;
    //     border-bottom: 3px solid #0F92FF;
    //   }
    // }
    ul {
      width: 100%;
      padding: 0 16px;
      // margin-top: 20px;
      font-size: 14px;
      .empty {
        height: 300px;
      }
      li {
        display: flex;
        justify-content: space-between;
        width: 97%;
        height: 38px;
        line-height: 38px;
        box-sizing: border-box;
        border-left: 1px solid #e9e4e4;
        border-right: 1px solid #e9e4e4;
        padding: 0 10px;
        .article-title {
          width: 63%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .article-date {
          width: 20%;
          color: #bababa;
        }
      }
      li:first-child {
        border-top: 1px solid #e9e4e4;
      }
      li:last-child {
        border-bottom: 1px solid #e9e4e4;
      }
      li:nth-child(even) {
        background-color: #f7f7f7;
      }
      li + li {
        border-top: 1px solid #e9e4e4;
      }
    }
    .content-page {
      text-align: right;
      margin: 15px 15px 0 0;
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
