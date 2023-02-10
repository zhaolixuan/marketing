<template>
  <div id="center_menu_box">
    <el-menu
      class="sidebar-el-menu"
      :default-openeds="['1', '2', '3']"
      background-color="#fff"
      active-text-color="#0078E3"
      router
    >
      <template v-for="item in menuList">
        <template v-if="item.children.length">
          <el-submenu :index="item.link" :key="item.link">
            <template slot="title">
              <i :class="[item.icon, 'no-active-icon']"></i>
              <i :class="[item.icon + '_active', 'active-icon']"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.link"
              :index="subItem.link"
              >{{ subItem.name }}</el-menu-item
            >
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.link" :key="item.link">
            <i :class="[item.icon, 'no-active-icon']"></i>
            <i :class="[item.icon + '_active', 'active-icon']"></i>
            <span slot="title">{{ item.name }} </span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: "首页",
          link: "/cydn/userCenter/userInfo",
          icon: "iconfont icon-home",
          children: [],
        },
        {
          name: "交易",
          link: "1",
          icon: "iconfont icon-order",
          children: [{ name: "我的订单", link: "/cydn/userCenter/orderList" }],
        },
        {
          name: "收藏夹",
          link: "2",
          icon: "iconfont icon-collect",
          children: [
            { name: "收藏的商品", link: "/cydn/userCenter/goodsCollection" },
            { name: "收藏的店铺", link: "/cydn/userCenter/shopAttention" },
          ],
        },
        {
          name: "账号管理",
          link: "3",
          icon: "iconfont icon-account",
          children: [
            {
              name: "身份认证",
              link: "/cydn/userCenter/EnterpriseCertification",
            },
            { name: "收货地址", link: "/cydn/userCenter/addressManage" },
            { name: "我的足迹", link: "/cydn/userCenter/myTracks" },
            { name: "修改密码", link: "/cydn/userCenter/editPassword" },
            { name: "绑定新手机", link: "/cydn/userCenter/bindTelephone" },
          ],
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#center_menu_box {
  position: absolute;
  left: 0;
  top: 0;
  width: 13.5%;
  z-index: 99;
  padding-top: 40px;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  .sidebar-el-menu {
    border: none;
    &::v-deep > .el-menu-item {
      padding-left: 20% !important;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      color: #0D0D0D;
      font-weight: 600;
      border-bottom: 1px solid #F0F0F0;
      &:first-child {
        border-top: 1px solid #F0F0F0;
      }
      &:first-child.is-active {
        color: #007FEF;
        background-color: rgba(0, 120, 227, 0.08) !important;
        .no-active-icon {
          display: none;
        }
        .active-icon {
          display: block;
        }
      }
      .active-icon {
        display: none;
      }
      &:hover {
        background-color: rgba(0, 120, 227, 0.08) !important;
        color: #007FEF !important;
        .no-active-icon {
          display: none;
        }
        .active-icon {
          display: block;
        }
      }
    }
    &::v-deep .el-submenu {
      box-sizing: border-box;
      font-size: 12px;
      border-bottom: 1px solid #F0F0F0;
      .el-menu-item {
        min-width: 100%;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        padding-left: 30% !important;
        color: #595959;

        &:hover {
          background-color: rgba(0, 120, 227, 0.08) !important;
          color: #007FEF !important;
        }
      }
      .is-active {
        color: #007FEF;
        background-color: rgba(0, 120, 227, 0.08) !important;
        position: relative;
        &::before {
          content: "";
          width: 5px;
          height: 100%;
          background-color: #007FEF;
          border-radius: 5px;
          position: absolute;
          left: 0;
          top: 0;
        }
        // border-left: 5px solid #007FEF;
        // box-sizing: border-box;
      }
      .el-submenu__title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        display: flex;
        align-items: center;
        font-weight: 600;
        padding-left: 20% !important;
        box-sizing: border-box;
        color: #0D0D0D;
        .active-icon {
          display: none;
        }
        &:hover {
          background-color: rgba(0, 120, 227, 0.08) !important;
          color: #007FEF !important;
          .no-active-icon {
            display: none;
          }
          .active-icon {
            display: block;
          }
        }
        .el-submenu__icon-arrow {
          margin-top: -6px;
        }
      }
    }
  }
}
.iconfont {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 5%;
  background-size: cover;
  &.icon-home {
    background-image: url("../../../static/images/menuIcon/home.png");
  }
  &.icon-home_active {
    background-image: url("../../../static/images/menuIcon/home_active.png");
  }
  &.icon-order {
    background-image: url("../../../static/images/menuIcon/order.png");
  }
  &.icon-order_active {
    background-image: url("../../../static/images/menuIcon/order_active.png");
  }
  &.icon-collect {
    background-image: url("../../../static/images/menuIcon/collect.png");
  }
  &.icon-collect_active {
    background-image: url("../../../static/images/menuIcon/collect_active.png");
  }
  &.icon-account {
    background-image: url("../../../static/images/menuIcon/account.png");
  }
  &.icon-account_active {
    background-image: url("../../../static/images/menuIcon/account_active.png");
  }
}
</style>
