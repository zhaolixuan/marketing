export default {
    baseUrl: (() => {
        return 'http://yuhuan-dev.xjoycity.com/cms-server'
    })(),
    imgurl: (() => {
        return 'http://yuhuan-dev.xjoycity.com/ic-file-server/api/fs/getById/'//查看地址
    })(),
    basePassPordUrl: (() => {
        return 'http://yuhuan-dev.xjoycity.com/ic-passport-web'//登录相关请求地址
    })(),
    imgUrlFile: 'http://yuhuan-dev.xjoycity.com/ic-file-server/keeUploadFile/add?tid=2018120510533872160-CSY&token=', //上传
    imgUrlFileInfo: 'http://yuhuan-dev.xjoycity.com/ic-file-server/keeUploadFile/getByIds?ids=', //文件信息查看
    fileUrl: "http://yuhuan-dev.xjoycity.com/ic-file-server/api/fs/getById?ids=", // 文件下载
}
