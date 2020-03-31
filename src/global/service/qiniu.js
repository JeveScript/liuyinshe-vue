import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'
import * as qiniu from 'qiniu-js'
const qiniuService = {
  getToken () {
    return axios.get(api.qiniuToken)
  },
  setDate: function (file) {
    return new Promise((resolve, reject) => {
      this.getToken().then(qiniuGet => {
        const key = Date.now() + '_' + file.name
        // 获取 TOKEN
        let token = qiniuGet.uploadToken
        let domainName = qiniuGet.domain
        var config = {
          useCdnDomain: true,
          region: null
        }
        var putExtra = {
          fname: '',
          params: {},
          mimeType: ['image/jpeg', 'image/png']
        }
        var observable = qiniu.upload(file, key, token, putExtra, config)
        observable.subscribe({
          next () {
            // 上传中的操作
            // console.log('已上传大小，单位为字节：' + res.total.loaded)
            // console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
            // console.log('当前上传进度，范围：0～100：' + res.total.percent)
          },
          error () {
            // 上传失败后的操作
            // console.log(err.code)
            // console.log(err.message)
            // console.log(err.isRequestError)
            // console.log(err.reqId)
          },
          complete (res) {
            // 完成后的操作
            // 上传成功以后会返回key 和 hash  key就是文件名了！
            // console.log(res)
            let imageUrl = domainName + '/' + res.key
            resolve(imageUrl)
          }
        })
      })
    })
  }
}
export default qiniuService
