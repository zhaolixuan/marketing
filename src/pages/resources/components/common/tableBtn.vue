<template>
  <div class="btn_box_pp" :class="{hover_change_color:hover_change_color,disabled: disabled}" :style="{color: color}">
    <div class="btn">
      <span class="text">{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableBtn',
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    text: {
      type: String,
      default: () => {
        return ''
      }
    },
    imgName: {
      type: String,
      default: () => {
        return ''
      }
    },
    color: {
      type: String,
      default: () => {
        return '#1D62D4'
      }
    },
    hover_change_color: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  cursor: not-allowed !important;
  color: #666666 !important;
  pointer-events: none;
}
.hover_change_color:hover {
  cursor: pointer;
}
.btn_box_pp {
  z-index: 999;
  display: inline-block;
  .btn {
    height: 20px;
    line-height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
  }
}
</style>
