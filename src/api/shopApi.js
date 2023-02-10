import request from './request'
// import config from '@/config'
//热销商品
export function hotShopList(data) {
  return request({
    url: `/igGoodsInformation/listDataWeb`,
    method: 'post',
    data,
    token: false
  })
}
//精品大牌
export function brainList(data) {
  return request({
    url: `/igBrain/listDataWeb`,
    method: 'post',
    data,
    token: false
  })
}
