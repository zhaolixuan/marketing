<template>
  <div class="pwdInput">
    <el-input
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="$emit('input', value)"
      auto-complete="new-password"
      @focus="focus"
      @blur="blur"
      :readonly="readonly"
      :type="type"
      ref="pwd"
    ></el-input>
    <img
      v-show="type == 'text'"
      src="@/static/images/pwd-show.png"
      @click="type = 'password'"
    />
    <img
      v-show="type == 'password'"
      src="@/static/images/pwd-hide.png"
      @click="type = 'text'"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      type: "password",
      readonly: true,
    };
  },
  watch: {
    value: function () {
      if (this.value === "") {
        this.readonly = true;
        this.focus(null);
      }
    },
  },
  methods: {
    focus(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setTimeout(() => {
        this.readonly = false;
      }, 100);
    },
    blur(e) {
      if (e) {
        e.stopPropagation();
      }
      this.readonly = true;
    },
  },
  mounted() {
    this.$refs.pwd.$refs.input.onmousedown = (e) => {
      //   if (e) {
      //     e.preventDefault();
      //     e.stopPropagation();
      //   }
      //|| this.readonly
      if (this.value === "") {
        this.$refs.pwd.$refs.input.blur();
        setTimeout(() => {
          this.$refs.pwd.$refs.input.focus();
        }, 0);
      }
      //   return false;
    };
  },
};
</script>
<style lang="scss" scoped>
.pwdInput {
  position: relative;
}
img {
  cursor: pointer;
  width: 20px;
  padding: 16px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.el-input__inner {
  padding-right: 60px;
}
</style>
