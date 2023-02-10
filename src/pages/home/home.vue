<template>
    <div>
        <div class="bannerBox">
            <img
                src="../../static/images/qt_banner.png"
                v-if="bannerList.length == 0"
            />
            <el-carousel :height="banner_height" v-else>
                <el-carousel-item
                    v-for="(item, index) in bannerList"
                    :key="index"
                >
                    <img
                        :src="imgurl + item.pics"
                        alt
                        @click="linkUrlEvent(item)"
                        :style="{ cursor: item.url ? 'pointer' : 'default' }"
                    />
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 最新成交 -->
        <div v-if="$config.citycode == 'panzhihua'" class="coreServices new">
            <div class="zxcj">
                <img class="img" src="../../static/images/zxcj.png" alt="" />
                <span>最新成交 </span>
                <el-carousel indicator-position="none" height="36px">
                    <el-carousel-item
                        v-for="(item, index) in zxchData"
                        :key="index"
                    >
                        <div class="content">
                            <p>
                                {{ item.orderDetail }}
                            </p>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 核心产品及服务 -->
        <div class="coreServices" v-if="$config.citycode != 'panzhihua'">
            <div class="title_box inner">
                <h3>核心产品及服务</h3>
                <div class="subTitle">
                    让每一位上云的客户成为全球绿色节能和降低碳排放的贡献者
                    <span class="more_btn disabled">查看更多></span>
                </div>
            </div>
            <core-services></core-services>
        </div>
        <!-- 外贸数据 -->
        <div class="foreignTrade" v-if="$config.citycode != 'panzhihua'">
            <div class="title_box inner">
                <h3>外贸数据</h3>
                <div class="subTitle">
                    遍布全球的基础设施节点为用户提供快速稳定、智能可靠的服务
                    <span
                        class="more_btn"
                        @click="routerPath('/cydn/resources/tradeSituation')"
                        >查看数据></span
                    >
                </div>
            </div>
            <ul class="tapBox_title">
                <li v-for="(item, index) in tapList" :key="item.id">
                    <span
                        :class="{ spanActive: tapId == item.id }"
                        @click="tap(item.id, index)"
                        >{{ item.name }}</span
                    >
                </li>
            </ul>
            <div class="foreignTrade_inner">
                <div class="tapBox" inner>
                    <div class="tapBox_container">
                        <div class="tapBox_container_left">
                            <ul class="tapBox_container_leftBox">
                                <li>
                                    <p>主要贸易国家</p>
                                    <div>
                                        <span>{{ tapList[tapId - 1].one }}</span
                                        >个
                                    </div>
                                </li>
                                <li>
                                    <p>交易次数</p>
                                    <div>
                                        <span>{{
                                            tapList[tapId - 1].three
                                        }}</span
                                        >次
                                    </div>
                                </li>
                                <li>
                                    <p>交易数量</p>
                                    <div>
                                        <span>{{
                                            tapList[tapId - 1].four
                                        }}</span
                                        >个
                                    </div>
                                </li>
                            </ul>
                            <div class="tapBox_container_echartsBox">
                                <div class="map-view" id="map" ref="map"></div>
                            </div>
                        </div>
                        <div class="tapBox_container_right">
                            <div class="right_data">
                                <h4>
                                    <img
                                        src="../../static/images/first/icon1.png"
                                        alt
                                    />
                                    <span>数据展示</span>
                                </h4>
                                <ul>
                                    <li>
                                        <p>数据源国家</p>
                                        <div>
                                            <span>{{
                                                tapList[tapId - 1].five
                                            }}</span
                                            >个
                                        </div>
                                    </li>
                                    <li>
                                        <p>采购商数量</p>
                                        <div>
                                            <span>{{
                                                tapList[tapId - 1].six
                                            }}</span
                                            >个
                                        </div>
                                    </li>
                                    <li>
                                        <p>采购数据数</p>
                                        <div>
                                            <span>{{
                                                tapList[tapId - 1].seven
                                            }}</span
                                            >个
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="distribution">
            <div class="title_box inner">
                <h3>商城</h3>
                <div class="subTitle">
                    遍布全球的基础设施节点为用户提供快速稳定、智能可靠的服务
                    <span class="more_btn" @click="getStore">进入应用></span>
                </div>
            </div>
            <div class="container inner">
                <ul class="container_left">
                    <li
                        v-for="(item, index) in shopFloor"
                        :key="index"
                        @click="shopEvent(item.id)"
                        class="left_item"
                    >
                        <div class="left_tit">
                            <img :src="item.imgSrc" class="tit_icon" />
                            <span
                                :class="{ spanActive1: shopFloorId == item.id }"
                                >{{ item.name }}</span
                            >
                        </div>
                        <div class="left_box" v-if="shopFloorId == item.id">
                            <img
                                src="../../static/images/first/icon212.png"
                                class="left_com_img"
                            />
                        </div>
                    </li>
                </ul>
                <ul class="container_right">
                    <li v-for="item in shopList" :key="item.id">
                        <div v-if="shopFloorId == 1">
                            <p class="imgBox">
                                <img
                                    :src="
                                        item.goodsPictureOne &&
                                        imgurl +
                                            item.goodsPictureOne.split(',')[0]
                                    "
                                    alt
                                    @click="shopOpenEvent(item)"
                                />
                            </p>
                            <p class="p">{{ item.goodsName }}</p>
                        </div>
                        <div v-else-if="shopFloorId == 2">
                            <p class="imgBox">
                                <img
                                    :src="imgurl + item.brainLogoId"
                                    alt
                                    @click="shopOpenEvent(item)"
                                />
                            </p>
                            <p class="p">{{ item.brainName }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="zcsb" v-if="popularPolicy.length > 0">
            <div class="title_box inner">
                <h3>政策申报</h3>
                <div class="subTitle">
                    政策利民
                    <span class="more_btn" @click="handleMorePolicy"
                        >查看更多></span
                    >
                </div>
            </div>
            <!-- <ul class="inner">
        <li
          v-for="item in policyDeclarationList"
          :key="item.id"
          @click="handlePolicyDetails(item)"
        >
          <div class="top">
            <h5>{{ item.title }}</h5>
            <div>
              <h6>
                <span v-for="tag in item.policyThemes" :key="tag">
                  {{ tag }}
                  <span style="padding: 0px 3px 0 0px; box-sizing: border-box"
                    >/</span
                  >
                </span>
              </h6>
            </div>
            <p>{{ item.contextAbstract }}</p>
          </div>
          <div class="bottom">
            <span>
              <i class="el-icon-view"></i>
              {{ item.declarableFunds || 0 }}
            </span>
            <span>
              <i class="el-icon-user"></i>
              {{ item.declareCount || 0 }}
            </span>

            <div class="active" @click.stop="handleDeclareImmediately(item)">
              点击申报
            </div>
          </div>
        </li>
      </ul> -->
            <div class="popular-policy-content">
                <div
                    class="popular-policy-item"
                    v-for="(item, index) in popularPolicy.slice(0, 4)"
                    :key="index"
                    @click="handlePolicyDetail(item.id)"
                >
                    <div class="popular-policy-title">
                        {{ item.title | defaultValue }}
                    </div>
                    <div class="popular-policy-text">
                        {{ item.contextAbstract | defaultValue }}
                    </div>
                    <div class="issued-by-wrap">
                        <div class="issued-by">
                            <span
                                v-for="tag in item.themes"
                                :key="tag"
                                class="span"
                            >
                                {{ tag }}
                            </span>
                        </div>
                        <div class="time">
                            {{
                                item.issueTime
                                    | filterTime('YYYY-MM-DD')
                                    | defaultValue
                            }}
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="views-wrap">
                        <div class="icon-eyes"></div>
                        <div class="views">{{ item.heat }}</div>
                        <div class="icon-like"></div>
                        <div class="collection">{{ item.collectNumber }}</div>
                    </div>
                    <!-- 可申报政策显示这个 -->
                    <div
                        class="popular-policy-bottom"
                        v-if="
                            (!isLogin || !isAuth) &&
                            item.policyCategory === 'declare'
                        "
                    >
                        <div class="money-wrap">
                            <div class="money"><span>万元</span></div>
                            <div class="text">预计可申报资源</div>
                        </div>
                        <div class="btn" @click.stop="unlockDeclaredLimit">
                            立即解锁申报额度
                        </div>
                    </div>
                    <!-- 可申报政策显示这个 -->
                    <div
                        class="popular-policy-bottom"
                        v-if="
                            isLogin &&
                            isAuth &&
                            item.policyCategory === 'declare'
                        "
                    >
                        <div class="money-wrap">
                            <div
                                class="money"
                                :class="{ isAuth: isLogin && isAuth }"
                            >
                                {{ item.declarableFunds | defaultValue
                                }}<span>万元</span>
                            </div>
                            <div class="text">预计可申报资源</div>
                        </div>
                        <div
                            class="btn"
                            @click.stop="handleDeclareImmediately(item)"
                        >
                            立即申报
                        </div>
                    </div>
                    <!-- 不可申报政策显示这个 -->
                    <div
                        class="popular-policy-bottom detail"
                        v-if="item.policyCategory === 'ordinary'"
                    >
                        <div
                            class="btn"
                            @click.stop="handlePolicyDetail(item.id)"
                        >
                            查看详情
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="hyzj"
            v-if="$config.citycode != 'panzhihua' && expertsList.length"
        >
            <div class="title_box inner">
                <h3>行业专家</h3>
                <div class="subTitle">
                    各个领域知名的行业专家
                    <span
                        class="more_btn"
                        @click="routerPath('/cydn/cyzj/warehouse')"
                        >查看更多></span
                    >
                </div>
            </div>
            <div class="inner">
                <accordion :listData="expertsList"></accordion>
            </div>
        </div>

        <div class="zc">
            <div class="inners">
                <div class="left">
                    <h6 class="title">
                        <img src="../../static/images/first/icon5.png" alt />
                        <span>热门政策</span>
                        <em
                            @click="routerPath('/cydn/hqzc/policyList')"
                            class="look_more"
                            >查看更多></em
                        >
                    </h6>
                    <ul>
                        <li
                            v-for="item in hotPolicyList.slice(0, 5)"
                            :key="item.id"
                            @click="handlePolicyDetails(item)"
                        >
                            <p>{{ item.title }}</p>
                            <p>
                                {{ item.issueTime | filterTime('yyyy-MM-DD') }}
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <h6 class="title">
                        <img src="../../static/images/first/icon6.png" alt />
                        <span>最新资讯</span>
                        <em
                            @click="routerPath('/cydn/information')"
                            class="look_more"
                            >查看更多></em
                        >
                    </h6>
                    <ul class="zx">
                        <li
                            v-for="item in messageList"
                            :key="item.id"
                            @click="toMessageDetail(item)"
                        >
                            <p>{{ item.title }}</p>
                            <p>
                                {{ item.createTime | filterTime('yyyy-MM-DD') }}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="huodong">
                <h6 class="title">
                    <img src="../../static/images/first/icon4.png" alt />
                    <span>最新活动</span>
                    <em @click="moreActive('活动列表', 1)" class="look_more"
                        >查看更多></em
                    >
                </h6>
                <ul class="hd">
                    <li
                        v-for="item in ActivityData"
                        :key="item.id"
                        @click="toActiveDetail(item.id)"
                    >
                        <img
                            style="width: 100%; height: 100%"
                            :src="imgurl + item.icon"
                            alt
                        />

                        <!-- <h6>{{ item.title }}</h6> -->
                        <!-- <span>查看详情></span> -->
                    </li>
                </ul>
            </div>
        </div>

        <div class="cshl" v-if="$config.citycode == 'panzhihua'">
            <div class="title_box inner">
                <h3>城市互联</h3>
                <div class="subTitle">
                    政策利民
                    <!-- <span class="more_btn" @click="handleMorePolicy"
                        >查看更多></span
                    > -->
                </div>
            </div>
            <ul class="hl">
                <li v-for="item in 1" :key="item.item" @click="toYH(item)">
                    <!-- {{ item }} -->
                    <img
                        style="width: 100%; height: 100%"
                        src="../../static/images/cshl.png"
                        alt
                    />
                    <!-- <div class="content">
                        <h6>玉环水暖阀门供销平台</h6>
                        <span
                            >玉环产业大脑主营水暖阀门等产品，产品畅销海内外，欢迎选购</span
                        >
                    </div> -->
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import world from './world.json'
import { nameMap, mapData } from './config'
import Empty from '../../components/Empty.vue'
import '../../static/js/swiper.min.js'
import {
    indexGetPolicyByType,
    getKeyWordSearch,
    getPopularPolicy,
    getDeclare,
    getOrderDetail,
} from '@/api/hqzc.js'
import { getBanner } from '@/api/baseApi'
import { hotShopList, brainList } from '@/api/shopApi'
import { getActivityData, getActivityRecommendData } from '@/api/activity'
import { informationList } from '@/api/information.js'
import api from '@/api/cyzjApi'
import { to } from '@/common/util'
import accordion from './accordion.vue'
import coreServices from './coreServices.vue'
import { authorization } from '@/common/authorization.js'
export default {
    components: { Empty, accordion, coreServices },
    data() {
        return {
            isLogin: false,
            isAuth: false,
            imgurl: process.env.VUE_APP_IMG_URL,
            bannerList: [],
            hotPolicyList: [],
            messageList: [],
            ActivityData: [],
            shopList: [],
            banner_height: '520px',
            tapList: [
                {
                    name: '美国',
                    id: '1',
                    one: '9',
                    three: '447',
                    four: '1200189',
                    five: '10',
                    six: '101',
                    seven: '5063',
                },
                {
                    name: '俄罗斯',
                    id: '2',
                    one: '19',
                    two: '55',
                    three: '12906',
                    four: '14763186',
                    five: '42',
                    six: '533',
                    seven: '5063',
                },
                {
                    name: '秘鲁',
                    id: '3',
                    one: '20',
                    two: '876',
                    three: '20671',
                    four: '24163186',
                    five: '49',
                    six: '962',
                    seven: '5063',
                },
                {
                    name: '印度尼西亚',
                    id: '4',
                    one: '18',
                    two: '876',
                    three: '9110',
                    four: '12937066',
                    five: '33',
                    six: '703',
                    seven: '5063',
                },
            ],
            tapId: '1',

            shopFloorId: '1',
            shopFloor: [
                {
                    name: '热销商品',
                    id: '1',
                    imgSrc: require('../../static/images/first/icon11.png'),
                },
                {
                    name: '精品大牌',
                    id: '2',
                    imgSrc: require('../../static/images/first/icon22.png'),
                },
            ],
            expertsList: [],
            policyDeclarationList: [],
            popularPolicy: [],
        }
    },
    created() {
        this.getUserInfo()
        this.getPopularPolicy()
    },
    mounted() {
        if (this.$config.citycode != 'panzhihua') {
            this.initMap(mapData)
        }
        this.shopEvent(1)
        this.getBanner()
        this.informationList()
        this.getActivityData()
        this.getPolicyList()
        this.getExpertsList()
        this.getZxcjData()
        this.$nextTick(function () {
            this.banner_height = document.body.clientWidth / 3.69 + 'px'
            window.onresize = () => {
                return (() => {
                    this.banner_height = document.body.clientWidth / 3.69 + 'px'
                })()
            }
        })
    },
    methods: {
        async getZxcjData() {
            const res = await getOrderDetail()
            this.zxchData = res.data.rows
        },
        async getUserInfo() {
            console.log(2)
            this.isLogin = !!localStorage.getItem('token')
            if (this.isLogin) {
                // 更新用户信息
                const res = await this.$store.dispatch('getUserInfo')
                this.isAuth = res.supplierApprovalStatus === 'success'
            }
        },
        handlePolicyDetails(item) {
            const { href } = this.$router.resolve({
                path: '/cydn/policyDetails',
                query: {
                    id: item.id,
                },
            })
            window.open(href, '_blank')
        },
        linkUrlEvent(item) {
            if (!item.url) {
                return
            }
            if (item.url.search(/\${token}/) > -1 && !localStorage.token) {
                this.$router.push({
                    path: 'login',
                })
            } else if (item.url.search(/\${token}/) > -1) {
                window.open(item.url.replace(/\${token}/, localStorage.token))
            } else if (item.url.indexOf('http') > -1) {
                window.open(`${item.url}`)
            } else {
                this.$router.push({
                    path: item.url,
                })
            }
        },
        async getBanner() {
            const bannerList = await getBanner({
                search_EQ_type: 'webHomePage',
            })
            this.bannerList = bannerList.data.rows
        },
        async informationList() {
            const messageList = await informationList({
                pageSize: 5,
                curPage: 1,
            })
            this.messageList = messageList.data.retData[0].data
        },
        async getActivityData() {
            const ActivityData = await getActivityData({
                type: 1,
                curPage: 1,
                pageSize: 3,
            })
            this.ActivityData = ActivityData.data.retData[0].data
        },
        async getPolicyList() {
            const res = await getPopularPolicy()
            this.hotPolicyList = res.data.retData
        },

        async shopEvent(foolerId) {
            if (this.shopFloorId !== foolerId) {
                this.shopFloorId = foolerId
                this.shopList = []
                let res
                if (foolerId == 1) {
                    res = await hotShopList({
                        page: 1,
                        rows: 10,
                    })
                    this.shopList = res.data.rows
                } else if (foolerId == 2) {
                    res = await brainList({
                        page: 1,
                        rows: 10,
                        sort: 'updatetime',
                        order: 'desc',
                        search_EQ_examineStatus: '审核通过',
                    })
                    this.shopList = res.data.rows
                }
            }
        },

        shopOpenEvent(item) {
            if (this.shopFloorId == 1) {
                this.$router.push({
                    path: `/cydn/retail/commodity?goodsId=${item.id}&shopId=${item.decoraShopId}`,
                })
            } else if (this.shopFloorId == 2) {
                this.$router.push({
                    path: `/cydn/retail/shop?shopId=${item.decoraShopId}`,
                })
            }
        },

        routerPath(path) {
            this.$router.push({
                path: path,
            })
        },
        toYH() {
            window.open('http://qsx-test.xjoycity.com/index.html#/cydn/home')
        },
        toActiveDetail(id) {
            this.$router.push({
                path: '/cydn/activity/detail',
                query: {
                    id,
                },
            })
        },
        toMessageDetail(item) {
            console.log(item, '333')
            this.$router.push({
                path: '/cydn/information/detali',
                query: {
                    id: item.id,
                    title: item.title,
                    navTitle: this.navTitle,
                },
            })
        },
        moreActive(text, type) {
            this.$router.push({
                path: '/cydn/activity/list',
                query: {
                    text,
                    type,
                },
            })
        },

        tap(id, index) {
            this.tapId = id
            // 切换 tab 时修改数据
            mapData.forEach((item) => (item.selected = false))
            mapData[index].selected = true
            this.initMap(mapData)
        },

        initMap(data = []) {
            const dom = this.$refs.map
            const myChart = this.$echarts.init(dom)
            this.$echarts.registerMap('world', world)
            const option = {
                tooltip: {
                    trigger: 'item',
                    geo: {
                        left: 500,
                        // top: 'auto' ,
                        // right: 'auto' ,
                        // bottom: 'auto' ,
                    },
                    formatter: function (params) {
                        // 没有数据时不显示
                        if (!params.data) return
                        const {
                            marker,
                            data: { ranking, name, value },
                        } = params
                        // return `国家名称: ${name} <br /> 贸易量: ${value} <br /> 排名: ${ranking}`;
                        return `<div class="mapBox">
                <p><span class="mapSpan">国家:</span><span class="mapName">${name}</span></p>
                <p><span class="mapSpan">贸易量:</span><span class="mapName">${value}</span></p>
                <p><span class="mapSpan">排名:</span><span class="mapName">${ranking}</span></p>
            </div>`
                    },
                    backgroundColor: '#0E67FF',
                    borderWidth: 0,
                    color: '#000',
                    fontWeight: 600,
                    fontFamily: 'Microsoft YaHei',
                    fontSize: '12',
                    extraCssText:
                        'background: linear-gradient(137deg, rgba(255, 255, 255, 0.84) 0%, rgba(246, 249, 255, 0.88) 100%);box-shadow: 0px 8px 16px 6px rgba(30, 33, 35, 0.08), 0px 8px 16px 6px rgba(31, 38, 50, 0.07);backdrop-filter: blur(13px);border-radius: 4px;padding:8px;color: #595959;',
                },
                series: [
                    {
                        name: '世界地图',
                        type: 'map',
                        map: 'world',
                        top: 25,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        data,
                        // 自定义名称映射
                        nameMap,
                        label: {
                            color: '#fff',
                        },
                        itemStyle: {
                            borderWidth: 0, // 边际线大小
                            borderColor: '', // 边界线颜色
                            areaColor: 'rgb(142, 197, 255)',
                        },
                        emphasis: {
                            label: {
                                show: false,
                                color: '#fff',
                            },
                            itemStyle: { areaColor: 'rgb(142, 197, 255)' },
                        },
                        select: {
                            label: {
                                show: false,
                                color: '#fff',
                            },
                            itemStyle: {
                                areaColor: 'rgb(142, 197, 255)',
                            },
                        },
                    },
                ],
            }
            myChart.setOption(option)

            // 添加点击事件
            myChart.on('click', ({ name }) => {
                const index = mapData.findIndex((item) => item.name === name)
                // 没有数据的直接退出
                if (index === -1) return
                this.countryOrArea = name
                this.$emit('changeCountryOrArea', name)
            })
        },

        handlePolicyDetail(item) {
            this.$router.push({
                path: '/cydn/policyDetails',
                query: {
                    id: item.id,
                },
            })
        },
        getExpertsList() {
            let params = {
                curPage: 1,
                pageSize: 5,
            }
            api.getExpertsList(params).then((res) => {
                if (res.status == 200) {
                    this.expertsList = res.data.retData[0].data
                    for (let i = 0; i < this.expertsList.length; i++) {
                        if (this.expertsList[i].goodAtField) {
                            let ids = this.expertsList[i].goodAtField
                            this.expertsList[i].goodAtFieldArr = ids
                                .split(',')
                                .join(' / ')
                        } else {
                            this.expertsList[i].goodAtFieldArr = ''
                        }
                    }
                }
            })
        },
        async handleDeclareImmediately(item) {
            // const isAuth = await authorization.call(this);
            // if (isAuth) {
            getDeclare({ policyId: item.id })
                .then((res) => {
                    if (res.data.success) {
                        this.$message.error('您已申请过该政策，看看别的吧！')
                    } else {
                        this.$router.push({
                            path: '/cydn/declareImmediately',
                            query: {
                                id: item.id,
                                title: item.title,
                            },
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            // }
        },
        getStore() {
            this.$router.push('/cydn/retail/index')
        },
        // 获取热门政策
        async getPopularPolicy() {
            let result = await getPopularPolicy()
            var policyDeclarationListRes = result.data.retData
            if (policyDeclarationListRes) {
                policyDeclarationListRes.map((item) => {
                    item.themes = item.themes.split(',')
                    if (item.policyCategory === 'declare') {
                        this.popularPolicy.push(item)
                    }
                })
            }
            console.log(this.popularPolicy, 'policyDeclarationListRes')
        },
        // 查看更多
        handleMorePolicy() {
            const { href } = this.$router.resolve('/cydn/hqzc/policyList')
            window.open(href, '_self')
        },
        // 查看政策详情
        handlePolicyDetail(id) {
            const { href } = this.$router.resolve({
                path: '/cydn/policyDetails',
                query: {
                    id,
                },
            })
            window.open(href, '_blank')
        },
        // 立即解锁申报额度
        unlockDeclaredLimit() {
            authorization.call(this)
        },
    },
    beforeRouteUpdate(to, from, next) {
        // 退出登录之后更新用户信息
        this.getUserInfo()
        next()
    },
}
</script>
<style lang="scss" scoped>
.inner {
    width: 1200px;
    margin: 0 auto;
}
.title_box {
    h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-family: 'Microsoft YaHei';
        font-weight: 600;
        color: #0d0d0d;
        padding-top: 45px;
    }
    .subTitle {
        font-size: 14px;
        font-family: 'Microsoft YaHei';
        color: #0d0d0d;
        padding: 10px 0 40px;
        text-align: center;
        .more_btn {
            color: #007fef;
            cursor: pointer;
            margin-left: 5px;
            letter-spacing: 1px;
        }
        .disabled {
            color: #c7c7c7;
            margin-left: 5px;
            letter-spacing: 1px;
        }
    }
}
.title {
    // height: 50px;
    img {
        width: 45px;
        height: 45px;
        margin-right: 20px;
        vertical-align: middle;
    }
    span {
        font-size: 20px;
        color: #0d0d0d;
        line-height: 50px;

        font-weight: 600;
    }
    em {
        font-size: 14px;
        color: #0e67ff;
        float: right;
        line-height: 50px;
        font-style: normal;
        cursor: pointer;
    }
}
.bannerBox {
    width: 100%;
    // height: 520px;
    ::v-deep .el-carousel__container {
        .el-carousel__arrow {
            // display:block!important;
            height: 68px;
            width: 68px;
            background: linear-gradient(
                182deg,
                rgba(228, 231, 237, 0.36) 0%,
                rgba(252, 253, 254, 0.49) 100%
            );
            box-shadow: 0px 12px 24px 14px rgba(31, 38, 50, 0.07);
            font-size: 32px;
            text-align: center;
            line-height: 68px;
        }
    }
    img {
        width: 100%;
        height: 100%;
        display: block;
    }
}
.coreServices {
    width: 100%;
    overflow: hidden;
    background: rgba(247, 247, 247, 1);
    padding-bottom: 45px;
}
.new {
    background: #fff;
    padding-bottom: 0;
}
.zxcj {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .img {
        width: 22px;
        margin-right: 10px;
    }
    ::v-deep .el-carousel {
        flex: 1;
        margin-left: 40px;
        .el-carousel__arrow {
            display: none !important;
        }
        .el-carousel__item {
            display: flex;
            align-items: center;
        }
        .is-active {
            color: #007ff7 !important;
        }
    }
}
.foreignTrade {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    .tapBox_title {
        width: 1200px;
        height: 64px;
        border-radius: 16px;
        line-height: 64px;
        box-sizing: border-box;
        display: flex;
        margin: 0 auto;
        li {
            flex: 1;
            height: 100%;
            text-align: center;
            span {
                font-size: 18px;
                font-family: 'Microsoft YaHei';
                font-weight: 600;
                color: rgba(13, 13, 13, 1);
                padding: 13px 48px;
                box-sizing: border-box;
                cursor: pointer;
            }
            .spanActive {
                border-bottom: 2px solid rgba(0, 127, 239, 1);
            }
        }
    }
    .foreignTrade_inner {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: url('../../static/images/revision_1.png') no-repeat;
        background-size: 100% 100%;

        .tapBox {
            width: 100%;
            .tapBox_container {
                margin-top: 27px;
                width: 1200px;
                margin: 0 auto;
                height: 520px;
                position: relative;
                .tapBox_container_left {
                    width: 1200px;
                    // height: 434px;
                    padding: 75px 35px 40px;
                    box-sizing: border-box;
                    display: flex;
                    .tapBox_container_leftBox {
                        width: 167px;
                        li {
                            margin-top: 25px;
                            p {
                                font-size: 16px;
                                font-family: 'Microsoft YaHei';
                                font-weight: normal;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            div {
                                font-size: 14px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                                margin-top: 8px;
                                span {
                                    font-size: 24px;
                                    font-family: 'Microsoft YaHei';
                                    font-weight: 500;
                                    color: rgba(255, 255, 255, 1);
                                    margin-right: 6px;
                                }
                            }
                        }
                    }
                    .tapBox_container_echartsBox {
                        width: 800px;
                        height: 100%;
                        .map-view {
                            width: 800px;
                            height: 400px;
                        }
                    }
                }
                .tapBox_container_right {
                    position: absolute;
                    top: 95px;
                    right: 35px;
                    .right_data {
                        h4 {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            img {
                                width: 40px;
                                height: 35px;
                                margin-right: 20px;
                            }
                            span {
                                font-size: 20px;
                                font-family: 'Microsoft YaHei';
                                font-weight: 500;
                                color: rgba(255, 255, 255, 1);
                            }
                        }
                        ul {
                            margin-top: 20px;
                            padding-left: 68px;
                            box-sizing: border-box;
                            width: 100%;
                            li {
                                width: 100%;
                                margin-bottom: 20px;
                                p {
                                    font-size: 14px;
                                    font-family: 'Microsoft YaHei';
                                    font-weight: normal;
                                    color: rgba(255, 255, 255, 0.8);
                                }
                                div {
                                    margin-top: 10px;
                                    font-size: 1px;
                                    font-weight: 400;
                                    color: rgba(255, 255, 255, 1);
                                    line-height: 22px;
                                    span {
                                        font-size: 28px;
                                        font-weight: 500;
                                        color: rgba(255, 255, 255, 1);
                                        line-height: 22px;
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.distribution {
    width: 100%;
    //height: 825px;
    box-sizing: border-box;
    background: url('../../static/images/revision_3.png') no-repeat;
    background-size: 100% 100%;
    padding-bottom: 50px;
    box-sizing: border-box;
    .container {
        display: flex;
        justify-content: space-between;
        transition: all linear 1s;
        .container_left {
            width: 270px;
            // height: 460px;
            .left_item {
                display: flex;
                flex-direction: column;
                align-items: center;
                .left_tit {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    //justify-content: center;
                    padding: 40px 0px 41px 30px;
                    box-sizing: border-box;
                    background: url('../../static/images/fxsc_bg.png');
                    background-size: 100% 100%;
                    cursor: pointer;
                    .tit_icon {
                        width: 40px;
                        height: 40px;
                        margin-right: 15px;
                    }
                    span {
                        font-size: 20px;
                        font-weight: 600;
                        color: #000000;
                    }
                }
                .left_box {
                    // height: 270px;
                    .left_com_img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
        }
        .container_right {
            width: 100%;
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            li {
                width: 20%;
                padding-top: 20px;
                padding-left: 20px;
                padding-right: 20px;
                box-sizing: border-box;
                cursor: pointer;
                transition: all 0.2s linear;
                background: #ffffff;
                div {
                    .imgBox {
                        width: 100%;
                        height: 146px;
                        img {
                            width: 100%;
                            height: 100%;
                            transition: all 0.4s;
                        }
                    }
                    .p {
                        font-size: 14px;
                        font-family: 'Microsoft YaHei';
                        font-weight: 400;
                        color: #595959;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin-top: 20px;
                        line-height: 20px;
                    }
                }

                &:hover {
                    box-shadow: 0px 4px 16px 8px rgba(30, 33, 35, 0.08);
                    transform: translate3d(0, -2px, 0);
                }
            }
            li:nth-child(5n) {
                margin-right: 0px;
            }
        }
    }
}
.zcsb {
    height: 830px;
    background: url('../../static/images/revision_2.png') no-repeat;
    background-size: 100% 100%;
    .popular-policy-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 1200px;
        margin: 0 auto 60px;
        .popular-policy-item {
            padding: 25px 25px 24px 30px;
            width: 590px;
            background: rgba(255, 255, 255, 1);
            box-sizing: border-box;
            transition: all 0.2s linear;
            cursor: pointer;
            &:hover {
                // box-shadow: 0 4px 16px 8px rgb(30 33 35 / 8%);
                box-shadow: 0 4px 16px 8px rgba(30, 33, 35, 0.08);
                transform: translate3d(-5px, -5px, 0);
            }
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) &:nth-child(4) {
                margin-bottom: 16px;
            }
            &:nth-child(2),
            &:nth-child(4) {
                margin-left: 16px;
                // margin-right: 16px;
            }
            .popular-policy-title {
                font-size: 20px;
                font-weight: 600;
                color: rgba(13, 13, 13, 1);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
            }
            .popular-policy-text {
                margin: 20px 0 16px;
                font-size: 14px;
                height: 42px;
                line-height: 1.5;
                font-weight: normal;
                color: rgba(34, 34, 34, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .issued-by-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                .issued-by {
                    flex: 1;
                    .span {
                        display: inline-block;
                        border: 1px solid rgba(217, 217, 217, 1);
                        border-radius: 2px;
                        padding: 4px 8px;
                        box-sizing: border-box;
                        margin-right: 10px;
                    }
                }
            }
            .line {
                margin-top: 20px;
                height: 1px;
                background-color: rgba(219, 219, 219, 1);
            }
            .views-wrap {
                display: flex;
                align-items: center;
                font-size: 12px;
                font-weight: normal;
                color: rgba(153, 153, 153, 1);
                margin-bottom: 44px;
                margin-top: 10px;
                .icon-eyes {
                    width: 14px;
                    height: 9px;
                    background: url('~@/static/images/icon_eyes.png');
                    background-size: cover;
                    margin-right: 6px;
                }
                .icon-like {
                    width: 10px;
                    height: 9px;
                    background: url('~@/static/images/icon_like.png');
                    background-size: cover;
                    margin-right: 6px;
                }
                .views {
                    margin-right: 34px;
                }
            }
            .popular-policy-bottom {
                display: flex;
                justify-content: space-between;
                &.detail {
                    justify-content: flex-end;
                }
                .money-wrap {
                    margin-top: -15px;
                    .money {
                        position: relative;
                        width: 100px;
                        padding-left: 89px;
                        line-height: 1.5;
                        font-size: 20px;
                        font-weight: 600;
                        color: rgba(255, 112, 13, 1);
                        &.isAuth {
                            width: initial;
                            padding: 0;
                            &::before {
                                display: none;
                            }
                            span {
                                margin-left: 10px;
                            }
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            top: 5px;
                            left: 0;
                            width: 80px;
                            height: 20px;
                            filter: blur(15px);
                            background: #ff700d;
                        }
                    }
                    .text {
                        margin-top: 20px;
                        padding-left: 25px;
                        font-size: 15px;
                        font-weight: 500;
                        color: rgba(146, 146, 146, 1);
                        background: url('~@/static/images/icon_money_one.png')
                            no-repeat 0 0;
                        background-size: 15px;
                    }
                }
                .btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 140px;
                    height: 42px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                    background: rgba(0, 127, 239, 1);
                    cursor: pointer;
                    margin-top: 9px;
                }
            }
        }
    }
    // ul {
    //   li {
    //     float: left;
    //     width: 590px;
    //     height: 240px;
    //     cursor: pointer;
    //     background: #ffffff;
    //     margin-right: 20px;
    //     margin-bottom: 20px;
    //     position: relative;
    //     transition: all 0.2s linear;

    //     &:hover {
    //       box-shadow: 0px 4px 16px 8px rgba(30, 33, 35, 0.08);
    //       // box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    //       -webkit-transform: translate3d(-5px, -5px, 0);
    //       transform: translate3d(-5px, -5px, 0);
    //       .bottom {
    //         div {
    //           color: #ffffff;
    //           font-size: 16px;
    //           font-family: "Microsoft YaHei";
    //           font-weight: 600;
    //           background: #007fef;
    //         }
    //       }
    //     }
    //     &:nth-child(2n) {
    //       margin-right: 0;
    //     }
    //     .top {
    //       height: 169px;
    //       padding: 25px 30px;
    //       box-sizing: border-box;
    //       h5 {
    //         font-size: 18px;
    //         color: #0d0d0d;
    //         overflow: hidden;
    //         text-overflow: ellipsis;
    //         white-space: nowrap;
    //         font-weight: 600;
    //       }
    //       div {
    //         font-size: 14px;
    //         color: #929292;
    //         margin: 22px 0;
    //         h6 {
    //           span {
    //             font-size: 14px;
    //             font-weight: 400;
    //             color: #929292;
    //             // margin-left: 10px;
    //           }
    //           span:last-child {
    //             span {
    //               color: #ffffff !important;
    //             }
    //           }
    //         }
    //       }
    //       p {
    //         font-size: 14px;
    //         color: #595959;
    //         line-height: 23px;
    //         display: -webkit-box;
    //         -webkit-box-orient: vertical;
    //         -webkit-line-clamp: 2;
    //         overflow: hidden;
    //       }
    //     }
    //     .bottom {
    //       height: 64px;
    //       padding: 0 30px;
    //       span {
    //         font-size: 12px;
    //         color: #929292;
    //         line-height: 64px;
    //         margin-right: 35px;
    //       }
    //       div {
    //         float: right;
    //         width: 144px;
    //         height: 40px;
    //         box-sizing: border-box;
    //         line-height: 40px;
    //         text-align: center;
    //         font-size: 16px;
    //         color: #007fef;
    //         border: 1px solid #007fef;
    //         font-weight: 600;
    //         margin-top: 12px;
    //       }
    //     }
    //     .status {
    //       position: absolute;
    //       top: 0;
    //       right: 0;
    //       width: 80px;
    //       height: 32px;
    //       background: rgba(192, 192, 192, 0.68);
    //       border-radius: 0px 16px 0px 16px;
    //       opacity: 0.68;
    //       line-height: 32px;
    //       text-align: center;
    //       font-size: 14px;
    //       color: #ffffff;
    //       &.active {
    //         background: #ffb71f;
    //       }
    //     }
    //   }
    // }
}

.hyzj {
    width: 100%;
    background: url('../../static/images/revision_5.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 40px;
}
.zc {
    padding: 60px 0 60px;
    overflow: hidden;
    background: url('../../static/images/revision_4.png') no-repeat;
    background-size: 100% 100%;
    .inners {
        width: 1200px;
        display: flex;
        margin: 0 auto;
        .left {
            padding: 20px 25px;
            width: 600px;
            height: 330px;
            background: #ffffff;
            box-sizing: border-box;
            border-right: 1px solid #f0f0f0;
            .title {
                .look_more {
                    color: #007fef;
                    letter-spacing: 1px;
                }
            }
            ul {
                li {
                    padding-top: 15px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    p {
                        flex: 0 0 430px;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        cursor: pointer;
                        &:hover {
                            color: #007fef;
                        }
                    }
                    p:last-child {
                        flex: 0 0 100px;
                        font-size: 16px;
                        font-family: 'Microsoft YaHei';
                        font-weight: 400;
                        color: #c0c0c0;
                    }
                }
            }
        }
        .right {
            width: 600px;
            padding: 20px 25px;
            box-sizing: border-box;
            height: 330px;
            background: #ffffff;
            .title {
                .look_more {
                    color: #007fef;
                    letter-spacing: 1px;
                }
            }
            .zx {
                overflow: hidden;
                li {
                    padding-top: 15px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    p {
                        flex: 0 0 430px;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 32px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        cursor: pointer;
                        &:hover {
                            color: #007fef;
                        }
                    }
                    p:last-child {
                        flex: 0 0 100px;
                        font-size: 16px;
                        font-family: 'Microsoft YaHei';
                        font-weight: 400;
                        color: #c0c0c0;
                    }
                }
            }
        }
    }
    .huodong {
        width: 1200px;
        margin: 47px auto 0;
        .title {
            .look_more {
                color: #007fef;
                letter-spacing: 1px;
            }
        }
        .hd {
            margin-top: 30px;
            display: flex;
            li {
                width: 33%;
                height: 254px;
                border-radius: 10px;
                margin-right: 20px;
                cursor: pointer;
                transition: all 0.2s linear;
                &:last-child {
                    margin-right: 0;
                }
                &:hover {
                    box-shadow: 0px 4px 16px 8px rgba(30, 33, 35, 0.08);
                    transform: translate3d(2px, -5px, 0);
                }
            }
        }
    }
}
.cshl {
    width: 100%;
    background: url('../../static/images/cshlbgIimg.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 40px;
    .hl {
        width: 1200px;
        margin: 20px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
            position: relative;
            width: 23%;
            height: 200px;
            border-radius: 10px;
            margin-right: 20px;
            cursor: pointer;
            transition: all 0.2s linear;
            &:last-child {
                margin-right: 0;
            }
            &:hover {
                box-shadow: 0px 4px 16px 8px rgba(30, 33, 35, 0.08);
                transform: translate3d(2px, -5px, 0);
            }
            .content {
                position: absolute;
                top: 44px;
                left: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.3);
                padding: 10px;
                color: #fff;
                font-weight: normal;
                h6 {
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                span {
                    font-size: 14px;
                }
            }
        }
    }
}
::v-deep .mapBox::after {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    top: 30px;
    left: -10px;
    border-top: 10px solid transparent;
    border-right: 10px solid #f1f8ff;
    border-bottom: 10px solid transparent;
}
::v-deep .mapSpan {
    font-size: 12px;
    font-family: 'Microsoft YaHei';
    font-weight: 400;
    color: #595959;
    line-height: 17px;
    display: inline-block;
    width: 55px;
    text-shadow: 0px 8px 16px rgba(30, 33, 35, 0.08);
}
::v-deep .mapName {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    font-weight: 500;
    color: #0d0d0d;
    line-height: 22px;
    text-shadow: 0px 8px 16px rgba(30, 33, 35, 0.08);
}
</style>
