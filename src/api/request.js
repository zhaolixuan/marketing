import axios from "axios";
import qs from "qs";
import Vue from "vue";
// import config from '@/config'
// import store from '@/store'
// import { Message } from 'view-design'

// const baseUrl = config.baseUrl
const baseUrl = process.env.VUE_APP_BASE_API;
axios.defaults.withCredentials = false;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 10000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    //登录和注册接口不能带token
    if (config.token !== false) {
      config.url = config.url + "?token=" + (localStorage.token || "");
    }

    if (config.method === "post") {
      // post 请求取消表单格式
      if (config.isFormData === false) {
        delete config.isFormData;
        return config;
      }
      config.data = qs.stringify({
        ...config.data,
        currentOrgId: localStorage.getItem("currentOrgId") || "",
      });
    } else if (config.method == "get") {
      config.params = {
        ...config.params,
        currentOrgId: localStorage.getItem("currentOrgId") || "",
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
// response 拦截器
service.interceptors.response.use(
  (res) => {
    // this.destroy(url)
    // const { data } = res
    // if (data.code !== 1) {
    //     Message.error(data.error)
    //     return Promise.reject(data.error)
    // }
    return res;
  },
  (error) => {
    // Message.error('请求服务器异常！请稍后重试')
    return Promise.reject(error);
  }
);

export default service;
