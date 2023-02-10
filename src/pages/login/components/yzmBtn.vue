<template>
  <div class="yzmBtn" :class="{ clickable: clickable }" @click="getYZM">
    {{ btnInfo }}
  </div>
</template>
<script>
import { messagesSend } from "@/api/baseApi";
export default {
  props: {
    phone: String,
    yzm: String,
    msgType: {
      type: Number,
      default: 2,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnInfo: "获取验证码",
      timer: "",
      flag: false,
      second: 60,
    };
  },
  computed: {
    clickable() {
      var reg =
        /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
      return reg.test(this.phone);
    },
  },
  methods: {
     async  getYZM() {
      if (!this.phone) {
        this.$message.warning("请填写手机号");
        return;
      }
      if (!this.clickable) {
        this.$message.warning("请填写正确的手机号");
        return;
      }
      if (!this.flag) {
        this.flag = true;
        let params = {
          tel: this.phone,
          msgType: this.msgType,
        };

        if(this.isLogin){
          params.isLogin = this.isLogin
        }
        
        await messagesSend(params).then((res) => {

          const { success, message } = res.data;
          if (success) {
            this.second = 60;
            this.timer = setInterval(() => {
              this.second--;
              this.btnInfo = `${this.second}s后重新发送`;
              if (this.second === 0) {
                clearInterval(this.timer);
                this.flag = false;
                this.btnInfo = "重新发送";
              }
            }, 1000);
          } else {
            this.$message.error(message);
          }

          
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.yzmBtn {
  position: absolute;
  //   right: 0;
  //   top: 33px;
  width: 120px;
  height: 46px;
  border-radius: 0px 10px 10px 0px;
  background: rgba($color: #0d0d0d, $alpha: 0.06);
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba($color: #0d0d0d, $alpha: 0.36);
  line-height: 46px;
  text-align: center;
  cursor: pointer;
}
.clickable {
  background:  #0e67ff;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: #ffffff;
}
</style>
