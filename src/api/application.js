import request from "./request";
//首页分类
export function getTree(data) {
  return request({
    url: '/appBasicInfo/getAppCategoryList',
    method: 'get',
    params:data,
    token: false
  })
}
//列表查询
export function getStoreList(data) {
  return request({
    url: '/appBasicInfo/listWebData',
    method: 'post',
    data,
    token: false
  })
}

//查询详情
export function getStoreDetail(data) {
  return request({
    url: '/appBasicInfo/getWeb',
    method: 'get',
    params:data,
    token: false
  })
}

//新增意向
export function addSave(data) {
  return request({
    url: '/appIntention/save',
    method: 'post',
    data,
    token: true
  })
}

//查询当前应用是否登记过
export function storeIsSave(data) {
  return request({
    url: '/appBasicInfo/checkIntention',
    method: 'post',
    params:data,
    token: true
  })
}

//相关应用推荐
export function storeRecommed(data) {
  return request({
    url: '/appBasicInfo/demeanourList',
    method: 'post',
    params:data,
    token: true
  })
}

