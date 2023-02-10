<template>
  <div class="app-container">
    <div class="content">
      <div class="title">{{ mainData.title }}</div>
      <div class="create-date-wrap">
        <div class="date">发布日期：{{mainData.createTime|hendelDate}}</div>
        <div class="author">发布人：{{mainData.releaseUser}}</div>
      </div>
      <div class="content-body">
        <div v-html="mainData.content"></div>
      </div>
      <div class="flie" v-if="mainData.fileName">
        <p>相关附件：</p>
        <ul>
          <li @click="getUpload">{{mainData.fileName}}</li>
        </ul>
      </div>
      <div class="up-next">
        <div class="prev" v-if="beforeObj.id">
          上一篇
          <span @click="getOtherDetail(beforeObj)" style="margin-left:20px">{{beforeObj.title}}</span>
        </div>
        <div class="next" v-if="afterObj.id">
          下一篇
          <span @click="getOtherDetail(afterObj)" style="margin-left:20px">{{afterObj.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/util";
import { getDetail } from "@/api/cyzj.js";
import api from "@/api/cyzjApi.js";
export default {
  data() {
    return {
      imgUrl: process.env.VUE_APP_IMG_URL,
      imgUrlFileInfo: process.env.VUE_APP_IMG_URL_FILE_INFO,
      queryOp: {},
      apiMap: {
        //0:智库详情，1：阀门资料详情，2:产业要问详情,3:项目案例详情,4:学术详情,5:专家期刊详情
        0: "",
        1: "/industryInformation/industryDetails",
        2: "/industryInformation/informationDetails",
        3: "/industryExperts/getOtherInfo"
        // 4: "/industryExperts/getOtherInfo",
        // 5: "/industryExperts/getOtherInfo"
      },
      mainData: {},
      id: "",
      type: "",
      beforeTitle: "",
      afterTitle: "",
      beforeObj: {
        title: "",
        id: ""
      },
      afterObj: {
        title: "",
        id: ""
      },
      expertsId: ""
    };
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
    }
  },
  mounted() {
    this.queryOp = this.$route.query;
    this.id = this.$route.query.id;
    this.type = this.$route.query.type || "";
    this.expertsId = this.$route.query.expertsId || "";
    this.moldType = this.$route.query.moldType;
    this.getDetail();
    console.log(this.$route.query);
    // this.getBeforeAfter(Number(this.$route.query.index), this.$route.query.list);
  },
  watch: {
    $route(n, o) {
      if (n.fullPath !== o.fullPath) {
        //监听路由参数是否变化
        this.id = this.$route.query.id;
        this.type = this.$route.query.type || "";
        this.getDetail(); //methods中封装的加载数据函数
      }
    }
  },
  methods: {
    getDetail() {
      var params;
      if (this.type == "1") {
        params = {
          industryId: this.id
        };
      } else if (this.type == "2") {
        params = {
          informationId: this.id
        };
      } else {
        params = {
          id: this.id,
          expertsId: this.expertsId,
          type: this.moldType
        };
      }
      getDetail(this.apiMap[this.type], params).then(res => {
        if (res.status == 200) {
          this.beforeObj = {};
          this.afterObj = {};
          //阀门资料数据
          // if (this.type == "1") {
          //   this.mainData = {
          //     content: res.data.retData[i].content,
          //     createTime: res.data.retData[i].releaseTime,
          //     title: res.data.retData[i].title,
          //     releaseUser: res.data.retData[i].releaseUser,
          //     fileName: res.data.retData[i].fileName,
          //     fileUrl: res.data.retData[i].fileUrl
          //   };
          // }
          //产业要闻数据
          if (this.type == "2" || this.type == "1") {
            for (var i = 0; i < res.data.retData.length; i++) {
              if (res.data.retData[i].sort == "0") {
                this.beforeObj = {
                  title: res.data.retData[i].title,
                  id: res.data.retData[i].id
                };
              }
              if (res.data.retData[i].sort == "1") {
                this.mainData = {
                  content: res.data.retData[i].content,
                  createTime: res.data.retData[i].releaseTime,
                  title: res.data.retData[i].title,
                  releaseUser: res.data.retData[i].releaseUser,
                  fileName: res.data.retData[i].fileName,
                  fileUrl: res.data.retData[i].fileUrl
                };
              }
              if (res.data.retData[i].sort == "2") {
                this.afterObj = {
                  title: res.data.retData[i].title,
                  id: res.data.retData[i].id
                };
              }
            }
          } else {
            this.beforeObj = {
              title: res.data.retData[0].columns.onA.title,
              id: res.data.retData[0].columns.onA.id
            };
            this.afterObj = {
              title: res.data.retData[0].columns.next.title,
              id: res.data.retData[0].columns.next.id
            };
            this.mainData = {
              content: res.data.retData[0].columns.content,
              createTime: res.data.retData[0].columns.createTime,
              title:
                this.moldType == "3"
                  ? res.data.retData[0].columns.projectName
                  : res.data.retData[0].columns.title,
              releaseUser: res.data.retData[0].columns.userId,
              fileUrl: res.data.retData[0].columns.attachment || "",
              fileName: res.data.retData[0].columns.attachment || ""
            };
          }
          this.mainData.content = this.mainData.content.replace(/<img/g,"<img style='width:100%;height:auto;'");
        }
      });
    },
    getOtherDetail(obj) {
      this.id = obj.id;
      this.$router.push({
        path: "/cydn/cyzj/detali",
        query: { type: this.type, id: obj.id }
      });
    },
    getUpload() {
      window.open(this.imgUrl + this.mainData.fileUrl);
    }
    // //判断当前详情是否存在上一篇或者下一篇
    // getBeforeAfter(index, list) {
    //   console.log(list, "lll");
    //   return;
    //   if (index == 0 && index == list.length - 1) {
    //     this.beforeTitle = "暂时没有了！";
    //     this.afterTitle = "暂时没有了！";
    //     this.afterId = "";
    //     this.beforeId = "";
    //   } else if (index == list.length - 1 && index != 0) {
    //     this.afterTitle = "暂时没有了！";
    //     this.afterId = "";
    //     this.beforeTitle = list[index - 1].columns.title;
    //     this.beforeId = list[index - 1].columns.id;
    //   } else if (index == 0 && index != list.length - 1) {
    //     this.beforeTitle = "暂时没有了！";
    //     this.beforeId = "";
    //     this.afterTitle = list[index + 1].columns.title;
    //     this.afterId = list[index + 1].columns.id;
    //   } else {
    //     this.beforeTitle = list[index - 1].columns.title;
    //     this.beforeId = list[index - 1].columns.id;
    //     this.afterTitle = list[index + 1].columns.title;
    //     this.afterId = list[index + 1].columns.id;
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  background: #ffffff;
  padding: 50px;
  box-sizing: border-box;
}
.content {
  padding-right: 22px;
  padding-left: 8px;
  .title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    letter-spacing: 2px;
    line-height: 35px;
    margin-bottom: 16px;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
  }
  .create-date-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    font-size: 14px;
    font-weight: 600;
    color: #828282;
    .author {
      margin-left: 25px;
    }
  }
  .content-body {
    margin: 16px 0;
    line-height: 25px;
    img {
      max-width: 100%;
    }
  }
  .up-next {
    margin-top: 50px;
    line-height: 37px;
    div {
      span {
        cursor: pointer;
        &:hover {
          color: #005ced;
        }
      }
    }
  }
  .flie {
    display: flex;
    align-items: center;
    li {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
      &:hover {
        color: #005ced;
      }
    }
  }
}
</style>
