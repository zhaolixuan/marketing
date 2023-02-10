import request from './request'
import config from '@/config'

//登录
export function login(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/webLogin`,
    method: 'post',
    data,
    token: false
  })
}
//验证码登录
export function codelogin(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/loginBySms`,
    method: 'post',
    data,
    token: false
  })
}

//注册
export function register(data) {
  return request({
    url: `/cmsUser/webRegister`,
    method: 'post',
    data,
    token: false
  })
}
//忘记密码
export function forgetPassword(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/webForgetPassword`,
    method: 'post',
    data,
    token: false
  })
}

//退出登录
export function loginOut(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_PASSPORD_URL}/passport/logOut`,
    method: 'get',
    params: data
  })
}
