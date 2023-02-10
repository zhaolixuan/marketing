<template>
  <div class="enterprise-search">
    <div class="container">
      <div class="box">
        <div class="filter">
          <div class="filt m_l">
            <p>企业类型:</p>
            <p class="m_r">采购商</p>
            <p>贸易商品品类/HS编码</p>
            <el-select v-model="hsEncod" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <div class="country">
        <ul>
          <li>
            <div class="item-div">
              <p class="continents">企业所在国家：</p>
              <div class="list-div">
                <ul>
                  <li
                    :class="{
                      checked: parent === '企业所在国家',
                    }"
                    @click="changeCountry('企业所在国家', '')"
                  >全部({{ totalCorpNum }}家)</li>
                </ul>
              </div>
            </div>
          </li>
          <li v-for="item in countryList" :key="item.id">
            <div class="item-div">
              <p class="continents">{{ item.name }}：</p>
              <div class="list-div">
                <ul>
                  <li
                    v-for="(item1, index1) in item.children"
                    :key="item.id + '-' + index1"
                    @click="changeCountry(item.name, item1.name)"
                    :class="{
                      checked: parent === item.name && country === item1.name,
                    }"
                  >{{ item1.name }} ({{ item1.num }}家)</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="enterprise">
        <el-table
          :data="tableData"
          class="table"
          stripe
          :default-sort="{ prop: 'countDealNum', order: 'descending' }"
          :row-class-name="tableRowClassName"
          style="width:100%"
        >
          <el-table-column label="序号" width="80px" align="center">
            <template slot-scope="scope">{{ (currentPage - 1) * 10 + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="purCompany"
            label="企业名称"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column prop="country" label="国籍" align="center"></el-table-column>
          <el-table-column prop="countDealNum" label="总交易次数" sortable align="center"></el-table-column>
          <el-table-column prop="yearDealNum" label="近一年交易次数" sortable align="center"></el-table-column>
          <el-table-column prop="lastDealTime" label="最近交易时间" sortable align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <tableBtn :text="'查看详情'" :color="'#0E67FF'" @click.native="viewDetails(scope.row)"></tableBtn>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <Pagination
            v-if="tableData.length > 0"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :pageSize="pageSize"
            @handleCurrentChangeSub="handleCurrentChangeFun"
            class="pagina"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/resources";
import tableBtn from "../components/common/tableBtn.vue";
import Pagination from "../components/common/Pagination.vue";
export default {
  name: "enterpriseSearch",
  components: {
    tableBtn,
    Pagination
  },
  data() {
    return {
      hsEncod: "其他阀门/HS84818040",
      options: [{ name: "其他阀门/HS84818040", id: 1 }],
      countryList: [
        {
          id: 4,
          name: "南美洲",
          children: [
            { name: "哥伦比亚", num: 8 },
            { name: "厄瓜多尔", num: 6 },
            { name: "委内瑞拉", num: 5 },
            { name: "阿根廷", num: 3 },
            { name: "秘鲁", num: 3 },
            { name: "智利", num: 1 },
          ]
        },
        {
          id: 1,
          name: "欧洲",
          children: [
            { name: "英国", num: 8 },
            { name: "意大利", num: 1 },
            { name: "乌克兰", num: 1 }
          ]
        },
        {
          id: 3,
          name: "亚洲",
          children: [
            { name: "韩国", num: 6 },
            { name: "印度", num: 2 }
          ]
        },
        {
          id: 2,
          name: "北美洲",
          children: [
            { name: "美国", num: 4 },
            { name: "加拿大", num: 2 }
          ]
        }
      ],
      totalCorpNum: 50,
      tableData: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: 10,
      isShow: false,
      parent: "企业所在国家",
      country: ""
    };
  },
  methods: {
    // 企业列表
    getData() {
      const params = {
        page: this.currentPage,
        rows: this.pageSize,
        search_EQ_hsEncod: "84818040",
        search_EQ_country: this.country
      };
      api.getEnterpriseList(params).then(res => {
        this.tableData = res.data.rows;
        this.totalCount = Number(res.data.total);
      });
    },
    // 国家列表
    getCountryList() {
      api.getCountryList().then(res => {
        if (res.code === 200) {
          this.countryList = res.data.data;
        }
      });
    },
    // 查询
    search() {
      this.currentPage = 1;
      this.getData();
    },
    // 查看详情
    viewDetails(row) {
      const token = window.localStorage.getItem("token");
      const routeData = this.$router.resolve({
        name: "procurementStatistics",
        query: {
          id: row.companyId,
          name: row.purCompany,
          token: token,
          active: "procurementStatistics"
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 按国家查询
    changeCountry(pName, cName) {
      this.parent = pName;
      this.country = cName;
      this.currentPage = 1;
      this.getData();
    },
    // 分页
    handleCurrentChangeFun(val) {
      this.currentPage = val;
      this.getData();
    },
    tableRowClassName(row) {
      if (row.rowIndex % 2 === 0) {
        return "row-default";
      } else {
        return "row-active";
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.enterprise-search {
  margin-top: 18px;
  box-sizing: border-box;
  min-height: 600px;
  .container {
    background: #ecf3fe;
    .box{
      background: #ffffff;
      .filter {
      display: flex;
      border-bottom: 1px solid rgba(13, 13, 13, 0.08);
      // justify-content: space-between;
      align-items: center;
      height: 64px;
      margin: 0 38px;
      .filt {
        display: flex;
        align-items: center;
      }
      .m_r {
        margin-right: 54px;
        color: rgba(14, 103, 255, 1);
        margin-right: 40px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #595959;
        line-height: 20px;
        margin-right: 17px;
      }
      .el-select {
        line-height: 40px;
      }
      ::v-deep .el-input__inner {
        width: 260px;
        height: 32px;
        border-radius: 0;
        border: 1px solid rgba(13, 13, 13, 0.16);
      }
      ::v-deep .el-input__suffix {
        display: flex;
        align-items: center;
      }
      .el-button {
        width: 80px;
        height: 32px;
        background: #0e67ff;
        border-radius: 0px;
        border: none;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        margin-left: 30px;
      }
    }
    }
    .country {
      margin-bottom: 16px;
      padding: 26px 74px 41px 38px;
      box-sizing: border-box;
      background: #ffffff;

      ul {
        li {
          .item-div {
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            .continents {
              flex: 0 0 98px;
              text-align: right;
              font-size: 14px;
              font-weight: 400;
              color: #595959;
              line-height: 20px;
              margin-right: 6px;
            }
            .list-div {
              width: 1100px;
              ul {
                li {
                  display: inline-block;
                  margin-right: 15px;
                  padding: 6px 12px;
                  font-size: 14px;
                  font-weight: 600;
                  color: #0d0d0d;
                  line-height: 20px;
                  cursor: pointer;
                  &.checked {
                    color: #ffffff;
                    background: rgba(14, 103, 255, 1);
                    border-image: linear-gradient(
                        180deg,
                        rgba(99, 156, 255, 1),
                        rgba(45, 164, 255, 1)
                      )
                      1 1;
                  }
                }
              }
            }
          }
        }
      }
    }
    .enterprise {
      margin-bottom: 20px;
      padding: 31px 41px 40px;
      background: rgba(255,255,255,1);
      box-shadow:  0 2px 40px 5px rgba(230,230,230,0.3);
      box-sizing: border-box;
      .table {
        margin: 19px 0 30px;
        border: 1px solid #F7F8FA;
        ::v-deep .el-table__header {
          tr {
            // background: rgba(14, 103, 255, 0.08);
            background: linear-gradient(90deg, rgba(0,123,255,1) 0%,rgba(2,70,208,1) 100%);
            th {
              padding: 0;
              background: rgba(14, 103, 255, 0.08);
            }
          }
          .cell {
            height: 48px;
            line-height: 48px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
          }
        }
        ::v-deep .el-table__body {
          tr {
            &.el-table__row {
              &.el-table__row--striped {
                background: rgba(247,248,250,1);
                td {
                background: rgba(247,248,250,1);
                }
              }
            }
            td {
              padding: 0;
              &.is-right {
                .cell {
                  padding-right: 34px;
                }
              }
            }
          }
          .cell {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: #0d0d0d;
          }
        }
      }
      .pagination {
        text-align: right;
        height: 32px;
        padding: 0;
        margin: 0;
        ::v-deep .el-pagination__total {
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
        }
        ::v-deep .btn-prev,
        ::v-deep .btn-next {
          height: 32px;
          border-radius: 0;
          border: 1px solid rgba(13, 13, 13, 0.08);
        }
        ::v-deep .el-pager {
          height: 32px;
        }
        ::v-deep .el-pagination__jump {
          margin: 0 20px;
          height: 32px;
          line-height: 32px;
        }
        ::v-deep .number {
          width: 32px;
          height: 32px;
          line-height: 32px;
          border-radius: 0;
          font-size: 14px;
          font-weight: 400;
          color: #0d0d0d;
          border-radius: 0 !important;
          border: 1px solid rgba(13, 13, 13, 0.08);
          &:not(.disabled) {
            &.active {
              color: #ffffff;
              background: #0e67ff;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-input__inner{
      border-radius: 0 !important;
}
::v-deep .el-table tbody tr:hover>td { background-color: transparent !important; }
</style>
