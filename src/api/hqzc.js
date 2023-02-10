import request from "./request";

// 政策匹配信息字典表
export function dictList(data) {
  return request({
    url: "/pcDict/dictList",
    method: "get",
    params: data,
  });
}
// 获取注册地
export function listTreeDatas(data) {
  return request({
    url: "/pcCorporateInfo/listTreeDatas",
    method: "get",
    params: data,
  });
}
// 是否补足信息
export function getCorporateInfo(data) {
  return request({
    url: "/pcCorporateInfo/getCorporateInfo",
    method: "get",
    params: data,
  });
}
// 获取认证信息
export function getSupplierAuthInfo(data) {
  return request({
    url: "/cmsUserAuthInfo/getSupplierAuthInfo",
    method: "get",
    params: data,
  });
}
// 政策匹配保存
export function getSave(data) {
  return request({
    url: "/pcCorporateInfo/save",
    method: "post",
    data,
  });
}
// 获取公司信息
export function basicQuery(data) {
  return request({
    url: "/aIAnalysis/basicQuery",
    baseURL: process.env.VUE_APP_CHANYE_API,
    method: "get",
    params: data,
  });
}
// 政策匹配-列表
export function queryByCompanyNew(data) {
  return request({
    url: "/queryPolicy/queryByCompany",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "post",
    data,
  });
}
// 政策查询-关键词搜索
export function getKeyWordSearch(data) {
  return request({
    url: "/queryPolicy/queryByKeyWord",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "post",
    data,
  });
}

// 政策详情-获取政策详情
export function getPolicyDetail(data) {
  return request({
    url: "/queryPolicy/getPolicyDetail",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "post",
    data,
  });
}

// 政策详情-获取政策附件
export function getKeeUploadFile(data) {
  return request({
    url: "/keeUploadFile/getByIds",
    method: "get",
    params: data,
  });
}

// 政策详情-取消收藏
export function cancelCollection(data) {
  return request({
    url: "/pcPolicyOfMine/cancel",
    method: "get",
    params: data,
  });
}

// 政策详情-收藏
export function collection(data) {
  return request({
    url: "/pcPolicyOfMine/save",
    method: "get",
    params: data,
  });
}

// 政策详情-查询该用户是否申请过当前政策
export function getDeclare(data) {
  return request({
    url: "/pcPolicyDeclare/getDeclare",
    method: "get",
    params: data,
  });
}

// 立即申报-获取用户信息
export function getUser(data) {
  return request({
    url: "cmsUser/getUserInfo",
    method: "get",
    params: data,
  });
}

// 立即申报-提交用户信息
export function submitUserInfo(data) {
  return request({
    url: "/pcPolicyDeclare/save",
    method: "post",
    data,
  });
}

// 政策数据接口
export function indexGet(data) {
  return request({
    url: "/pcPolicyDataCount/indexGet",
    method: "get",
    params: data,
  });
}
// 政策文件/法律法规/通知公告/热门政策首页列表接口
export function indexGetPolicyByType(data) {
  return request({
    url: "/queryPolicy/indexGetPolicyByType",
    method: "get",
    params: data,
  });
}

// 企业搜索接口
export function searchCompany(data) {
  return request({
    url: "/aIAnalysis/fuzzyQuery",
    baseURL: process.env.VUE_APP_CHANYE_API,
    method: "get",
    params: data,
  });
}

// 首页-热门政策
export function getPopularPolicy(params) {
  return request({
    url: "/queryPolicy/indexGetHeatPolicy",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "get",
    params,
  });
}

// 运营能力解析图分数
export function entScoreQuery(params) {
  return request({
    url: "/aIAnalysis/entScoreQuery",
    baseURL: process.env.VUE_APP_CHANYE_API,
    method: "get",
    params,
    token: false,
  });
}
// 确认该公司是否已认领
export function getAuthStatus(params) {
  return request({
    url: "queryPolicy/getAuthStatus",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "get",
    params,
  });
}
// 获取公司信息2
export function getAuthCompany(data) {
  return request({
    url: "/queryPolicy/getAuthCompany",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "get",
    params: data,
  });
}

// 获取最新成交
export function getOrderDetail() {
    return request({
      url: "/igOrder/getOrderDetail",
      baseURL: process.env.VUE_APP_BASE_API,
      method: "get",
    });
  }
  
// 更新匹配次数
export function updateMatchNum(data) {
  return request({
    url: "/pcPolicyDataCount/updateMatchNum",
    baseURL: process.env.VUE_APP_POLICY_API,
    method: "get",
    params: data,
  });
}

function toFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
}
