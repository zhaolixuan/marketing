<template>
  <div class="footer">
    <div class="footer_in">
      <div>
        <h3>{{$config.footerTitle}}</h3>
      </div>
      <ul>
        <li>
          <h6>联系我们</h6>
          <!-- <p style="color: #FFC71F;"><span>联系电话</span> 0576-89915622</p> -->
          <p><span>联系电话</span> 0576-89915622</p>
          <p><span>邮政编码</span> 317699</p>
          <p><span>联系地址</span> 台州市玉环市S76与龙翔路交叉路口东</p>
        </li>
        <li>
          <h6>相关信息</h6>
          <p><span>主办单位</span> 浙江侠云科技有限公司</p>
          <p><span>ICP备案号</span> 京ICP备11041704号-37</p>
          <p><span>技术支持</span> 浙江智联工业互联网有限公司</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.footer {
  height: 240px;
  background: #202431;

  width: 100%;
  .footer_in {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 62px 0px;
    box-sizing: border-box;
    height: 240px;
    div {
      flex: 1;
      h3 {
        font-size: 25px;
        font-family: "Microsoft YaHei";
        font-weight: normal;
        color: #ffffff;
      }
    }
    ul {
      width: 590px;
      li {
        float: left;
        &:nth-child(2n) {
          float: right;
        }
        h6 {
          margin-bottom: 20px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.84);
        }
        p {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.68);
          margin-bottom: 9px;
          line-height: 22px;
          span {
            display: inline-block;
            width: 80px;
          }
        }
      }
    }
  }
}
</style>
