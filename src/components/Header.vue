<template>
  <div>
    <div :class="isBMCCenter ? 'headerBox seller-header' : 'headerBox'">
      <div class="menuList">
        <router-link to="/cydn/home" class="logo">
          <img :src="$config.logoManageUrl" v-show="isBMCCenter">
          <img :src="$config.logoHomeUrl" v-show="!isBMCCenter">
        </router-link>
        <ul class="menu_box">
          <li
            class="menu_item"
            v-for="item in menuList" 
            :key="item.id"
            :class="{ 'item_active': $route.path == item.attributes.src }"
            @click="linkUrlEvent(item)"
          >
            {{ item.text }}
            <i class="el-icon-arrow-down" v-if="item.children"></i>
            <div class="dropdown_box" v-if="item.children">
              <div class="dropdown_in">
                <div class="list_item" v-for="item2 in item.children" :key="item2.id">
                  <h6
                    class="item_tit"
                    @click="linkUrlEvent(item2)"
                    :style="{ cursor: item2.attributes.src ? 'pointer' : 'default' }"
                  >{{ item2.text }}</h6>
                  <ul class="item_list">
                    <li
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @click="linkUrlEvent(item3)"
                      :style="{ cursor: item3.attributes.src ? 'pointer' : 'default' }"
                    >{{ item3.text }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="person">
        <div v-if="!loginShow()" class="no-login-btn">
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </div>
        <div class="person_in" v-else>
          <div class="person_btn_box">
            <span @click="goCompany" :class="isBMCCenter ? 'active' : ''">卖家中心</span>
            <span v-if="userInfo.userGroup !== 'subaccount'" @click="goUserCenter" :class="isUserCenter ? 'active' : ''">买家中心</span>
          </div>
          <div class="person_info" v-loading="loading">
            <img src="../static/images/defaultUrl.png" />
            <span class="userName">{{ userInfo.loginName }}</span>
            <div class="person_dropdown">
              <span @click="getOutBtn">退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuList } from "@/api/baseApi";
