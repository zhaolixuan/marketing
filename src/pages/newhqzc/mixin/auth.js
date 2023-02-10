import { searchCompany, getAuthCompany } from "@/api/hqzc.js";
export default {
  data() {
    return {
      isLogin: false,
      isAuth: false,
      isNull: false,
      companyName: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.isLogin = !!localStorage.getItem("token");
      if (this.isLogin) {
        // 更新用户信息
        const res = await this.$store.dispatch("getUserInfo");
        this.isAuth = res.supplierApprovalStatus === "success";
        this.companyName = res.companyInfo && res.companyInfo.companyName || "";
        if (this.isAuth) {
          Promise.all([
            getAuthCompany({
              companyName: this.companyName,
            }),
            searchCompany({
              companyName: this.companyName,
              PageNo: 1,
            }),
          ]).then((res) => {
            this.isNull = !res[0].data.retData && !res[1].data.retData?.length;
          });
        }
      }
    },
  },
};
