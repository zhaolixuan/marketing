
<template>
  <div class="popup">
    <!-- 预约弹框 -->
    <el-dialog
      :show-close="false"
      center
      title="专家预约"
      :visible.sync="dialogFormVisible"
      @close="getClose"
    >
      <div class="content">
        <p>公司名称</p>
        <span>{{detailObj.companyName}}</span>
      </div>
      <div class="content">
        <p>预约专家姓名</p>
        <span>{{detailObj.expertsName}}</span>
      </div>
      <div class="content">
        <p>联系人姓名</p>
        <span>{{detailObj.contactName}}</span>
      </div>
      <div class="content">
        <p>电话</p>
        <span>{{detailObj.phone}}</span>
      </div>
      <div class="content">
        <p>邮箱</p>
        <span>{{detailObj.mail}}</span>
      </div>
      <div class="content">
        <p>座机电话</p>
        <span>{{detailObj.telephone}}</span>
      </div>
      <div class="content" style="height:100%">
        <p>问题诉求</p>
        <ul>
          <li v-for="(item,index) in probleList" :key="index">
            <span>{{item.type}}</span>
            <div>{{item.createTime | hendelDate}}</div>
            <p>{{item.replyContent}}</p>
          </li>
        </ul>
      </div>
      <div class="content">
        <p></p>
        <el-input
          :autosize="{ minRows: 4, maxRows: 6}"
          type="textarea"
          v-model="replyContent"
          placeholder="请输入问题诉求"
          autocomplete="off"
          style="flex:1;"
        ></el-input>
      </div>
      <div slot="title" class="header-title">
        <div style="padding:15px 20px;">专家预约</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getClose">取 消</el-button>
        <el-button type="primary" @click="getSubmit('form')">回 复</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/cyzjApi";
import { getInfoDetail } from "@/api/userCenter";
import { formatDate } from "@/common/util";
export default {
  data() {
    return {
      dialogFormVisible: false,
      replyContent: "",
      detailObj: {},
      detailId: "",
      probleList: []
    };
  },
  props: {
    formShow: {
      type: Boolean
    },
    id: {
      type: String
    }
  },
  filters: {
    hendelDate(time) {
      return formatDate(time, "yyyy-MM-dd hh:mm:ss");
      this.$forceUpdate();
    }
  },
  mounted() {
    this.dialogFormVisible = this.formShow;
    this.detailId = this.id;
    getInfoDetail({
      id: this.detailId
    }).then(res => {
      if (res.status == 200) {
        this.detailObj = res.data.retData.expertsAppointment;
        this.probleList = res.data.retData.replyContentList;
      }
    });
  },
  methods: {
    getClose() {
      this.$emit("close", false);
      this.dialogFormVisible = false;
    },
    getSubmit() {
      if (this.replyContent == "") {
        this.$message.error("问题诉求不能为空");
        return;
      } else if (this.replyContent.length <= 5) {
        this.$message.error("问题诉求内容过短");
        return;
      } else {
        var form = {
          expertsId: this.detailObj.expertsId,
          expertsName: this.detailObj.expertsName,
          companyName: this.detailObj.companyName,
          contactName: this.detailObj.contactName,
          phone: this.detailObj.phone,
          telephone: this.detailObj.telephone,
          mail: this.detailObj.mail,
          problemDemands: this.detailObj.problemDemands,
          replyContent: this.replyContent,
          id: this.detailId
        };
        api.getExpertsAppointment(form).then(res => {
          if (res.status == 200) {
            this.getClose();
            this.$message({
              message: "回复成功！",
              type: "success"
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  ::v-deep .el-dialog__wrapper {
    .el-dialog {
      width: 639px;
      background: #ffffff;
      box-shadow: 0px 8px 20px 12px rgba(31, 38, 50, 0.04);
      border-radius: 12px;
      .el-dialog__header {
        padding: 0 !important;
      }
      .header-title {
        height: 48px;
        background: #ecf3fe;
        border-radius: 12px 12px 0px 0px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(0, 0, 0, 0.6);
      }
      .content {
        display: flex;
        height: 40px;
        line-height: 40px;
        p {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 500;
          color: #0d0d0d;
          width: 120px;
        }
        span {
          flex: 1;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
        }
        ul {
          flex: 1;
          li {
            div {
              height: 22px;
              line-height: 22px;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: 600;
              color: #000000;
            }
            p {
              width: 100%;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #0d0d0d;
            }
          }
        }
      }
      .dialog-footer {
        margin-top: 30px;
        text-align: right;
      }
    }
  }
}
</style>
