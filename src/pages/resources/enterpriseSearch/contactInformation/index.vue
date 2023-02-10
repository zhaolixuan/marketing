<template>
  <div class="contact">
      <table border="1" style="table-layout: fixed;" class="table">
         <tr>
           <td class="td">企业信息</td>
           <td class="tw">{{tableData.companyName ? tableData.companyName :'--'}}</td>
           <td class="td">联系人</td>
           <td class="tw">{{tableData.contacts ? tableData.contacts :'--'}}</td>
         </tr>
         <tr>
           <td class="td">数据来源</td>
           <td class="tw">{{tableData.dataSource ? tableData.dataSource :'--'}}</td>
           <td class="td">电话</td>
           <td class="tw">{{tableData.phone ? tableData.phone :'--' }}</td>
         </tr>
         <tr>
           <td class="td">传真</td>
           <td class="tw">{{tableData.faxes ? tableData.faxes :'--'}}</td>
           <td class="td">E-Mail</td>
           <td class="tw">{{tableData.email ? tableData.email :'--'}}</td>
         </tr>
         <tr>
           <td class="td">网站</td>
           <td class="tw">{{tableData.website ? tableData.website :'--'}}</td>
           <td class="td">地址</td>
           <td class="tw">{{tableData.address ? tableData.address :'--'}}</td>
         </tr>
      </table>
  </div>
</template>

<script>
import api from '@/api/resources'
export default {
  data () {
    return {
      tableData: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      const params = {
        search_EQ_companyId: this.$route.query.id
      }
      api.getContact(params).then(res => {
        this.tableData = res.data.rows[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  background: rgba(75, 182, 255, 0.05);
  //height: 400px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 72px;
  box-sizing: border-box;
  background: #fff;
  .table{
    height: 197px;
    border-radius: 12px !important;
    border: 1px solid rgba(13, 13, 13, 0.08);
    border-bottom: none
  }
  table{
    width: 100%;
    tr{
      border-bottom: 1px solid rgba(13, 13, 13, 0.08)
    }
    td{
      padding: 8px;
      box-sizing: border-box;
      font-size: 15px;
      line-height: 1.5;
      font-weight: 500;
      color: #0D0D0D;
      vertical-align: middle;
    }
    .td {
      width: 128px;
      min-height: 48px;
      background: rgba(247,248,250,1);
      text-align: center;
       font-weight: 600;
    }
    .tw {
      width: 400px;
      word-break: break-all;
    }
  }
}
</style>