import { loginOut } from "@/api/loginApi";
export default {
  data() {
    return {
      form: {},
      menuList: [],
      token: "",
      loading: false,
      // businessLink: '',
      isUserCenter: null
    };
  },
  mounted() {
      
    // this.businessLink = `${process.env.VUE_APP_BUSINESS_URL}?userId=${this.userInfo.userId}&token=${localStorage.token}&userGroup=${this.userInfo.userGroup}`;
    getMenuList({
      menuType: this.$config.citycode
    }).then(res => {
      if (res.status == 200) {
        this.menuList = res.data.menus;
      }
    });
  },
  watch: {
    $route: {
      handler: function(route) {
        if (route.path.indexOf("/cydn/userCenter") !== -1) {
          this.isUserCenter = true;
        } else {
          this.isUserCenter = false;
        }
      },
      immediate: true
    }
  },
  computed: {
    isBMCCenter() {
      return this.$route.path.includes("/cydn/bmc");
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    authObj() {
      // supplierApprovalStatus:  unauth 未认证, approvaling 审核中, reject 未通过, success 已通过
      let obj = {};
      switch (this.userInfo.supplierApprovalStatus) {
        case "unauth":
          obj = {
            state: "unauth",
            conText: "您当前尚未进行企业账号认证，请先去认证。",
            btnText: "去认证"
          };
          break;
        case "approvaling":
          obj = {
            state: "approvaling",
            conText: "您提交的企业认证资料审核中，请耐心等待。",
            btnText: "查看认证信息"
          };
          break;
        case "reject":
          obj = {
            state: "reject",
            conText: "您提交的企业认证资料尚审核未通过。",
            btnText: "查看认证信息"
          };
          break;

        default:
          obj = {
            state: "success"
          };
          break;
      }
      return obj;
    }
  },
  methods: {
    loginShow() {
      return !!localStorage.token;
    },
    goUserCenter() {
      this.$router.push({ path: "/cydn/userCenter/userInfo" });
    },
    goCompany() {
      this.$router.push("/cydn/bmc/index")
      // if (this.authObj.state === "success") {
      //   // window.open(this.businessLink, "_blank")
      //   this.$router.push("/cydn/bmc/index");
      // } else {
      //   this.$confirm(this.authObj.conText, "提示", {
      //     confirmButtonText: this.authObj.btnText,
      //     showCancelButton: false,
      //     showClose: false
      //   }).then(() => {
      //     this.$router.push({
      //       path: "/cydn/userCenter/EnterpriseCertification"
      //     });
      //   });
      // }
    },
    linkUrlEvent(item) {
      if (!item.attributes.src) {
        return;
      }
      if (item.attributes.src.search(/\${token}/) > -1 && !localStorage.token) {
        this.$router.push({
          path: "/login"
        });
      } else if (
        item.attributes.src.search(/\${token}/) > -1 &&
        item.attributes.src.indexOf("http") > -1
      ) {
        window.open(
          item.attributes.src.replace(/\${token}/, localStorage.token)
        );
      } else if (item.attributes.src.indexOf("http") > -1) {
        window.open(`${item.attributes.src}`);
      } else {
        this.$router.push({
          path: item.attributes.src
        });
      }
    },
    goLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    async getOutBtn() {
      this.loading = true;
      let res = await loginOut();
      const currentOrgId = localStorage.currentOrgId;
      if (res.data.success) {
        localStorage.clear();
        localStorage.currentOrgId = currentOrgId;
        this.$store.commit("SET_TOKEN", "");
        this.$store.commit("SET_USERINFO", {});
        setTimeout(() => {
          this.$router.push({
            path: "/",
            query: {
              loginout: ""
            }
          });
          this.loading = false;
        }, 500);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.headerBox {
  width: 100%;
  background-color: #fff;
  padding-left: 30px;
  box-sizing: border-box;
  height: 41px;
  color: #0d0d0d;
  // line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(13, 13, 13, 0.08);
}
.seller-header {
  background-color: #232731;
  color: #D9D9D9;
  border-bottom: 1px solid #333A49;
  .menuList {
    .menu_box {
      .menu_item {
        &:hover {
          font-weight: 600;
          color: #fff;
        }
        .dropdown_box {
          background-color: #232731;
          border: 1px solid #333A49;
          border-top: none;
          .dropdown_in {
            .list_item {
              .item_tit {
                border-bottom: 1px solid #333A49;
              }
              .item_list {
                li {
                  color: #D9D9D9;
                  font-weight: normal;
                  &:hover {
                    font-weight: 600;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .person {
    .person_in {
      .person_btn_box {
        span {
          &:hover {
            font-weight: 600;
            color: #fff;
          }
        }
        .active {
          font-weight: 600;
          color: #fff;
        }
      }
      .person_info {
        .person_dropdown {
          background-color: #232731;
          color: #D9D9D9;
          span:hover {
            font-weight: 600;
            color: #fff;
          }
        }
      }
    }
  }
}
.menuList {
  display: flex;
  align-items: center;
  .logo {
    height: 41px;
    margin-right: 20px;
    img {
      display: inline-block;
      width: auto;
      height: 40px;
    }
  }
  .menu_box {
    display: flex;
    align-items: center;
    height: 41px;
    .menu_item {
      height: 100%;
      line-height: 41px;
      padding: 0 20px;
      cursor: pointer;
      // color: #0d0d0d;
      font-size: 14px;
      position: relative;
      i {
        transition: all 0.2s ease 0s;
      }
      .item_active {
        color: #0078e3;
      }
      .dropdown_box {
        min-width: 640px;
        max-width: calc(100vw * 0.8);
        min-height: 170px;
        position: absolute;
        top: 41px;
        line-height: normal;
        left: calc(-100vw * 0.1);
        background-color: #fff;
        display: none;
        z-index: 2147483647;
        box-shadow: 0px 14px 24px 18px rgba(31, 38, 50, 0.07);
        padding: 30px 40px 0;
        box-sizing: border-box;
        // transition: all 0.2s ease 0s;
        
        .dropdown_in {
          display: flex;
          .list_item {
            min-width: 80px;
            padding-right: 78px;
            padding-bottom: 30px;
            font-family: "Microsoft YaHei";
            .item_tit {
              font-size: 14px;
              color: #929292;
              font-weight: 600;
              border-bottom: 1px solid rgba(13, 13, 13, 0.08);
              padding-bottom: 10px;
            }
            .item_list {
              li {
                font-size: 14px;
                padding-top: 20px;
                color: #0d0d0d;
                &:hover {
                  color: #0E67FF;
                }
              }
            }
            &:last-child {
              padding-right: 0;
            }
          }
        }
        
      }
      &:hover {
        color: #0078e3;
        i {
          transform: rotate(180deg);
        }
        .dropdown_box {
          display: block;
        }
      }
    }
  }
}

.person {
  height: 41px;
  div {
    a {
      display: inline-block;
      text-decoration: none;
      padding: 0 24px;
      color: #909399;
      height: 41px;
      line-height: 41px;
      &:last-child {
        background: #0078E3;
        color: #fff;
      }
    }
  }
  .person_in {
    display: flex;
    align-items: center;
    height: 100%;
    .person_btn_box {
      padding-right: 20px;
      span {
        padding: 0 20px;
        cursor: pointer;
        &:hover {
          color: #0078e3;
        }
      }
      .active {
        color: #0078e3;
      }
    }
    .person_info {
      position: relative;
      padding-right: 30px;
      height: 100%;
      line-height: 41px;
      cursor: pointer;
      img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .userName {
        font-size: 14px;
      }
      .person_dropdown {
        position: absolute;
        top: 41px;
        right: 0;
        width: 140px;
        height: 40px;
        line-height: 40px;
        z-index: 999;
        background: #fff;
        text-align: center;
        display: none;
        box-shadow: -6px 5px 10px 2px rgba(31, 38, 50, 0.07);
        span {
          font-size: 14px;
          display: block;
        }
        span:hover {
          color: #0078e3;
        }
      }
      &:hover {
        .person_dropdown {
          display: block;
        }
      }
    }
  }
}
</style>
