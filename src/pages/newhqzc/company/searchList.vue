<template>
  <div class="searchList">
    <v-head @search="delSearch" ref="currentIndex"></v-head>
    <div class="searchList_content" v-if="companyList.length>0">
      <div class="warp">
        <h3>为您找到符合条件的企业</h3>
        <ul class="list">
          <li class="list_li" v-for="(item,index) in companyList" :key="index" @click="detailEvent(item.entName,item)">
            <div class="list_li_left">
              <img src="../../../static/images/new_company.png"/>
            </div>
            <div class="list_li_right">
              <h5>
                <span class="h5_left" v-html="item.entName1"></span>
                <span class="h5_right" v-if="item.entStatus">[{{item.entStatus}}]</span>
              </h5>
              <ul>
                <li>
                  <span class="li_span">指定法人：{{item.frName?item.frName:"--"}}</span>
                  <span class="li_span">成立时间：{{item.esDate?item.esDate:"--"}}</span>
                </li>
                <li>
                  <span class="li_span">邮箱：{{item.email?item.email:"--"}}</span>
                  <span class="li_span">电话：{{item.phoneNumber?item.phoneNumber:"--"}}</span>
                </li>
                <li v-if="item.oldName">
                  <span>曾用名：<span v-html="item.oldName1"></span></span>
                </li>
                <li>
                  <span>地址：{{item.dom?item.dom:"--"}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="noData" v-else>
      <img src="../../../static/images/empty.png" alt="" />
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import auth from "../mixin/auth";
import { searchCompany,getAuthCompany } from "@/api/hqzc";
import { to } from "@/common/util";
import vHead from "../components/header.vue";
export default {
  mixins: [auth],
  components: { 
    vHead,
  },
  data() {
    return {
      companyName1:"",
      companyList:[],
      isNo:false,
    };
  },
  mounted() {
    this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.companyName1 = this.$route.query.companyName;
    this.$refs["currentIndex"].setCurrentIndex(1);
    this.$refs["currentIndex"].setKeyword(this.companyName1);
    this.getList();
    
  },
  methods: {
    toPath(path, key = "companyName", value) {
      this.$router.push({
        path,
        query: {
          [key]: value || this.companyName1,
        },
      });
    },
    //搜索
    delSearch(value){
      this.companyName1 = value;
      this.getList();
    },
    //公司列表
    getList(){
      searchCompany({companyName: this.companyName1,PageNo: 1}).then((res) => {
        if(res.data.success){
            this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            }).close();
            
            var arr = res.data.retData
            let flag = arr.find((item) => item.entName === this.companyName1);
            if(flag){
              if(arr[0].scoreMark ==1){
                this.toPath("/cydn/companyInfo", "companyName",this.companyName1);
              }else{
                this.$message({
                    message: '该企业已不在营业状态，暂无分析结果。',
                    type: 'warning'
                });
              }
            }else{
              for(var i=0;i<res.data.retData.length;i++){
                var nt = '<span style="color:red;float: none;">'+this.companyName1+"</span>";
                var reg = RegExp(this.companyName1,"g");
                res.data.retData[i].entName1=res.data.retData[i].entName.replace(reg,nt);
                if(res.data.retData[i].oldName){
                  res.data.retData[i].oldName1=res.data.retData[i].oldName.replace(reg,nt);
                }
                this.companyList = res.data.retData;
              }
              this.getAuthCompany();
            }
        }else{
          this.getAuthCompany();
        }
      });
    },
    //获取公司信息2
    getAuthCompany(){
     getAuthCompany({ companyName: this.companyName1 }).then((res) => {
        if(JSON.stringify(res.data.retData)!="{}"){
         this.toPath("/cydn/companyInfo", "companyName",this.companyName1);
        }
        
      });
    },
    //查看详情
    detailEvent(entName,item){
      if(item.scoreMark&&(item.scoreMark==1)){
        this.$router.push({
          path: "/cydn/companyInfo",
          query: {
            companyName:entName,
          }
        });
      }else{
        this.$message({
          message: '该企业已不在营业状态，暂无分析结果。',
          type: 'warning'
        });
      }
      
    },
  }
};
</script>
<style lang="scss" scoped>
.searchList {
  width: 100%;
  background: #F6F8FE;
  .searchList_content{
    width: 100%;
    padding: 60px 0px;
    box-sizing: border-box;
    .warp{
      width: 1200px;
      margin: 0 auto;
      h3{
        font-size: 36px;
        font-weight: 600;
        color: rgba(29,29,31,1);
      }
      .list{
        width: 100%;
        margin-top: 25px;
        background: rgba(255,255,255,1);
        box-shadow:  0 2px 40px 5px rgba(230,230,230,0.3);
        padding: 10px 50px 0px;
        box-sizing: border-box;
        .list_li{
          display: flex;
          flex-wrap: wrap;
          padding: 50px 0px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(219,219,219,1);
          cursor: pointer;
          &:last-child{
            border-bottom:none !important;
          }
          .list_li_left{
            width: 180px;
            img{
              width:130px;
              height: 130px;
            }
          }
          .list_li_right{
            flex: 1;
            h5{
              font-size: 20px;
              font-weight: 600;
              .h5_left{
                color: rgba(29,29,31,1)
              }
              .h5_right{
                color: #0E67FF;
              }
            }
            ul{
              padding-top: 10px;
              box-sizing: border-box;
              li{
                width: 100%;
                display: flex;
                margin-top: 10px;
                line-height: 20px;
                span{
                  font-size: 15px;
                  color: rgba(102,102,102,1);
                }
                .li_span{
                  width: 40%;
                }
              }
            }
          }
        }
      }
      
    }
    // min-height: calc(100vh - 60px - 240px - 15.6px);
  }
  .noData {
      width: 1200px;
      margin: 20px auto;
      background: #fff;
      padding: 60px 0px;
      box-sizing: border-box;
      text-align: center;
      img {
        width: 400px;
        height: 400px;
      }
      p {
        margin-top: 15px;
        font-size: 25px;
        font-weight: 600;
        color: #0a88ff;
        line-height: 36px;
      }
    }
 
}
</style>
