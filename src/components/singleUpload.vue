<template> 
  <div>
     <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :data="dataObj"
      list-type="picture-card"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
    >
      <i class="el-icon-circle-plus"></i>
      <div class="el-upload__text">
        <div>点击上传</div>
        <div>支持JPG、PNG格式</div>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        uploadUrl:'',
      };
    },
    mounted() {
      const uploadUrl = 'https://ic.jdcloud.com/ic-file-server/keeUploadFile/add?tid=2018120510533872160-CSY&token=';
      this.uploadUrl = uploadUrl + localStorage.token;
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        const imgTypes = ["image/jpeg", "image/jpg", "image/png"];
        const isImage = imgTypes.includes(file.type);
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isImage) {
          this.$message.error("上传图片只能是 JPEG, JPG, PNG 格式!");
        }
        if (!isLt5M) {
          this.$message.error("上传图片大小不能超过 5MB!");
        }
        return isImage && isLt5M;
      },
      handleUploadSuccess(res, file) {
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: 'http://cools.qctt.cn/1641631653582?imageView2/1/w/2000/h/1000'});
        // this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
        this.emitInput(this.fileList[0].url);
      }
    }
  }
</script>
<style  lang="scss" scoped>
  .upload-demo{
    width: 158px;
    height: 88px;
    border-radius: 10px;
    border: none;
    float: left;
    ::v-deep .el-upload{
      line-height: 17px;
    }
    ::v-deep .el-upload-list--picture-card .el-upload-list__item{
      width: 100%;
      height: 100%;
    }
    .el-upload--picture-card{
      .el-icon-circle-plus{
        font-size: 24px;
        color: rgba($color: #0E67FF, $alpha: 0.68);
        margin: 0 0 6px;
      }
    }
    ::v-deep .el-upload--picture-card{
      width: 158px;
      height: 88px;
      background-color: rgba(13,13,13,0.06);
      border-radius: 10px;
      padding: 13px 0 0;
    }
    .el-upload--picture-card .el-upload__text{
      line-height: 17px;
      font-size: 12px;
      color: rgba($color: #0d0d0d, $alpha: 0.36);
    }
  }
</style>


