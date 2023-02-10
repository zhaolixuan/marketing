<!--
    活动中心-列表页 活动列表(往期活动列表)
-->
<template>
  <div class="wrap"  v-loading="loading">
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 24px 0">
        <el-breadcrumb-item :to="{ path: '/cydn/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/cydn/activity'}">活动中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ barText }}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="tapBox">
        <subTitle style="font-weight:600;font-size:36px">{{ barText }}</subTitle>
        <div class="sort-wrap">
            <el-tag v-for="(item,index) in sortClass" :key="item" :class="{'tag':true,'active':index+4===category}" @click='soetClick(index)'>{{item}}</el-tag>
        </div>
      </div>
      
      <div>
         <el-empty v-if="list.data&&list.data.length<1" description="暂无数据"></el-empty>
        <ul class="con_list_box"  v-if="list.data&&list.data.length">
          <li v-for="item in list.data" :key="item.index">
            <list-item :itemData="item"></list-item>
          </li>
        </ul>
        <div class="page">
             <pagination :currentPage="currentPage" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
        
      </div>
  </div>
</template>

<script>
import {getActivityData} from '@/api/activity'
import subTitle from './components/subClassTitle'
import listItem from './components/listItem.vue'
import pagination from './components/jdPagination.vue'
export default {
    name:'activeList',
    components:{subTitle,listItem,pagination},
    data(){
        return{
            barText:'',
            sortClass:['全部','最热'],
            list:[],
            category:4,
            currentPage:1,
            total:1,
            loading:false
        }
    },
    mounted(){
        this.barText = this.$route.query.text
  
        this.getData()
       
    },
    methods:{
        getData(){
          this.loading = true
          getActivityData({type:this.$route.query.type,category:this.category,curPage:this.currentPage,pageSize:9}).then(res=>{
            this.loading = false
            console.log(res,'看看数据长啥样')
            this.list = res.data.retData[0]   
            this.total = res.data.retData[0].total
          })
        },
       
        soetClick(i){
            this.category = i+4
            this.currentPage = 1
            this.getData()
        },
        handleCurrentChange(page){
          this.currentPage = page
            this.getData()
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 60px;
  .sort-wrap{
      margin-right: 50px;
      .tag{
          margin-left: 60px;
          //background-color: #C7DDFF;
          color: #1D1D1F;
          cursor: pointer;
      }
      .active{
          //background-color: #0E67FF;
          color: #025AE5;
          border-bottom: 4px solid #025AE5 !important;
      }
      .el-tag--small{
        height: 36px;
      }
      .el-tag {
        font-size:24px ;
        //line-height:33px;
        background-color: transparent;
        border-color: transparent;
        border-bottom: 4px solid transparent;
        border-radius: 0px;
      }
  }
  .con_list_box {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 16px;
      margin-bottom: 30px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .page{
      margin-bottom: 10px;
  }
  .tapBox{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>