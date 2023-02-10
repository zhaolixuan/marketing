import request from './request'

//阀门资料库获取分类
export function getClass(data) {
    return request({
      url: '/industryInformation/selectInformationType',
      method: 'get',
      params:data,
      token: false
    })
  }
//阀门资料库获取列表
export function getZLDataList(data){
    return request({
        url: '/industryInformation/selectIndustryList',
        method: 'get',
        params:data,
        token: false
    })
}
//产业要问获取列表
export function getYWDataList(data){
  return request({
      url: '/industryInformation/selectInformationList',
      method: 'get',
      params:data,
      token: false
  })
}
//详情
export function getDetail(url,data){
  return request({
    url: url,
    method: 'get',
    params:data,
    token: false
})
}