import request from './request'

export default {
    //专家智库列表
    getExpertsList(data) {
        return request({
            url: '/industryExperts/expertsList',
            method: 'get',
            params: data
        })
    },
    //首页--专家风采
    getFCList(data) {
        return request({
            url: '/industryExperts/recommendedList',
            method: 'get',
            params: data
        })
    },
    //首页--专家推荐
    getRecommendList(data) {
        return request({
            url: '/industryExperts/demeanourList',
            method: 'get',
            params: data
        })
    },
    //首页--产业要闻
    getselectInformationList(data) {
        return request({
            url: '/industryInformation/selectInformationList',
            method: 'get',
            params: data
        })
    },
    //首页--阀门资料库
    getSelectIndustryList(data) {
        return request({
            url: '/industryInformation/selectIndustryList',
            method: 'get',
            params: data
        })
    },
    //行业关键词
    getFields(data) {
        return request({
            url: '/industryExperts/getFields',
            method: 'get',
            params: data,
        })
    },
    //专家详情
    getInfo(data) {
        return request({
            url: '/industryExperts/getInfo',
            method: 'get',
            params: data,
        })
    },
    //学术、期刊、成果列表
    getOtherList(data) {
        return request({
            url: '/industryExperts/otherList',
            method: 'get',
            params: data,
        })
    },
    //联系专家
    getExpertsAppointment(data){
        return request({
            url: '/expertsAppointment/saveWeb',
            method: 'post',
            params: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
    },
     //是否首次预约
     getOrder(data){
        return request({
            url: '/expertsAppointment/whetherAppointment',
            method: 'get',
            params: data,
        })
    },
    //再次预约
    getRepeatedly(data){
        return request({
            url: '/expertsAppointment/appointmentAgain',
            method: 'get',
            params: data,
        })
    },
}