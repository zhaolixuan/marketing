import request from './request'

//获取资讯分类列表
export function getCategory(data) {
    return request({
      url: '/cmsActivityInfoType/listData',
      method: 'get',
      params:data
    })
  }
//资讯轮播图
export function informationImg(data){
    return request({
        url: '/cmsActivityInfo/selectRecommendList',
        method: 'get',
        params:data
    })
}
//资讯列表
export function informationList(data){
  return request({
      url: '/cmsActivityInfo/selectNewestList',
      method: 'get',
      params:data
  })
}
//详情
export function informationDeatils(data){
  return request({
      url: '/cmsActivityInfo/informationDetails',
      method: 'get',
      params:data
  })
}