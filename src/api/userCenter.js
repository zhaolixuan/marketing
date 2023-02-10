import request from './request'
// import config from '@/config'

/** common - 获取省市县数据*/
export function queryArea (data) {
  return request({
    url: '/igGoodsInformation/listTreeData',
    method: 'get',
    data,
    token: false
  })
}
/** common - 获取账户信息*/
export function getUserInfo (data) {
  return request({
    url: '/cmsUser/getUserInfo',
    method: 'get',
    data
  })
}
/** 个人中心 - 修改手机号*/
export function changePhone (data) {
  return request({
    url: '/cmsUser/changeTel',
    method: 'post',
    data
  })
}
/** 个人中心 - 修改密码*/
export function changePassword (data) {
  return request({
    url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/replyPassword`,
    method: 'post',
    data
  })
}
/** 个人中心 - 获取认证信息*/
export function getAuthInfo (data) {
  return request({
    url: '/cmsUserAuthInfo/getSupplierAuthInfo',
    method: 'get',
    data
  })
}
/** 个人中心 - 提交认证信息*/
export function sendAuthInfo (data) {
  return request({
    url: '/cmsUserAuthInfo/supplierAuth',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
}
/** 个人中心 - 企业专家字典*/
export function getDictionaries (data) {
  return request({
    url: '/sysDict/getOptions',
    method: 'get',
    params:data
  })
}
/** 个人中心 - 企业专家列表*/
export function getInfoList (data) {
  return request({
    url: '/expertsAppointment/listData',
    method: 'get',
    params:data
  })
}
/** 个人中心 - 企业专家查询*/
export function getInfoDetail (data) {
  return request({
    url: '/expertsAppointment/getById',
    method: 'get',
    params:data
  })
}
/** 政策匹配信息字典表*/
export function dictList(data){
  return request({
    url: "/pcDict/dictList",
    method: "get",
    params: data,
  })
}
// 政策关注
export function myCollect(data){
  return request({
    url: "/pcPolicyOfMine/myCollect",
    method: "get",
    params: data,
  })
}
// 政策申请
export function myDeclare(data){
  return request({
    url: "/pcPolicyDeclare/myDeclare",
    method: "get",
    params: data,
  })
}
/** 政策申请取消*/
export function removeByIds(data){
  return request({
    url: "/pcPolicyDeclare/removeByIds",
    method: "get",
    params: data,
  })
}
/** 政策关注取消*/
export function delCollect(data){
  return request({
    url: "/pcPolicyOfMine/delCollect",
    method: "get",
    params: data,
  })
}
/** 个人中心 - 订单列表*/
export function getOrderList(data){
  return request({
    url: "/igOrder/listData",
    method: "get",
    params: data,
  })
}
/** 个人中心 - 取消订单*/
export function cancelOrder(data){
  return request({
    url: "/igOrder/cancleOrder",
    method: "get",
    params: data,
  })
}
/** 个人中心 - 确认收货*/
export function confirmOrder(data){
  return request({
    url: "/igOrder/receivingGoods",
    method: "get",
    params: data,
  })
}
/** 个人中心 - 我的企业列表*/
export function getMyBusiness(params) {
  return request({
    url: "/meCompany/search",
    method: "get",
    params
  });
}
/** 个人中心 - 我的企业取消关注*/
export function getCancelAttention(params) {
  return request({
    url: "/meCompany/cancel",
    method: "get",
    params
  });
}
/** 个人中心 - 店铺关注列表*/
export function getListFollowSuppWeb(params) {
  return request({
    url: "/igUserCollSupp/listFollowSuppWeb",
    method: "get",
    params
  });
}
/** 个人中心 - 店铺关注列表-取消关注*/
export function cancelShopAttention(params) {
  return request({
    url: "/igUserCollSupp/followSupp",
    method: "post",
    params
  });
}
/** 个人中心 - 商品收藏列表*/
export function getListCollectGoodsWeb(params) {
  return request({
    url: "/igUserGoods/listCollectGoodsWeb",
    method: "get",
    params
  });
}
/** 个人中心 - 商品收藏列表-取消收藏*/
export function collectGoods(params) {
  return request({
    url: "/igUserGoods/collectGoods",
    method: "post",
    params
  });
}
/** 个人中心 - 首页-统计接口*/
export function getCmsUserShow(params) {
  return request({
    url: "/cmsUserShow/setActvityParticipationQuantity",
    method: "get",
    params
  });
}
/** 个人中心 - 活动参与量列表*/
export function getActivityParticipation(params) {
  return request({
    url: "/cmsActivityWeb/getActivityParticipationQuantityParticulars",
    method: "get",
    params
  });
}
/** 收货地址管理 - 获取收货地址数据*/
export function queryAddress (data) {
  return request({
    url: '/igShippingAddress/listData',
    method: 'post',
    params: data
  })
}
/** 收货地址管理 - 修改默认地址*/
export function setDefaultAddress (data) {
  return request({
    url: '/igShippingAddress/updateDefaultAddress',
    method: 'post',
    params: data
  })
}
/** 收货地址管理 - 删除收货地址*/
export function delAddress (data) {
  return request({
    url: '/igShippingAddress/deleteByIds',
    method: 'post',
    params: data
  })
}
/** 收货地址管理 - 新增收货地址*/
export function saveAddress (data) {
  return request({
    url: '/igShippingAddress/save',
    method: 'post',
    params: data
  })
}

// 个人中心-我的浏览政策列表
export function getMyBrowse(params) {
  return request({
    url: "/pcPolicyOfMine/myBrowse",
    baseURL: "http://qsx-test.xjoycity.com/cms-server-policy",
    method: "get",
    params
  });
}
/** 买家 - 获取认证信息*/
export function getBuyerAuthInfo (data) {
  return request({
    url: '/cmsUserAuthBuyer/getBuyerAuthInfo',
    method: 'get',
    data
  })
}
/** 买家 - 提交认证信息*/
export function sendBuyerAuthInfo (data) {
  return request({
    url: '/cmsUserAuthBuyer/buyerAuth',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
}
/** 买家 - 我的足迹列表*/
export function getMyTracks(data) {
  return request({
    url: '/igUserGoodsBrowse/listDataGoods',
    method: 'get',
    data
  })
}
/** 买家 - 我的足迹列表-单个删除*/
export function getMyTracksDelete(params) {
  return request({
    url: "/igUserGoodsBrowse/deleteByGoodsId",
    method: "post",
    params
  });
}
/** 买家 - 我的足迹列表-批量删除*/
export function getMyTracksBatchDelete(params) {
  return request({
    url: "/igUserGoodsBrowse/deleteBatch",
    method: "post",
    params
  });
}
/** 买家 - 首页列表*/
export function getDataIndexBuyer(data) {
  return request({
    url: "/cmsUserShow/countDataIndexBuyer",
    method: "get",
    data
  });
}