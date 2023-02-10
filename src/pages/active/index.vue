<template>
  <div class="app-container subject">
        <el-row :gutter="24">
          <el-col :span="8" v-for="(item,index) in categoryList"
          :key="index">
             <el-image
                style="width: 100%; height: 100px"
                :src="url"
                :fit="fit">
            </el-image>
            <ul class="active-list-info">
                <li>
                    <i>活动地点</i>
                    <em>{{item.title}}</em>
                </li>
                <li>
                    <i>活动时间</i>
                    <em>{{item.time}}</em>
                </li>
                <li>
                    <i>主办方</i>
                    <em>{{item.info}}</em>
                </li>
            </ul>
            <div>
            
            </div>
          </el-col>
        </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
        url: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000',
        fit: 'fill',
        categoryList: [{
            id: 1,  
            img: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000',
            title: '活动标题字数最多不超过30个字如活动标题字数最多不超过30个字如活动标题字数最多多不超过30个字如活动标题字数最多不超过30个不超过30个字如活动标题字数最多不超过30个字如',
            add: '北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳。',
            time: '8月27日  9：30',
            info: '京东科技',
            info1: '232 人',
            info2: '232 人',
            name: '全部',
            },
            {
            id: 1,  
            img: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000',
            title: '活动标题字数最多不超过30个字如活动标题字数最多不超过30个字如',
            add: '北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳。',
            time: '8月27日  9：30',
            info: '京东科技',
            info1: '232 人',
            info2: '232 人',
            name: '全部',
            },
            {
            id: 1,  
            img: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000',
            title: '活动标题字数最多不超过30个字如活动标题字数最多不超过30个字如',
            add: '北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳。',
            time: '8月27日  9：30',
            info: '京东科技',
            info1: '232 人',
            info2: '232 人',
            name: '全部',
            },
            {
            id: 1,  
            img: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000',
            title: '活动标题字数最多不超过30个字如活动标题字数最多不超过30个字如',
            add: '北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳区广渠路的，北京市朝阳。',
            time: '8月27日  9：30',
            info: '京东科技',
            info1: '232 人',
            info2: '232 人',
            name: '全部',
            }
        ],
    };
  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
// @import '../../static/css/common.css';
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border:1px solid red;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
   .active-list-info{
        li{
            i{
                width: 60px;
                display: inline-block;
                
            }
            em{
                // float:right;
                width: calc(100% - 80px);
                display: inline-block;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2; 
            }
        }
    }
</style>
