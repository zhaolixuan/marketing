import { getUserInfo } from "@/api/userCenter";
import { to } from "./util";

/**
 * 弹出提示框
 * @param {string} message 提示信息
 * @param {string} title 标题
 * @param {string} text 确定按钮文本
 * @param {string} path 点击确定按钮跳转路径
 */
export function alertMessage(message, title, text, path) {
  this.$alert(message, title, {
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: text,
    center: true,
    customClass: "alert",
    iconClass: "alert-icon",
    showClose: false
  })
    .then(res => this.$router.push(path))
    .catch(err => false);
}

export function notLoggedIn() {
  alertMessage.call(
    this,
    "未登录，请先登录",
    "登录提示",
    "去登录",
    {
      path: `/login`,
      query: {
        returnUrl: this.$route.path,
        ...this.$route.query
      }
    }
  );
}

export function notCertified() {
  alertMessage.call(
    this,
    "未认证企业，请先进行企业认证",
    "认证提示",
    "去认证",
    "/cydn/bmc/enterpriseAuth"
  );
}
/**
 * 权限验证 函数内使用了 this 使用时请把 this 指向 vue 实例
 * @example
 * ```js
 * authorization.call(this)
 * ```
 * @returns {boolean}
 */
export async function authorization() {
  // 登录
  let isLogin = false;
  // 权限
  let isAuth = false;

  const token = localStorage.getItem("token");

  if (token) isLogin = true;

  const loggedIn = async () => {
    const res = await this.$store.dispatch("getUserInfo");
    isAuth = res.supplierApprovalStatus === "success";
    if(!isAuth) notCertified.call(this);
  };

  // 是否登录
  isLogin ? await loggedIn() : notLoggedIn.call(this);

  return isLogin && isAuth;
}
