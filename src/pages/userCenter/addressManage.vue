<template>
  <div class="addressManage">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        <el-breadcrumb-item class="diff">收货地址</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content_box">
      <h3 class="h3">收货地址</h3>
      <div class="btn_group">
        <el-button :disabled="batchAddress.length < 1" @click="batchDel">批量删除</el-button>
        <el-button @click="openDialog('add')">添加收货地址</el-button>
      </div>
      <el-table
        :data="addressList"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="headClass"
        :cell-style="cellClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="55"></el-table-column>
        <el-table-column prop="consignee" label="收货人" min-width="100" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="addressMap" label="所在地区" min-width="100" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="detailedAddress" label="详细地址" min-width="100" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="postcode" label="邮编" min-width="60" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="电话/手机" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{resetShowPhone(scope.row)}}
        </template>
        </el-table-column>
        <el-table-column label="操作" min-width="130" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="setDefault(scope.row)" v-if="!scope.row.defaultAddress">设为默认收货地址</el-button>
              <el-button type="text" v-else>默认地址</el-button>
              <el-button type="text" @click="openDialog('edit', scope.row)">修改</el-button>
              <el-button type="text" style="color: #929292;" @click="singleDel(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="total,prev, pager, next"
        style="text-align:right;margin-top:16px;"
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="收货地址" width="40%" :visible.sync="dialogFormVisible" @close="colseDialog" class="address_dialog">
      <el-form :model="addressForm" :rules="addressRules" ref="addressForm" label-width="100px" label-suffix=":" label-position="left">
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="addressForm.consignee"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" class="area-wrapper" required>
          <el-row :gutter="24">
            <el-col :span="7">
              <el-form-item prop="provinceId">
                <el-select v-model="addressForm.provinceId" placeholder="省份" @change="provinceChange" class="addr_input">
                  <el-option v-for="(item, index) in provinceList" :key="index+item.id" :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="cityId">
                <el-select v-model="addressForm.cityId" placeholder="城市" @change="cityChange" class="addr_input">
                  <el-option v-for="(item, index) in cityList" :key="index+item.id" :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="countyId">
                <el-select v-model="addressForm.countyId" placeholder="县区" @change="countyChange" class="addr_input">
                  <el-option v-for="(item, index) in countyList" :key="index + item.id" :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="addressForm.detailedAddress"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="addressForm.postcode"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addressForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="固定电话" class="telephone_input">
          <el-row :gutter="24">
            <el-col :span="5">
              <el-form-item prop="areaCode" class="item_input">
                <el-input placeholder="区号" maxlength="4" v-model="addressForm.areaCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="homeTelephone">
                <el-input placeholder="电话号码" maxlength="8" v-model="addressForm.homeTelephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="extensionNumder">
                <el-input placeholder="分机号" maxlength="5" v-model="addressForm.extensionNumder"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <div style="color: #929292;">手机和固定电话至少填一项</div>
        </el-form-item>
        <el-form-item prop="defaultAddress">
          <el-checkbox v-model="addressForm.defaultAddress">设置默认收货地址，</el-checkbox>
          <span style="color: #929292;">设置后系统在下单时自动选中该收货地址</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddress('addressForm')">保存</el-button>
        <el-button @click="colseDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {queryArea, setDefaultAddress, delAddress, queryAddress, saveAddress} from '@/api/userCenter'
  export default {
    name: 'addressManage',
    data() {
      const checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if(value) {
          setTimeout(() => {
            if(phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号码'))
            }
          })
        } else {
          callback()
        }
      }
      const checkZipCode = (rule, value, callback) => {
        const zipCodeReg = /^[1-9][0-9]{5}$/
        if(value) {
          setTimeout(() => {
            if(zipCodeReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮政编码'))
            }
          })
        } else {
          callback()
        }
      }
      const checkTele = (rule, value, callback) => {
        const teleReg = /^\d{7,8}$/
        if(value) {
          setTimeout(() => {
            if(teleReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的电话号码'))
            }
          })
        } else {
          callback()
        }
      }
      const checkAreaCode = (rule, value, callback) => {
        const areaCodeReg = /^\d{3,4}$/
        if(value) {
          setTimeout(() => {
            if(areaCodeReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的区号'))
            }
          })
        } else {
          callback()
        }
      }
      const checkFj = (rule, value, callback) => {
        const fjReg = /^\d{1,5}$/
        if(value) {
          setTimeout(() => {
            if(fjReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的分机号'))
            }
          })
        } else {
          callback()
        }
      }
      return {
        loading: false,
        total: 0,
        curPage: 1,
        pageSize: 10,
        addressList: [],
        provinceList: [],
        cityList: [],
        countyList: [],
        batchAddress: [],
        dialogFormVisible: false,
        saveType: null,
        addressForm: {
          consignee: '',
          provinceId: '',
          placeRegion: '',
          cityId: '',
          countyId: '',
          detailedAddress: '',
          postcode: '',
          phone: '',
          areaCode: '',
          homeTelephone: '',
          extensionNumder: '',
          defaultAddress: ''
        },
        addressRules: {
          provinceId: [{ required: true, trigger: 'change', message: '请选择省' }],
          cityId: [{ required: true, trigger: 'change', message: '请选择市' }],
          countyId: [{ required: true, trigger: 'change', message: '请选择县' }],
          consignee: [{ required: true, trigger: 'blur', message: '请输入收货人' }],
          detailedAddress: [{ required: true, trigger: 'blur', message: '请输入详细地址' }],
          postcode: [
            { validator: checkZipCode, trigger: 'blur' }
          ],
          phone: [
            { required: false, trigger: 'blur', message: '请输入手机号码' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          areaCode: [
            { required: false, trigger: 'blur', message: '请输入区号' },
            { validator: checkAreaCode, trigger: 'blur' }
          ],
          homeTelephone: [
            { required: false, trigger: 'blur', message: '请输入电话号码' },
            { validator: checkTele, trigger: 'blur' }
          ],
          extensionNumder: [
            { required: false, trigger: 'blur', message: '请输入分机号' },
            { validator: checkFj, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getAreaData()
      this.getAddressList()
    },
    methods: {
      indexMethod(index) {
        index = (index + 1) + (this.curPage - 1) * this.pageSize
        return index
      },
      delClose(){
        this.$router.push({
          path:"/cydn/userCenter/userInfo"
        })
      },
      resetShowPhone(row){
        let phone = row.phone || ''
        let areaCode = row.areaCode || ''
        let homeTelephone = row.homeTelephone || ''
        let extensionNumder = row.extensionNumder || ''
        return `${phone} ${(areaCode || homeTelephone || extensionNumder) && phone ? '/' : ''} ${areaCode} ${homeTelephone} ${extensionNumder}`
      },
      // 表格批量勾选
      handleSelectionChange(val) {
        this.batchAddress = val
      },
      // 设置默认地址r
      setDefault(row) {
        this.$confirm('此操作将该地址设置为默认收货地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }
          setDefaultAddress(params).then(res => {
            if(res.data.success) {
              this.$message({
                type: 'success',
                message: '设置成功!'
              });
              this.getAddressList()
            } else {
              this.$message.error(res.data.message);
            }
          })
        })
      },
      // 单个删除
      singleDel(row) {
        this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delAddress(row.id)
        })
      },
      // 删除地址
      delAddress (ids) {
        let params = {
          ids: ids
        }
        delAddress(params).then(res => {
          if(res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAddressList()
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      openDialog(type, row) {
        this.dialogFormVisible = true
        this.saveType = type
        if(type === 'edit') {
          this.dialogFormVisible = true
          this.addressForm = JSON.parse(JSON.stringify(row))
          let addressMap = row.placeRegion.split(',')
          this.provinceChange(addressMap[0])
          this.cityChange(addressMap[1])
          this.countyChange(addressMap[2])
        }
      },
      // 关闭dialog
      colseDialog() {
        this.dialogFormVisible = false
        this.addressForm = {
          consignee: '',
          provinceId: '',
          placeRegion: '',
          cityId: '',
          countyId: '',
          detailedAddress: '',
          postcode: '',
          phone: '',
          areaCode: '',
          homeTelephone: '',
          extensionNumder: '',
          defaultAddress: ''
        }
        this.$refs.addressForm.resetFields();
      },
      // 批量删除
      batchDel() {
        this.$confirm('此操作将批量删除表格中已勾选的地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let resultArr = []
          this.batchAddress.forEach(item => {
            resultArr.push(item.id)
          })
          let resultStr = resultArr.join(',')
          this.delAddress(resultStr)
        })
      },
      // 新增/编辑 的保存操作
      saveAddress (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addressForm.phone || this.addressForm.homeTelephone) {
              if(this.saveType === 'add') {
                delete this.addressForm.id
              }
              this.addressForm.placeRegion = `${this.addressForm.provinceId},${this.addressForm.cityId},${this.addressForm.countyId}`
              saveAddress(this.addressForm).then(res => {
                if(res.data.success) {
                  this.colseDialog()
                  this.getAddressList()
                }
              })
            } else {
              this.$message.error('手机和固定电话至少填一项');
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.curPage = val;
        this.getAddressList();
      },
      // 获取收货地址数据
      getAddressList() {
        let params = {
          page: this.curPage,
          rows: this.pageSize
        }
        queryAddress(params).then(res => {
          if(res.data.rows) {
            // this.addressList = res.data.rows
            this.$set(this, 'addressList', res.data.rows)
            this.total = Number(res.data.total)
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      getAreaData () {
        queryArea().then(res => {
          if(res.data.success) {
            this.provinceList = res.data.retData
          }
        })
      },
      provinceChange (e) {
        this.$set(this.addressForm, 'cityId', '')
        this.$set(this.addressForm, 'countyId', '')
        this.$set(this.addressForm, 'cityName', '')
        this.$set(this.addressForm, 'countyName', '')
        this.provinceList.forEach(item => {
          if (item.id === e) {
            this.addressForm.provinceName = item.name
            this.addressForm.provinceId = e
            this.cityList = item.children
            return false
          }
        })
      },
      cityChange (e) {
        this.$set(this.addressForm, 'countyId', '')
        this.$set(this.addressForm, 'countyName', '')
        this.cityList.forEach(item => {
          if (item.id === e) {
            this.addressForm.cityName = item.name
            this.addressForm.cityId = e
            this.countyList = item.children
            return false
          }
        })
      },
      countyChange (e) {
        this.countyList.forEach(item => {
          if (item.id === e) {
            this.addressForm.countyName = item.name
            this.addressForm.countyId = e
            return false
          }
        })
      },
       // 表头
      headClass(){
        return "background: #F7F8FA;color: #595959;fontSize:14px;text-align: center;"
      },
      //表格居中
      cellClass() {
        return "text-align: center;";
      },
    }
  }
</script>

<style lang="scss" scoped>
.el-table {
  border: 1px solid #F0F0F0FF;
  border-radius: 10px;
}
::v-deep .el-table tr{
    color: #0D0D0D;
}
::v-deep .el-button--text{
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #0078E3;
}
h3 {
  padding-bottom: 20px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: 600;
  color: #0d0d0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-error{
    font-size: 25px;
    cursor: pointer;
    color: #999;
  }
}
.bread{
    ::v-deep .is-link {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #929292;
  }
  ::v-deep .diff {
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
    color: #0d0d0d;
    .el-breadcrumb__inner {
      font-weight: 600;
    }
  }
}
.content_box {
  width: 100%;
  background: #FFFFFF;
  margin-top: 15px;
  border-radius: 10px;
  padding: 23px 31px 30px 29px;
  box-sizing: border-box;
  .btn_group {
    padding-bottom: 20px;
    .el-button {
      width: 100px;
      height: 40px;
      color:#0078E3;
      border-radius: 8px;
      border: 1px solid #0078E3;
    }
    ::v-deep .el-button:focus, .el-button:hover {
        color: #0078E3;
        border-color: none;
        background-color: #ffffff;
    }
  }
  .h3{
    font-size: 20px;
    font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
    font-weight: 600;
    color: #0D0D0D;
  }
  .pagination{
    margin-top: 30px;
    ::v-deep .btn-prev{
      border-radius: 8px;
    }
    ::v-deep .btn-next{
      border-radius: 8px;
    }
    ::v-deep .el-pager li{
      border-radius: 8px;
    }
    
  }
}
.area-wrapper {
  .el-col {
    width: 32%;
    padding-left: 0 !important;
    padding-right: 10px!important;
    &:last-child {
      padding-right: 0!important;
    } 
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0 !important;
  }
}
.telephone_input {
  .el-form-item__content {
    .el-row {
      .el-col {
        padding-left: 0!important;
        padding-right: 10px!important;
        &:last-child {
          padding-right: 0!important;
        } 
      }
    }
  }
}
.address_dialog {
  ::v-deep .el-dialog__header{
    padding: 14px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #F0F0F0FF;
  }
  ::v-deep .el-dialog__title{
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #0D0D0D;
  }
  ::v-deep .el-dialog__headerbtn{
    top: 17px;
  }
  ::v-deep .el-dialog__headerbtn .el-dialog__close{
    color: #929292FF;
  }
  ::v-deep .el-dialog__body {
    box-sizing: border-box;
    padding: 20px 80px 0;
  }
  ::v-deep .el-form-item__label{
    color: #595959;
  }
  ::v-deep .el-form--label-left .el-form-item__label{
    text-align: right;
  }
  ::v-deep .el-dialog__footer {
    border-top: 1px solid #F0F0F0FF;
    padding: 16px 30px 20px;
    text-align: center;
  }
  ::v-deep .el-button{
    width: 144px;
    height: 40px;
    border-radius: 8px;
    color: #0078E3;
    font-size: 16px;
    border-color: #0078E3FF;

  }
  ::v-deep .el-button--primary {
      color: #FFF;
      background-color: #0078E3FF;
      border-color: #0078E3FF;
      margin-right: 10px;
  }
  ::v-deep .el-button--default:focus,
  ::v-deep .el-button--default:hover {
    background-color: #ffffff;
  }
  ::v-deep .el-input__inner{
    height: 40px;
    line-height: 40px;
  }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0078E3FF!important;
    color: #FFF;
}
::v-deep .el-checkbox{
  color: #929292;
}
</style>
