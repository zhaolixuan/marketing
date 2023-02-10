import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Cyzj from "@/pages/cyzj/index.vue";
import ResourcesHome from "@/pages/resources/resourcesHome/home.vue";
import Layout1 from "@/pages/resources/components/layout/layout1.vue";
import Layout2 from "@/pages/resources/components/layout/layout2.vue";

Vue.use(Router);

//避免跳转相同路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/cydn/home"
    },
    {
      path: "/cydn", // 只要使用home组件都要以此开头
      component: Home,
      redirect: "/cydn/home",
      children: [{
          path: "home",
          meta: {
            title: "首页"
          },
          component: () => import("@/pages/home/home.vue")
        },
        {
          path: "record",
          meta: {
            title: "首页"
          },
          component: () => import("@/pages/lssj/record.vue")
        },
        {
          path: 'application',
          meta: {
            title: '应用商店',
            m_key: '',
            test_appId: '',
            prod_appId: '',
            type: ['legal']
          },
          component: () => import("@/pages/application/index.vue"),
          redirect: "/cydn/application/home",
          children: [{
              path: "home",
              meta: {
                title: "应用商店",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/application/home.vue")
            },
            {
              path: "list",
              meta: {
                title: "应用商店",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/application/list.vue")
            },
            {
              path: "detail",
              meta: {
                title: "应用商店",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/application/detail.vue")
            },
          ]
        },
        {
          path: 'cyzj',
          meta: {
            title: '产业专家',
            m_key: '',
            test_appId: '',
            prod_appId: '',
            type: ['legal']
          },
          component: Cyzj,
          children: [{
              path: "expert",
              meta: {
                title: "产业专家",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/expert.vue")
            },
            {
              path: "warehouse",
              meta: {
                title: "专家智库",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/warehouse/index.vue")
            },
            {
              path: "particulars",
              meta: {
                title: "专家详情",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/warehouse/particulars.vue")
            },
            {
              path: "zl-list",
              meta: {
                title: "阀门资料库",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/zx_cy_list/zl_list.vue")
            },
            {
              path: "zx-list",
              meta: {
                title: "产业要问",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/zx_cy_list/zx_list.vue")
            },
            {
              path: "detali",
              meta: {
                title: "详情",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/zx_cy_list/details.vue")
            },
            {
              path: "my",
              meta: {
                title: "个人中心",
                m_key: "",
                test_appId: "",
                prod_appId: "",
                type: ["legal"]
              },
              component: () => import("@/pages/cyzj/my.vue")
            }
          ]
        },
        {
          path: "activity",
          name: "activityIndex",
          meta: {
            title: "活动首页"
          },
          component: () => import("@/pages/activity/index.vue")
        },
        {
          path: "activity/list",
          name: "activeList",
          component: () => import("@/pages/activity/list.vue")
        },
        {
          path: "activity/detail",
          name: "activityDetail",
          component: () => import("@/pages/activity/detail.vue")
        },
        // {
        //   path: "hqzc",
        //   meta: { title: "惠企政策" },
        //   component: () => import("@/pages/hqzc"),
        //   redirect: "/cydn/hqzc/home",
        //   children: [
        //     {
        //       path: "home",
        //       component: () => import("@/pages/hqzc/components/home.vue")
        //     },
        //     {
        //       path: "policyQuery",
        //       component: () => import("@/pages/hqzc/components/policyQuery.vue")
        //     },
        //     {
        //       path: "policyMatching",
        //       component: () =>
        //         import("@/pages/hqzc/components/policyMatching.vue")
        //     }
        //   ]
        // },
        // { 
        //   path: "declareImmediately",
        //   meta: { title: "立即申报" },
        //   component: () =>
        //     import("@/pages/hqzc/components/declareImmediately")
        // },
        // {
        //   path: "policyDetails",
        //   meta: { title: "政策详情" },
        //   component: () => import("@/pages/hqzc/components/policyDetails")
        // },

        {
          path: "hqzc/home",
          meta: {
            title: "惠企政策"
          },
          component: () => import("@/pages/newhqzc/home/index.vue"),
        },
        {
          path: "hqzc/policyList",
          meta: {
            title: "政策列表"
          },
          component: () => import("@/pages/newhqzc/policyList/index.vue"),
        },
        {
          path: "policyDetails",
          meta: {
            title: "政策详情"
          },
          component: () => import("@/pages/newhqzc/policyDetails/index.vue")
        },
        {
          path: "declareImmediately",
          meta: {
            title: "立即申报"
          },
          component: () =>
            import("@/pages/newhqzc/declareImmediately/index.vue")
        },
        {
          path: "companyInfo",
          meta: {
            title: "企业详情"
          },
          component: () => import("@/pages/newhqzc/company/companyInfo.vue"),
        },
        {
          path: "searchList",
          meta: {
            title: "企业搜索列表"
          },
          component: () => import("@/pages/newhqzc/company/searchList.vue"),
        },
        {
          path: "matching",
          meta: {
            title: "补足信息"
          },
          component: () => import("@/pages/newhqzc/company/matching.vue"),
        },
        {
          path: "information",
          meta: {
            title: "资讯",
            m_key: "",
            test_appId: "",
            prod_appId: "",
            type: ["legal"]
          },
          component: () => import("@/pages/information/list.vue")
        },
        {
          path: "information/detali",
          meta: {
            title: "资讯详情页",
            m_key: "",
            test_appId: "",
            prod_appId: "",
            type: ["legal"]
          },
          component: () => import("@/pages/information/details.vue")
        },
        {
          path: "resources",
          name: "resources",
          component: Layout1,
          meta: {
            title: "资源",
            menu: "home"
          },
          children: [{
              path: "tradeSituation",
              name: "tradeSituation",
              component: ResourcesHome,
              meta: {
                title: "全球贸易态势分析",
                menu: "tradeSituation"
              }
            },
            {
              path: "enterpriseSearch",
              name: "enterpriseSearch",
              component: () =>
                import("@/pages/resources/enterpriseSearch/index.vue"),
              meta: {
                title: "企业搜索",
                menu: "enterpriseSearch"
              }
            }
          ]
        },
        {
          path: "enterprise",
          name: "enterprise",
          component: Layout2,
          redirect: "procurementStatistics",
          meta: {
            title: "企业搜索",
            menu: "enterprise"
          },
          children: [{
              path: "procurementStatistics",
              name: "procurementStatistics",
              component: () =>
                import(
                  "@/pages/resources/enterpriseSearch/procurementStatistics/index.vue"
                ),
              meta: {
                title: "采购内容统计",
                menu: "procurementStatistics"
              }
            },
            {
              path: "procurementAnalysis",
              name: "procurementAnalysis",
              component: () =>
                import(
                  "@/pages/resources/enterpriseSearch/procurementAnalysis/index.vue"
                ),
              meta: {
                title: "采购周期分析",
                menu: "procurementAnalysis"
              }
            },
            {
              path: "comprehensiveAnalysis",
              name: "comprehensiveAnalysis",
              component: () =>
                import(
                  "@/pages/resources/enterpriseSearch/comprehensiveAnalysis/index.vue"
                ),
              meta: {
                title: "综合分析",
                menu: "comprehensiveAnalysis"
              }
            },
            {
              path: "contactInformation",
              name: "contactInformation",
              component: () =>
                import(
                  "@/pages/resources/enterpriseSearch/contactInformation/index.vue"
                ),
              meta: {
                title: "企业联系方式",
                menu: "contactInformation"
              }
            }
          ]
        },
        {
          path: "userCenter",
          name: "userCenter",
          meta: {
            title: "个人中心"
          },
          component: () => import("@/pages/userCenter/index.vue"),
          redirect: "userCenter/userInfo",
          beforeEnter: (to, from, next) => {
            if (localStorage.token) {
              next();
              return;
            } else {
              // 重定向到空白页面
              next({
                path: "/login"
              });
            }
          },
          children: [{
              path: "policyDeclare",
              name: "policyDeclare",
              meta: {
                title: "我的申请"
              },
              component: () => import("@/pages/userCenter/policyDeclare.vue"),
            },
            {
              path: "policyOn",
              name: "policyOn",
              meta: {
                title: "我的政策"
              },
              component: () => import("@/pages/userCenter/policyOn.vue"),
            },
            {
              path: "policyBrowse",
              name: "policyBrowse",
              meta: {
                title: "我的浏览"
              },
              component: () => import("@/pages/userCenter/policyBrowse.vue"),
            },
            {
              path: "cyzjInfo",
              name: "cyzjInfo",
              meta: {
                title: "专家个人中心"
              },
              component: () => import("@/pages/userCenter/cyzjInfo.vue"),
            },
            {
              path: "userInfo",
              name: "userInfo",
              meta: {
                title: "主页"
              },
              component: () => import("@/pages/userCenter/userInfo.vue")
            },
            {
              path: "orderList",
              name: "orderList",
              meta: {
                title: "订单列表"
              },
              component: () => import("@/pages/userCenter/orderList.vue")
            },
            {
              path: "EnterpriseCertification",
              name: "EnterpriseCertification",
              meta: {
                title: "企业认证"
              },
              component: () =>
                import("@/pages/userCenter/EnterpriseCertification.vue")
            },
            {
              path: "editPassword",
              name: "editPassword",
              meta: {
                title: "修改密码"
              },
              component: () => import("@/pages/userCenter/editPassword.vue")
            },
            // {
            //     path: 'editUserName',
            //      name: "editUserName",
            //     meta: { title: '修改用户名' },
            //     component: () => import('@/pages/userCenter/editUserName.vue'),
            // },
            {
              path: "bindTelephone",
              name: "bindTelephone",
              meta: {
                title: "绑定新手机"
              },
              component: () => import("@/pages/userCenter/bindTelephone.vue")
            },
            {
              path: "myBusiness",
              name: "myBusiness",
              meta: {
                title: "我的企业"
              },
              component: () => import("@/pages/userCenter/myBusiness.vue")
            },
            {
              path: "goodsCollection",
              name: "goodsCollection",
              meta: {
                title: "商品收藏"
              },
              component: () => import("@/pages/userCenter/goodsCollection.vue")
            },
            {
              path: "shopAttention",
              name: "shopAttention",
              meta: {
                title: "店铺关注"
              },
              component: () => import("@/pages/userCenter/shopAttention.vue")
            },
            {
              path: "activityParticipation",
              name: "activityParticipation",
              meta: {
                title: "我的活动"
              },
              component: () => import("@/pages/userCenter/activityParticipation.vue")
            },
            {
              path: "addressManage",
              name: "addressManage",
              meta: {
                title: "收货地址"
              },
              component: () => import("@/pages/userCenter/addressManage.vue")
            },
            {
              path: "myTracks",
              name: "myTracks",
              meta: {
                title: "我的足迹"
              },
              component: () => import("@/pages/userCenter/myTracks.vue")
            }
          ]
        },
      ]
    },
    {
      path: "/cydn/*",
      component: Home
    },
    {
      path: "/login",
      component: () => import("@/pages/login/login.vue")
    },
    {
      path: "/authentication",
      component: () => import("@/pages/authentication/authentication.vue")
    },
    {
      path: "/modify",
      component: () => import("@/pages/login/modify.vue")
    },
    {
      path: "/register",
      component: () => import("@/pages/login/register.vue")
    }
  ]
});