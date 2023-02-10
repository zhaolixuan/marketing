import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import echarts from "echarts";
import { formatDate, isNotNull } from './common/util'
import '@/common/iconfont/iconfont.css';
import '@/common/swiper/swiper.min.js'
import '@/common/swiper/swiper.min.css'
import '@/common/common.css'
import JSEncrypt from '@/common/jsencrypt.min.js'
import store from './store/index';
import { registerMicroApps, setDefaultMountApp, start } from "qiankun";
import { getConfig } from '@/api/baseApi'
import config from '@/config'
import moment from "moment"
import JdContent from './components/JdContent.vue'

ElementUI.Dialog.props.closeOnClickModal.default = false;
Vue.component('JdContent', JdContent)

Vue.use(ElementUI, {
    size: 'small'
});
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})

Vue.prototype.$jsencrypt = JSEncrypt
Vue.prototype.$time = formatDate
Vue.prototype.$config = config
Vue.prototype.$echarts = echarts;

//公共时间转换过滤器
Vue.filter('filterTime', function (value, params = "YYYY-MM-DD HH:mm:ss") {
    return moment(parseInt(value)).format(params);
})
Vue.filter("defaultValue", function (value) {
    return value === undefined || value === null || value === "" ? "---" : value;
})

getConfig().then(res => {
    if (res.status == 200) {
        //currentOrgId放在localStorage中方便其他项目共享
        localStorage.setItem("currentOrgId", res.data.currentOrgId || '')
        Vue.prototype.$config = Object.assign(config, res.data);
        document.title = Vue.prototype.$config.footerTitle
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
        const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
        console.log(111);
        console.log(getActiveRule('#/cydn/retail'))
        // 注册子应用
        registerMicroApps([
            {
                name: 'retail',
                entry: process.env.VUE_APP_RETAIL,
                container: '#retail',
                activeRule: getActiveRule('#/cydn/retail'),
            },
        ]);
        registerMicroApps([
            {
                name: 'bmc',
                entry: process.env.VUE_APP_BMC,
                container: '#bmc',
                activeRule: getActiveRule('#/cydn/bmc'),
            },
        ]);
    } else {
    }
});
