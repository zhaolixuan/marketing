<template>
  <div class="matching">
    <matchingA
      v-if="matchingState && state"
      :matchingState="matchingState"
      @showMatchingA="showMatchingA"
    ></matchingA>
    <matchingB
      v-else-if="!matchingState && state"
      :matchingState="matchingState"
      @showMatchingB="showMatchingB"
    ></matchingB>
  </div>
</template>

<script>
import matchingA from "./matching_a.vue";
import matchingB from "./matching_b.vue";
import { getCorporateInfo } from "@/api/hqzc.js";

export default {
  components: {
    matchingA,
    matchingB,
  },
  data() {
    return {
      matchingState: false,
      state: false,
    };
  },
  mounted() {
    this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.getCorporateInfo();
  },
  watch: {
    // matchingState:function(val,oldval){
    //   this.matchingState = val;
    // }
  },
  methods: {
    showMatchingA() {
      this.matchingState = false;
    },
    showMatchingB() {
      this.matchingState = true;
    },
    //判断用户是否有过补全记录接口
    getCorporateInfo() {
      getCorporateInfo().then((res) => {
        this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        }).close();
        this.state = true;
        this.matchingState = res.data.success;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.matching {
  width: 100%;
}
</style>
