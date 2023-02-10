import { formatDate } from "@/common/util";
import { dictList } from "@/api/hqzc";
export default {
  data() {
    return {
      // 政策级别
      policyLevel: "",
      policyLevelData: {
        name: "政策级别",
        data: [
          {
            title: "全部",
            value: ""
          }
        ]
      },
      // 政策类型
      policyType: "",
      policyTypeData: {
        name: "政策类型",
        data: [
          {
            title: "全部",
            value: ""
          }
        ]
      },
      // 政策主题
      policyTheme: "",
      policyThemeData: {
        name: "政策主题",
        data: [
          {
            title: "全部",
            value: ""
          }
        ]
      }
    };
  },
  mounted() {
    // 获取政策级别
    this.getPolicyLevel();
    // 获取政策类型
    this.getPolicyType();
    // 获取政策主题
    this.getPolicyTheme();
  },
  watch: {
    policyLevel: {
      handler(val) {
        this.currentPage = 1;
        this.search();
      }
    },
    policyType: {
      handler(val) {
        this.currentPage = 1;
        this.search();
      }
    },
    policyTheme: {
      handler(val) {
        this.currentPage = 1;
        this.search();
      }
    }
  },
  methods: {
    // 获取政策级别
    getPolicyLevel() {
      dictList({
        dictType: "policy_level"
      })
        .then(res => {
          if (res.status === 200) {
            this.policyLevelData.data.push(...res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取政策类型
    getPolicyType() {
      dictList({
        dictType: "policy_type"
      })
        .then(res => {
          if (res.status === 200) {
            this.policyTypeData.data.push(...res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取政策主题
    getPolicyTheme() {
      dictList({
        dictType: "policy_theme"
      })
        .then(res => {
          if (res.status === 200) {
            this.policyThemeData.data.push(...res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange() {
      this.search();
    },
    formatDate(date, fmt) {
      return formatDate(date, fmt);
    }
  }
};
