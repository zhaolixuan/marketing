// import config from '@/config'
import request from './request'

export function getConfig(data) {
    return request({
        // url: 'http://yuhuan-dev.xjoycity.com/domainConfig/config',
        url: `${(window.location.origin).indexOf('http://localhost:8080') !== -1 ? process.env.VUE_APP_DOMAIN_BASE_API : window.location.origin}/domainConfig/config`,
        method: 'get',
        params: data,
        token: false,
    })
}

export function getMenuList(data) {
    return request({
        // url: 'http://yuhuan-dev.xjoycity.com/homeFrame/getMenus',
        url: `${process.env.VUE_APP_DOMAIN_BASE_API}/homeFrame/getMenus`,
        method: 'get',
        params: data,
        token: false,
    })
}

export function getLoginRsaKey() {
    return request({
        url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/getLoginRsaKey`,
        method: 'get',
        token: false,
    })
}


//短信验证码
export function messagesSend(data) {
    return request({
        url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/sendSmsNoCaptcha`, 
        method: 'get',
        params: data,
        token: false,
    })
}
//获取轮播图
export function getBanner(data) {
    data = Object.assign({
        search_EQ_status: 'activate',
        order: 'desc',
        sort: 'seq',
    }, data)
    return request({
        url: '/cmsBanner/searchWeb',
        method: 'get',
        params: data
    })
}
