<template>
  <div class="container">
    <h3>
    	<img src="../../../static/images/ss_title.png"/>
    	<span>实时上链数据</span>
    </h3>
    <ul class="container_content">
    	<li class="container_content_li" v-for="(item,index) in listData">
    		<h5>
    			<img src="../../../static/images/ss_title2.png"/>
    			<span>{{"ID "+item.id}}</span>
    		</h5>
    		<div class="">
    			<span>区块哈希</span>
    			<p>{{item.hash}}</p>
    		</div>
				<ul>
					<li>
						<span>上链时间：</span>
						<p>{{item.time}}</p>
					</li>
					<li>
						<span>交易数量：</span>
						<p>{{item.num}}笔</p>
					</li>
					<li>
						<span>大小：</span>
						<p>{{item.size}}</p>
					</li>
					<li>
						<span>数据类型：</span>
						<p>{{item.contract}}</p>
					</li>
				</ul>
    	</li>
    </ul>
  </div>
</template>
 
<script>
import { time, distributionChannelList, lineData, pieData } from "./config";
import { formatDate } from "@/common/util";
export default {
  data() {
    return {
      listData:[],
      num:80000,
    };
  },
  mounted() {
    this.getData()
    setInterval(() => {
      this.getData();//你所加载数据的方法
    
    }, 5000)
  },
  watch:{
  	
	},
  methods: {
    getData() {
      this.listData = [];
			for(var i = 0 ; i < 5 ;i++ ){
			    var obj = {};
			    obj.id = this.num+i;
			    obj.time = formatDate(
              new Date().getTime()-12000000-(5-i)*30000,
              "yyyy-MM-dd hh:mm:ss"
            );
			    obj.num = parseInt(Math.random()*100);
			    obj.size = parseInt(Math.random()*1000);
			    obj.contract = "企业合同";
			    obj.hash = (Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2)+Math.random().toString(16).slice(2)).slice(0, 64);
			    this.listData.push(obj)
			}
			this.num = this.listData[4].id;
      
    },
    
  },
};
</script>

<style lang="scss" scoped>
.container { 
  width: 100%;
	height: 290px;
	background: #FFFFFF;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.08);
	h3{
		display: flex;
    align-items: center;
    padding:10px 13px 0px 10px;
    box-sizing: border-box;
		img{
			width: 18px;
			height: 18px;
		}
		span{
			font-size: 18px;
			font-weight: 500;
			color: #333333;
			line-height: 25px;
			margin-left: 5px;
		}
	}
	.container_content{
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 13px;
		.container_content_li{
			width: 225px;
			height: 225px;
			background: url(../../../static/images/ss_bg.png) no-repeat;
			background-size: 100% 100%;
			padding: 10px 10px 0px;
			box-sizing: border-box;
			h5{
				display: flex;
		    align-items: center;
				img{
					width: 16px;
					height: 16px;
				}
				span{
					font-size: 16px;
					font-weight: 600;
					color: #0F92FF;
					line-height: 22px;
					margin-left: 3px;
				}
			}
			div{
				margin-top: 10px;
				font-size: 12px;
				color: rgba(0, 0, 0, 0.56);
				line-height: 17px;
				p{
					margin-top: 5px;
					word-break: break-all;
				}
			}
			ul{
				padding-top: 3px;
				box-sizing: border-box;
				li{
					display: flex;
					align-items: center;
					margin-top: 7px;
					span{
						width: 60px;
						font-size: 12px;
						font-weight: 600;
						color: #000000;
						line-height: 17px;
					}
					p{
						font-size: 12px;
						font-weight: 400;
						color: #000000;
						line-height: 17px;
					}
				}
			}
		}
	}
}
</style>
