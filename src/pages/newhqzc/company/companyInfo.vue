<template>
  <div class="companyInfo">
    <v-head @search="delSearch" ref="currentIndex"></v-head>
    <!--公司信息-->
    <div class="companyInfo_detail">
      <div class="detail_warp">
        <div class="detail_warp_left">
          <h3>
            <div class="h3_div">
              {{ companyInfo.entName }}
              <div class="wrl" v-if="authStatus == 1" @click="dleRl">
                <img src="../../../static/images/new_wrl.png" alt="" />
                <span>未认领</span>
              </div>
              <div class="rlz" v-else-if="authStatus == 2">
                <img src="../../../static/images/new_rlz.png" alt="" />
                <span>认领中</span>
              </div>
              <div class="yrl" v-else>
                <img src="../../../static/images/new_yrl.png" alt="" />
                <span>已认领</span>
              </div>
            </div>
          </h3>
          <ul>
            <li>
              <span>法人：</span>
              <p>{{ companyInfo.frName || "--" }}</p>
            </li>
            <li>
              <span>电话：</span>
              <p>{{ companyInfo.phoneNumber || "--" }}</p>
            </li>
            <li>
              <span>邮箱：</span>
              <p>{{ companyInfo.email || "--" }}</p>
            </li>
            <li>
              <span>官网：</span>
              <p>{{ companyInfo.website || "--" }}</p>
            </li>
            <li>
              <span>地址：</span>
              <p>{{ companyInfo.dom || "--" }}</p>
            </li>
          </ul>
        </div>
        <div class="detail_warp_right">
          <ul class="score">
            <li>
              <span>{{ totoleScore }}</span
              >分
            </li>
            <li>综合竞争力</li>
          </ul>
          <div id="radar" class="radar"></div>
        </div>
      </div>
      <div class="detail_info">
        <ul class="detail_info_box" v-if="!infoShow">
          <li>
            <div class="detail_info_left">
              <span>经营状态：</span>
              <p>{{ companyInfo.entStatus || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>法定代表人：</span>
              <p>{{ companyInfo.frName || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_left">
              <span>统一社会信用代码：</span>
              <p>{{ companyInfo.creditCode || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>成立日期：</span>
              <p>{{ companyInfo.esDate || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_left">
              <span>注册号：</span>
              <p>{{ companyInfo.regNo || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>所属行业：</span>
              <p>{{ companyInfo.industryPhyName || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_left">
              <span>核准日期：</span>
              <p>{{ companyInfo.approvedTime || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>组织机构代码：</span>
              <p>{{ companyInfo.orgCodes || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_left">
              <span>所属地区：</span>
              <p>{{ companyInfo.regOrgProvince || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>登记机关：</span>
              <p>{{ companyInfo.regOrg || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_left">
              <span>企业（机构）类型：</span>
              <p>{{ companyInfo.entType || "--" }}</p>
            </div>
            <div class="detail_info_right">
              <span>营业期限：</span>
              <p>
                {{ companyInfo.opFrom || "--" }}至
                {{ companyInfo.opTo || "--" }}
              </p>
            </div>
          </li>
          <li>
            <div class="detail_info_last">
              <span>曾用名：</span>
              <p>{{ companyInfo.oldName || "--" }}</p>
            </div>
          </li>
          <li>
            <div class="detail_info_last">
              <span>经营范围：</span>
              <div>
                <p>{{ companyInfo.opScope || "--" }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="folding">
          <div v-if="infoShow" @click="delShow">
            <img src="../../../static/images/new_zk.png" alt="" />
            <span>点击展开</span>
          </div>
          <div v-else @click="delShow">
            <img src="../../../static/images/new_zk1.png" alt="" />
            <span>点击收起</span>
          </div>
        </div>
      </div>
    </div>
    <!--政策推荐-->
    <div class="policy">
      <div class="policy_title">
        <h5>政策推荐</h5>
        <!--政策筛选条件-->
        <div class="policyBox" v-if="matchingState">
          <div class="policyBox_header">
            <h3>
              共查询到<span class="h3_num">{{ total }}</span
              >项政策
            </h3>
            <span class="right_matching" @click="delMatching">{{
              matchingText
            }}</span>
          </div>
          <ul class="policyBox_tap" :class="{ minHight: tapShow }">
            <li class="policyBox_tap_li">
              <span>政策类别：</span>
              <ul>
                <li
                  v-for="(item, index) in tapList1"
                  :key="index"
                  :class="{ liActive: policyCategory == item.value }"
                  @click="delTap1(item.value)"
                >
                  {{ item.title }}
                </li>
              </ul>
              <div class="right_marke" @click="deltapShow()">
                <span>{{ tapText }}</span>
                <img
                  src="../../../static/images/new_zk.png"
                  alt=""
                  v-if="tapShow"
                />
                <img src="../../../static/images/new_zk1.png" alt="" v-else />
              </div>
            </li>
            <li class="policyBox_tap_li">
              <span>政策级别：</span>
              <ul>
                <li
                  v-for="(item, index) in tapList2"
                  :key="index"
                  :class="{ liActive: policyLevel == item.value }"
                  @click="delTap2(item.value)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </li>
            <li class="policyBox_tap_li">
              <span>政策类型：</span>
              <ul>
                <li
                  v-for="(item, index) in tapList3"
                  :key="index"
                  :class="{ liActive: policyType == item.value }"
                  @click="delTap3(item.value)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </li>
            <!-- <li class="policyBox_tap_li">
              <span>政策主题：</span>
              <ul>
                <li
                  v-for="(item, index) in tapList4"
                  :key="index"
                  :class="{ liActive: policyTheme == item.value }"
                  @click="delTap4(item.value)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
      <!--政策模糊匹配-->
      <div class="policy_content1" v-if="!matchingState">
        <div class="policy_content1_width">
          <ul class="width_ul">
            <li
              class="width_ul_li"
              v-for="(item, index) in policyData"
              :key="item.id"
              :class="{ noMargin: (index + 1) % 3 == 0 }"
              v-if="index < 6"
              @click="delLook(item)"
            >
              <h5 class="li_h5">{{ item.title }}</h5>
              <p class="li_p" v-html="item.contextAbstract"></p>
              <div class="li_div">
                <span>发布单位：{{ item.createDepartment || "--" }}</span>
                <span>{{ item.issueTime | filterTime("YYYY-MM-DD") }}</span>
              </div>
              <div class="apply" v-if="item.policyCategory == 'declare'">
                <ul>
                  <li>
                    <span class="apply_money">{{ item.declarableFunds }}</span>
                    <span class="apply_unit">万元</span>
                  </li>
                  <li>
                    <img src="../../../static/images/money.png" alt="" />
                    <span class="apply_text">预计可申报资源</span>
                  </li>
                </ul>
                <p class="apply_btn" @click.stop="dleApply(item)">立即申报</p>
              </div>
              <div class="look" v-else>
                <p class="look_btn" @click.stop="delLook(item)">查看详情</p>
              </div>
            </li>
          </ul>
          <div class="btnBox">
            <span @click="delMore()">获取更多推荐</span>
          </div>
        </div>
      </div>
      <!--政策精准匹配-->
      <div v-else>
        <div class="policy_content2" v-if="policyData.length > 0">
          <div class="policy_content2_width">
            <ul class="matching_box">
              <li
                class="matching_box_li"
                v-for="item in policyData"
                :key="item.id"
                @click="delLook(item)"
              >
                <div class="matching_box_li_header">
                  {{ item.title }}
                </div>
                <div class="matching_box_theme">
                  政策主题：{{ item.policyThemes || "--" }}
                </div>
                <ul class="header_last">
                  <li>
                    <img src="../../../static/images/icon_time.png" alt="" />
                    <span
                      >发布时间：{{
                        item.issueTime | filterTime("YYYY-MM-DD")
                      }}</span
                    >
                  </li>
                  <li>
                    <img
                      src="../../../static/images/icon_Paper_plane.png"
                      alt=""
                    />
                    <span>发布单位：</span>
                    <p>{{ item.createDepartment || "--" }}</p>
                  </li>
                </ul>
                <div class="matching_box_num">
                  <div class="matching_box_num1">
                    匹配项：<span
                      ><span class="num1_span">{{
                        item.policyMatchCount || 0
                      }}</span
                      >项</span
                    >
                  </div>
                  <div class="matching_box_num2">
                    <span>匹配度：</span>
                    <el-rate
                      :value="item.score"
                      disabled
                      disabled-void-color="rgba(14, 103, 255, 0.2)"
                      :colors="colors"
                    >
                    </el-rate>
                  </div>
                </div>
                <div class="matching_box_content">
                  <div class="content_left" v-html="item.contextAbstract"></div>
                  <div
                    class="content_money"
                    v-if="item.policyCategory == 'declare'"
                  >
                    <ul class="content_money_ul">
                      <li>
                        <span class="apply_money">{{
                          item.declarableFunds
                        }}</span>
                        <span class="apply_unit">万元</span>
                      </li>
                      <li>
                        <img src="../../../static/images/money.png" alt="" />
                        <span class="apply_text">预计可申报资源</span>
                      </li>
                    </ul>
                    <p class="apply_btn" @click.stop="dleApply(item)">
                      立即申报
                    </p>
                  </div>
                  <div class="look" v-else>
                    <p class="look_btn" @click.stop="delLook(item)">查看详情</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="pagBox">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total,  prev, pager, next"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="noData" v-else>
          <img src="../../../static/images/empty.png" alt="" />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
    <!-- 申报流程 -->
    <declaration-process></declaration-process>
  </div>
</template>

<script>
import auth from "../mixin/auth";
import {
  getAuthStatus,
  searchCompany,
  basicQuery,
  dictList,
  entScoreQuery,
  queryByCompanyNew,
  getCorporateInfo,
  getSupplierAuthInfo,
  getDeclare,
  getAuthCompany,
  getPopularPolicy,
  updateMatchNum
} from "@/api/hqzc";
import { notLoggedIn, notCertified } from "@/common/authorization";
import { to } from "@/common/util";
import vHead from "../components/header.vue";
import declarationProcess from "../components/declarationProcess.vue";
export default {
  mixins: [auth],
  components: {
    vHead,
    declarationProcess,
  },
  data() {
    return {
      colors: ["#FF6700", "#FF6700", "#FF6700"],
      tapList1: [
        {
          title: "全部",
          value: "",
        },
      ],
      tapList2: [
        {
          title: "全部",
          value: "",
        },
      ],
      tapList3: [
        {
          title: "全部",
          value: "",
        },
      ],
      tapList4: [
        {
          title: "全部",
          value: "",
        },
      ],
      tapVal1: "",
      tapVal2: "",
      tapVal3: "",
      tapVal4: "",
      policyCategory: "", //政策类别
      policyLevel: "", // 政策级别
      policyType: "", // 政策类型
      policyTheme: "", // 政策主题
      policyData: [], // 政策列表
      tapText: "展开更多",
      // companyList:[],
      infoShow: true,
      tapShow: true,
      pageSize: 6,
      currentPage: 1,
      total: 0,
      companyName1: "",
      companyInfo: "",
      totoleScore: 0, //总分
      matchingState: false, //是否补全信息
      matchingText: "更新推荐政策",
      authcompanyName: "", //本人已认证的公司
      authStatus: "", //认领状态
      isNo: false,
    };
  },
  watch: {
    "$route.query": {
      handler(val) {
        this.companyName1 = val.companyName;
        this.getList(); //公司列表
        this.getState(); //认证公司
      },
    },
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
    this.dictList("policy_category"); //政策类别
    this.dictList("policy_level"); // 获取政策级别
    this.dictList("policy_type"); // 获取政策类型
    this.dictList("policy_theme"); // 获取政策主题
    this.getList(); //公司列表
    this.getState(); //认证公司
  },
  methods: {
    //工商信息显示和隐藏
    delShow() {
      this.infoShow = !this.infoShow;
    },
    //tap切显示和隐藏
    deltapShow() {
      if (this.tapShow) {
        this.tapText = "点击收起";
      } else {
        this.tapText = "展开更多";
      }
      this.tapShow = !this.tapShow;
    },
    delTap1(val) {
      this.policyCategory = val;
      this.currentPage = 1;
      this.getPolicyList();
    },
    delTap2(val) {
      this.policyLevel = val;
      this.currentPage = 1;
      this.getPolicyList();
    },
    delTap3(val) {
      this.policyType = val;
      this.currentPage = 1;
      this.getPolicyList();
    },
    delTap4(val) {
      this.policyTheme = val;
      this.currentPage = 1;
      this.getPolicyList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getPolicyList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPolicyList();
    },
    getRadar(arr, val) {
      setTimeout(() => {
        var myChart = this.$echarts.init(document.getElementById("radar"));
        var option = {
          backgroundColor: "#FFF",
          tooltip: {
            show: false,
          },
          radar: {
            shape: "polygon",
            radius: 65,
            center: ["50%", "50%"],
            name: {
              color: "#fff",
              formatter: function(value, indicator) {
                return "{a|" + value + "：}{b|" + indicator.num + "}";
              },
              lineHeight: 15,
              rich: {
                a: {
                  color: "#333333",
                  fontSize: 12,
                  align: "center",
                },
                b: {
                  color: "#333333",
                  fontSize: 12,
                  align: "center",
                },
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#9AC5FF",
                type: "dotted",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#9AC5FF"],
                width: 1,
                type: "dotted",
              },
            },
            splitArea: {
              areaStyle: {
                color: [
                  "rgba(31,107,255,1)",
                  "rgba(31,107,255,0.8)",
                  "rgba(31,107,255,0.6)",
                  "rgba(31,107,255,0.4)",
                  "rgba(31,107,255,0.2)",
                ],
                shadowColor: "rgba(0, 100, 0, 0.3)",
              },
            },

            indicator: arr,
          },
          series: [
            {
              type: "radar",
              data: [
                {
                  value: val,
                  name: "DATA",
                  itemStyle: {
                    normal: {
                      color: "transparent",
                    },
                  },
                  areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        { offset: 1, color: "rgba(31,107,255,1)" },
                        { offset: 0, color: "rgba(130,175,255,1)" },
                      ]
                    ),
                  },
                },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }, 1);
    },

    //立即申报
    dleApply(item) {
      const loginIn = () => {
        const certified = () => {
          getDeclare({ policyId: item.id })
            .then((res) => {
              if (res.data.success) {
                this.$message.error("您已申请过该政策，看看别的吧！");
              } else {
                this.$router.push({
                  path: "/cydn/declareImmediately",
                  query: {
                    id: item.id,
                    title: item.title,
                  },
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        };
        this.isAuth ? certified() : notCertified.call(this);
      };
      this.isLogin ? loginIn() : notLoggedIn.call(this);
    },
    //查看详情
    delLook(item) {
      const { href } = this.$router.resolve({
        path: "/cydn/policyDetails",
        query: {
          id: item.id,
        },
      });
      window.open(href, "_blank");
    },
    //点击认领
    dleRl() {
      const loginIn = () => {
        const certified = () => {};
        const notRz = () => {
          this.$alert("未认证企业，请先进行企业认证", "认证提示", {
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonText: "确认",
            center: true,
            customClass: "alert",
            iconClass: "alert-icon",
            showClose: false,
          })
            .then((res) =>
              this.$router.push({
                path: "/cydn/bmc/enterpriseAuth",
                query: {
                  companyName: this.companyName1,
                },
              })
            )
            .catch((err) => false);
        };

        this.isAuth ? certified() : notRz();
      };
      this.isLogin ? loginIn() : notLoggedIn.call(this);
    },
    //获取更多推荐
    delMore() {
      const loginIn = () => {
        const certified = () => {
          if (this.authcompanyName != this.companyName1) {
            var message =
              "您当前是" +
              this.authcompanyName +
              "不能对" +
              this.companyName1 +
              "进行信息补足，请登录" +
              this.companyName1 +
              "账号进行相关操作!";
            this.$alert(message, "提示", {
              confirmButtonText: "确定",
              center: true,
              customClass: "alert",
              iconClass: "alert-icon",
              showClose: false,
            });
          } else {
            if (!this.matchingState) {
              this.delMatching();
            }
          }
        };
        this.isAuth ? certified() : notCertified.call(this);
      };
      this.isLogin ? loginIn() : notLoggedIn.call(this);
    },
    //点击更新匹配信息
    delMatching() {
      this.$router.push({
        path: "/cydn/matching",
        query: {
          companyName: this.companyName1,
        },
      });
    },
    //获取认证信息
    getState() {
      getSupplierAuthInfo().then((res) => {
        if (res.data.retData) {
          this.authcompanyName = res.data.retData.companyName;
          if (
            this.isLogin &&
            this.isAuth &&
            this.authcompanyName == this.companyName1
          ) {
            this.getCorporateInfo();
          } else {
            this.matchingState = false;
          }
        }
      });
    },

    //判断用户是否有过补全记录接口
    getCorporateInfo() {
      getCorporateInfo().then((res) => {
        this.matchingState = res.data.success;
        if (res.data.success) {
          this.pageSize = 5;
        } else {
          this.pageSize = 6;
        }
      });
    },

    //获取政策列表
    getPolicyList() {
      const data = {
        companyName: this.companyName1,
        regOrgProvince: this.companyInfo.regOrgProvince || "",
        city: this.companyInfo.city || "",
        county: this.companyInfo.county || "",
        accurate: this.accurate || "",
        page: this.currentPage, // 页码
        rows: this.pageSize, // 每页数据量
        policyCategory: this.policyCategory, //政策类别
        policyLevel: this.policyLevel, // 政策级别
        policyType: this.policyType, // 政策类型
        policyTheme: this.policyTheme, // 政策主题
        query: "", // 关键字
      };
      queryByCompanyNew(data)
        .then((res) => {
          if (res.status === 200) {
            const { queryPolicyListRes, count, source } = res.data.retData;
            if (this.currentPage === 1 && queryPolicyListRes.length) {
              this.maxScore = queryPolicyListRes[0].maxScore;
            }
            this.total = count - 0;
            this.accurate = source;
            if (queryPolicyListRes.length > 0) {
              queryPolicyListRes.forEach((item) => {
                item.score =
                  item.score == 0.1
                    ? item.score * 5
                    : (item.score / this.maxScore) * 0.8 * 5;
              });
              this.policyData = queryPolicyListRes;
            } else {
              this.getPopularPolicy();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //热门政策
    getPopularPolicy() {
      getPopularPolicy().then((res) => {
        this.policyData = res.data.retData;
      });
    },
    //获取字典表
    dictList(type) {
      dictList({ dictType: type }).then((res) => {
        if (type == "policy_category") {
          this.tapList1 = this.tapList1.concat(res.data);
        } else if (type == "policy_level") {
          this.tapList2 = this.tapList2.concat(res.data);
        } else if (type == "policy_type") {
          this.tapList3 = this.tapList3.concat(res.data);
        } else if (type == "policy_theme") {
          this.tapList4 = this.tapList4.concat(res.data);
        }
      });
    },
    //获取公司信息
    basicQuery() {
      basicQuery({ companyName: this.companyName1 }).then((res) => {
        this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        }).close();
        if (res.data.success) {
          this.companyInfo = res.data.retData || {};
          this.getPolicyList(); //获取政策列表
          this.entScoreQuery(); //获分数
          this.getAuthStatus(res.data.retData.creditCode);
          updateMatchNum();
        }
      });
    },
    //获取公司信息2
    getAuthCompany() {
      getAuthCompany({ companyName: this.companyName1 }).then((res) => {
        this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        }).close();
        if (JSON.stringify(res.data.retData) != "{}") {
          this.companyInfo = res.data.retData || {};
          this.getPolicyList(); //获取政策列表
          this.entScoreQuery(); //获分数
          this.getAuthStatus(res.data.retData.creditCode);
        } else {
          this.toPath("/cydn/searchList", "companyName", this.companyName1);
        }
      });
    },
    //确认该公司是否已认领
    getAuthStatus(creditCode) {
      getAuthStatus({ creditCode: creditCode }).then((res) => {
        this.authStatus = res.data.retData;
      });
    },
    //运营能力解析图分数
    entScoreQuery() {
      var val = [];
      var name = [];
      var arr = [];
      entScoreQuery({
        companyName: this.companyName1, //京东方科技集团股份有限公司
      }).then((res) => {
        if (res.data.success) {
          this.totoleScore = res.data.retData.powerScore;
          val.push(Number(res.data.retData.resdevScore));
          val.push(Number(res.data.retData.prdcScore));
          val.push(Number(res.data.retData.sellScore));
          val.push(Number(res.data.retData.matflwScore));
          val.push(Number(res.data.retData.servScore));
          val.push(Number(res.data.retData.mnagScore));
          name.push(res.data.retData.resdevScoreName);
          name.push(res.data.retData.prdcScoreName);
          name.push(res.data.retData.sellScoreName);
          name.push(res.data.retData.matflwScoreName);
          name.push(res.data.retData.servScoreName);
          name.push(res.data.retData.mnagScoreName);
          for (var i = 0; i < name.length; i++) {
            var obj = {};
            obj.name = name[i];
            obj.max = 100;
            obj.num = val[i];
            arr.push(obj);
          }
        } else {
          this.totoleScore = 0;
          arr = [
            { name: "研发", max: 100, num: 0 },
            { name: "生产", max: 100, num: 0 },
            { name: "销售", max: 100, num: 0 },
            { name: "供应链", max: 100, num: 0 },
            { name: "服务", max: 100, num: 0 },
            { name: "管理", max: 100, num: 0 },
          ];
          val = [0, 0, 0, 0, 0, 0];
        }
        this.getRadar(arr, val);
      });
    },
    //跳转
    toPath(path, key = "companyName", value) {
      this.$router.push({
        path,
        query: {
          [key]: value || this.companyName1,
        },
      });
    },
    //搜索
    delSearch(value) {
      this.companyName1 = value;
      this.getState();
      this.getList(); //公司列表
    },
    //获取公司列表
    getList() {
      searchCompany({ companyName: this.companyName1, PageNo: 1 })
        .then((res) => {
          if (res.data.success) {
            var arr = res.data.retData;
            let flag = arr.find((item) => item.entName === this.companyName1);
            if (flag) {
              if (arr[0].scoreMark == 1) {
                this.basicQuery();
              } else {
                this.toPath(
                  "/cydn/searchList",
                  "companyName",
                  this.companyName1
                );
              }
            } else {
              //this.toPath("/cydn/searchList", "companyName",this.companyName1);
              this.getAuthCompany();
            }
          } else {
            this.toPath("/cydn/searchList", "companyName", this.companyName1);
          }
        })
        .catch((res) => {
          console.log(res, "err");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.companyInfo {
  width: 100%;
  background: #f6f8fe;
  .companyInfo_detail {
    width: 1200px;
    margin: 0 auto;
    .detail_warp {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 30px 25px 25px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid rgba(238, 238, 238, 1);
      border-bottom: none;
      .detail_warp_left {
        width: 60%;
        h3 {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .h3_div {
            line-height: 42px;
            font-size: 30px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            margin-right: 5px;
            position: relative;
            div {
              position: absolute;
              top: 10px;
              right: -85px;
              height: 24px;
              line-height: 24px;
              padding: 0px 5px;
              border-radius: 2px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              img {
                width: 16px;
                height: 16px;
              }
            }
          }

          .wrl {
            background: rgba(15, 114, 255, 0.08);
            cursor: pointer;
            span {
              font-size: 16px;
              font-weight: 600;
              color: rgba(4, 123, 243, 0.31);
              margin-left: 5px;
            }
          }
          .rlz {
            background: rgba(15, 114, 255, 0.08);
            span {
              font-size: 16px;
              font-weight: 600;
              color: rgba(4, 123, 243, 1);
              margin-left: 5px;
            }
          }
          .yrl {
            background: rgba(255, 112, 13, 0.08);
            span {
              font-size: 16px;
              font-weight: 600;
              color: rgba(255, 112, 13, 1);
              margin-left: 5px;
            }
          }
        }
        ul {
          width: 100%;
          padding-top: 5px;
          box-sizing: border-box;
          li {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            font-size: 16px;
            font-weight: normal;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
            margin-top: 8px;
            span {
              //width: 50px;
            }
            p {
              flex: 1;
            }
          }
        }
      }
      .detail_warp_right {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .score {
          margin-right: 30px;
          li {
            &:first-child {
              display: flex;
              align-items: center;
              font-size: 20px;
              font-weight: 600;
              color: rgba(10, 122, 255, 1);
              span {
                font-size: 30px;
                margin-right: 5px;
              }
            }
            &:last-child {
              font-size: 14px;
              color: rgba(51, 51, 51, 1);
              line-height: 20px;
              text-align: center;
            }
          }
        }
        .radar {
          width: 250px;
          height: 190px;
        }
      }
    }
    .detail_info {
      padding: 10px 25px 0px;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      border: 1px solid rgba(238, 238, 238, 1);
      border-bottom: none;
      ul {
        padding-bottom: 20px;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        li {
          width: 100%;
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          div {
            display: flex;
            flex-wrap: wrap;
            line-height: 22px;
            span {
              font-size: 16px;
              font-weight: normal;
              color: rgba(102, 102, 102, 1);
              letter-spacing: 0px;
            }
            p {
              flex: 1;
              font-size: 16px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
            }
          }
          .detail_info_left {
            width: 60%;
            span {
              width: 145px;
            }
          }
          .detail_info_right {
            width: 40%;
            span {
              width: 115px;
            }
          }
          .detail_info_last {
            width: 100%;
            span {
              width: 145px;
            }
            div {
              flex: 1;
              overflow: auto;
              height: 90px;
              line-height: 24px;
              p {
                width: 100%;
              }
            }
          }
        }
      }
      .folding {
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
          span {
            line-height: 22px;
            font-size: 16px;
            color: #adadad;
          }
        }
      }
    }
  }
  .policy {
    width: 100%;
    .policy_title {
      width: 1200px;
      margin: 0 auto;
      padding-top: 40px;
      box-sizing: border-box;
      min-height: 200px;
      h5 {
        font-size: 36px;
        font-weight: 600;
        color: rgba(29, 29, 31, 1);
      }
      .policyBox {
        width: 100%;
        margin-top: 25px;
        background: #ffffff;
        .policyBox_header {
          width: 100%;
          height: 55px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f7faff;
          padding: 0px 25px;
          box-sizing: border-box;
          h3 {
            font-size: 16px;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            .h3_num {
              color: #ff9f0a;
              margin: 0px 5px;
            }
          }
          .right_matching {
            width: 144px;
            line-height: 36px;
            border: 1px solid rgba(14, 103, 255, 1);
            font-size: 16px;
            color: rgba(14, 103, 255, 1);
            text-align: center;
            cursor: pointer;
            letter-spacing: 1px;
          }
        }
        .policyBox_tap {
          width: 100%;
          padding: 0px 25px 15px;
          box-sizing: border-box;
          overflow: hidden;
          &.minHight {
            height: 57px !important;
          }
          .policyBox_tap_li {
            width: 100%;
            margin-top: 15px;
            display: flex;
            flex-wrap: wrap;
            //align-items: center;
            span {
              width: 95px;
              line-height: 28px !important;
            }
            ul {
              flex: 1;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              li {
                line-height: 28px;
                padding: 0px 15px;
                box-sizing: border-box;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.6);
                margin-bottom: 4px;
                margin-right: 4px;
                cursor: pointer;
              }
              .liActive {
                background: rgba(14, 103, 255, 1) !important;
                color: rgba(255, 255, 255, 1) !important;
              }
            }
            .right_marke {
              display: flex;
              align-items: center;
              cursor: pointer;
              span {
                font-size: 16px;
                color: #afafaf;
              }
              img {
                width: 24px;
                height: 24px;
                margin-left: 7px;
              }
            }
          }
        }
      }
    }
    .policy_content1 {
      width: 100%;
      //max-height: 695px;
      background: url("../../../static/images/info_bg1.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      padding-top: 5px;
      box-sizing: border-box;
      .policy_content1_width {
        width: 1200px;
        margin: 0 auto;
        margin-top: -83px;
        .width_ul {
          width: 100%;
          &::after {
            content: "";
            display: block;
            clear: both;
          }
          .width_ul_li {
            float: left;
            width: 390px;
            height: 300px;
            padding: 40px 25px 20px;
            box-sizing: border-box;
            background: #ffffff;
            margin-right: 15px;
            margin-bottom: 15px;
            &.noMargin {
              margin-right: 0px !important;
            }
            .li_h5 {
              font-size: 22px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.8);
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .li_p {
              height: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              font-size: 14px;
              color: rgba(34, 34, 34, 1);
              margin-top: 20px;
              line-height: 20px;
            }
            .li_div {
              padding: 30px 0px 15px;
              box-sizing: border-box;
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid rgba(219, 219, 219, 1);
            }
            .apply {
              margin-top: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              ul {
                li {
                  display: flex;
                  align-items: center;
                  .apply_money {
                    line-height: 45px;
                    font-size: 32px;
                    font-weight: 600;
                    color: rgba(255, 112, 13, 1);
                  }
                  .apply_unit {
                    line-height: 33px;
                    font-size: 20px;
                    font-weight: 600;
                    color: rgba(255, 112, 13, 1);
                    margin-left: 5px;
                  }
                  img {
                    width: 15px;
                    height: 15px;
                  }
                  .apply_text {
                    line-height: 21px;
                    font-size: 15px;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 1);
                    margin-left: 10px;
                  }
                }
              }
              .apply_btn {
                width: 88px;
                line-height: 38px;
                border: 1px solid rgba(14, 103, 255, 1);
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                color: rgba(14, 103, 255, 1);
                cursor: pointer;
                letter-spacing: 1px;
              }
            }
            .look {
              padding: 25px 0px 10px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              box-sizing: border-box;
              .look_btn {
                width: 88px;
                line-height: 38px;
                border: 1px solid rgba(14, 103, 255, 1);
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                color: rgba(14, 103, 255, 1);
                cursor: pointer;
                letter-spacing: 1px;
              }
            }
            &:hover {
              box-shadow: 0 0 12px 0 rgba(0, 70, 131, 0.2);
              .look {
                .look_btn {
                  background: rgba(14, 103, 255, 1);
                  color: #fff;
                }
              }
              .apply {
                .apply_btn {
                  background: rgba(14, 103, 255, 1);
                  color: #fff;
                }
              }
            }
          }
        }
        .btnBox {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 40px;
          padding-bottom: 40px;
          box-sizing: border-box;
          span {
            width: 434px;
            height: 62px;
            background: rgba(14, 103, 255, 1);
            box-shadow: 0 6px 6px 0 rgba(31, 113, 255, 0.29);
            text-align: center;
            line-height: 62px;
            font-size: 24px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            cursor: pointer;
          }
        }
      }
    }
    .policy_content2 {
      width: 100%;
      //height: 695px;
      background: url("../../../static/images/info_bg2.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      margin-top: 50px;
      padding-top: 5px;
      padding-bottom: 50px;
      box-sizing: border-box;
      .policy_content2_width {
        width: 1200px;
        margin: 0 auto;
        margin-top: -35px;
        .matching_box {
          width: 100%;
          .matching_box_li {
            width: 100%;
            background: #ffffff;
            padding: 30px 25px 40px;
            box-sizing: border-box;
            margin-bottom: 15px;
            &:hover {
              box-shadow: 0 0 12px 0 rgba(0, 70, 131, 0.2);
            }
            .matching_box_li_header {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 28px;
              font-weight: 600;
              color: rgba(0, 0, 0, 1);
              line-height: 42px;
            }
            .matching_box_theme {
              font-size: 16px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.6);
              margin-top: 6px;
            }
            .header_last {
              display: flex;
              align-items: center;
              margin: 10px 0 14px;
              li {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 5px;
                }
                p {
                  max-width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &:last-child {
                  margin-left: 30px;
                }
              }
            }
            .matching_box_num {
              display: flex;
              align-items: center;
              .matching_box_num1 {
                font-size: 16px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                margin-right: 60px;
                display: flex;
                align-items: center;
                span {
                  color: #ff700d;
                  display: flex;
                  align-items: center;
                  .num1_span {
                    font-size: 24px;
                    margin-right: 7px;
                  }
                }
              }
              .matching_box_num2 {
                font-size: 16px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                display: flex;
                align-items: center;
                ::v-deep .el-rate {
                  height: 30px;
                }
                ::v-deep .el-rate__icon {
                  font-size: 30px;
                  margin-right: 5px;
                }
              }
            }
            .matching_box_content {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              justify-content: space-between;
              margin-top: 10px;
              .content_left {
                width: 65%;
                height: 93px;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.7);
                line-height: 31px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
              .content_money {
                display: flex;
                align-items: center;
                .content_money_ul {
                  li {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .apply_money {
                      font-size: 32px;
                      font-weight: 600;
                      color: rgba(255, 112, 13, 0.99);
                      line-height: 45px;
                    }
                    .apply_unit {
                      font-size: 20px;
                      font-weight: 600;
                      color: rgba(255, 112, 13, 1);
                      margin-left: 5px;
                      line-height: 45px;
                    }
                    .apply_text {
                      font-size: 15px;
                      font-weight: 600;
                      color: rgba(0, 0, 0, 1);
                      line-height: 21px;
                      margin-left: 10px;
                    }
                    img {
                      width: 15px;
                      height: 15px;
                    }
                  }
                }
                .apply_btn {
                  width: 109px;
                  line-height: 42px;
                  background: rgba(14, 103, 255, 1);
                  text-align: center;
                  font-size: 18px;
                  color: rgba(255, 255, 255, 1);
                  margin-left: 50px;
                  cursor: pointer;
                  letter-spacing: 1px;
                }
              }
              .look {
                .look_btn {
                  width: 109px;
                  line-height: 42px;
                  background: rgba(14, 103, 255, 1);
                  text-align: center;
                  font-size: 18px;
                  color: rgba(255, 255, 255, 1);
                  margin-left: 50px;
                  cursor: pointer;
                  letter-spacing: 1px;
                }
              }
            }
          }
        }
        .pagBox {
          width: 100%;
          padding-top: 15px;
          box-sizing: border-box;
          text-align: right;
          ::v-deep
            .el-pagination.is-background
            .el-pager
            li:not(.disabled).active {
            background-color: #007fef;
            color: #fff;
          }
          ::v-deep .el-pagination.is-background .el-pager li {
            background-color: #f7f8fa;
          }
          ::v-deep .el-pagination.is-background .btn-next,
          ::v-deep .el-pagination.is-background .btn-prev {
            background-color: rgba(0, 0, 0, 0.03);
          }
        }
      }
    }
    .noData {
      width: 1200px;
      margin: 0 auto;
      background: #fff;
      padding: 60px 0px;
      box-sizing: border-box;
      text-align: center;
      margin-top: 15px;
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
}
</style>
