import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/userCenter';

//引入vuex 数据持久化插件
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  userInfo: {},
  token: ''
}
const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
  
}
const getters = {
  userInfo(state) {
    return state.userInfo
  },
  token(state) {
    return state.token
  }
}

const actions = {
  // 更新用户信息
  getUserInfo(context) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res=>{
        if(res.data.success) {
          context.commit('SET_USERINFO', res.data.retData)
          resolve(res.data.retData)
        } else {
          reject(res.data)
        }
      })
    })
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          userInfo: val.userInfo,
          token: val.token
        }
      }
    })
  ]
})

export default store
