<template>
  <div class="policy-tabs">
    <div class="see-more" @click="handleMorePolicy">
      查看更多<i class="el-icon-arrow-right"></i>
    </div>
    <el-tabs v-model="policyType" @tab-click="handleClick">
      <el-tab-pane label="政策文件" name="zhnegcewenjian"></el-tab-pane>
      <el-tab-pane label="法律法规" name="falvfagui"></el-tab-pane>
      <el-tab-pane label="通知公告" name="tongzhigonggao"></el-tab-pane>
    </el-tabs>
    <div class="policy-tabs-content">
      <el-table :data="policyList" @row-click="handlePolicyDetail">
        <el-table-column
          label="政策名称"
          prop="title"
          width="240"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="发布单位"
          prop="createDepartment"
          width="210"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.createDepartment | defaultValue }}
          </template></el-table-column
        >
        <el-table-column
          label="发布时间"
          prop="issueTime"
          width="165"
          align="right"
        >
          <template slot-scope="scope">
            {{
              scope.row.issueTime | filterTime("YYYY年MM月DD日") | defaultValue
            }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { indexGetPolicyByType } from "@/api/hqzc.js";
export default {
  data() {
    return {
      // 政策类型
      policyType: "zhnegcewenjian",
      policyList: [],
    };
  },
  created() {
    this.indexGetPolicyByType(this.policyType);
  },
  methods: {
    //	政策文件/法律法规/通知公告/热门政策首页列表接口
    async indexGetPolicyByType(type) {
      const res = await indexGetPolicyByType({ type });
      this.policyList = res.data.retData;
    },
    // 查看更多
    handleMorePolicy() {
      const { href } = this.$router.resolve({
        path: "/cydn/hqzc/policyList",
        query: { policyType: this.policyType },
      });
      window.open(href, "_blank");
    },
    handleClick() {
      this.indexGetPolicyByType(this.policyType);
    },
    // 查看政策详情
    handlePolicyDetail(row) {
      const { href } = this.$router.resolve({
        path: "/cydn/policyDetails",
        query: {
          id: row.id,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.policy-tabs {
  position: relative;
  width: 710px;
  .see-more {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 18px;
    color: rgba(29, 29, 31, 0.8);
    letter-spacing: 0;
    font-weight: normal;
    cursor: pointer;
    z-index: 1;
    &:hover {
      color: #0e67ff;
    }
    .el-icon-arrow-right {
      display: inline-block;
      margin-left: 5px;
    }
  }
  ::v-deep .el-tabs__header {
    margin: 0 0 20px;
    line-height: 0;
  }
  ::v-deep .el-table__row {
    cursor: pointer;
  }
  ::v-deep .el-tabs__item {
    line-height: 1.2;
    font-size: 26px;
    font-weight: 600;
    color: rgba(29, 29, 31, 1);
    margin-bottom: 0;
    &.is-active,
    &:hover {
      color: rgba(2, 90, 229, 1);
    }
  }
  ::v-deep .el-tabs__active-bar {
    width: 142px;
    height: 4px;
    background-color: rgba(2, 90, 229, 1);
  }
  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
  .policy-tabs-content {
    padding: 28px 43px 48px 52px;
    width: 710px;
    height: 415px;
    background: #fff;
    box-shadow: 0 2px 40px 5px rgba(230, 230, 230, 0.3);
    box-sizing: border-box;
  }
}
::v-deep .el-table__header-wrapper {
  border-bottom: 1px solid rgba(219, 219, 219, 1);
  margin-bottom: 10px;
  .cell {
    font-size: 22px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }
}
::v-deep .el-table__body-wrapper {
  .cell {
    font-size: 14px;
    font-weight: normal;
    color: rgba(34, 34, 34, 1);
  }
}
::v-deep .el-table td.el-table__cell,
::v-deep .el-table th.el-table__cell.is-leaf {
  border: none;
}
::v-deep .el-table--border::after,
.el-table--group::after,
.el-table::before {
  display: none;
}
::v-deep .el-table__row {
  &:hover {
    .el-table__cell {
      .cell {
        color: #0e67ff;
      }
    }
  }
}
</style>
