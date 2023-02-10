import request from './request'

//活动获取
export function getActivityData(data) {
    return request({
        url: '/cmsActivityWeb/activityList',
        method: 'get',
        params: data,
        token: false,
    })
}

//获取详情
export function getActivityDetailData(data) {
    return request({
        url: '/cmsActivityWeb/getInfo',
        method: 'get',
        params: data,
        token: true,
    })
}

//首页推荐活动
export function getActivityRecommendData(data) {
    return request({
        url: '/cmsActivityWeb/getRecommendedActivities',
        method: 'get',
        params: data
    })
}

//活动报名
export function postActivitySignData(data) {
    return request({
        url: '/cmsActivityWeb/saveByWeb',
        method: 'get',
        params: data
    })
}