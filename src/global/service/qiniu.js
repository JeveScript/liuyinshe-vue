import request from "@/global/request/axios";
import API from "@/global/request/api";

const teacherService = {
  getToken: function() {
    return request.get(API.qiniuToken);
  },
  setDate: function(file) {
    return new Promise((resolve, reject) => {
      this.getToken().then(qiniuGet => {
        const key = "zackfair/" + Date.now() + "_" + file.name;
        // 获取 TOKEN
        // let domain = qiniuGet.domain;
        let token = qiniuGet.uploadToken;
        let formData = new FormData();
        formData.append("file", file); // 文件
        formData.append("key", key); // 在七牛存储中的路径
        formData.append("token", token); // token
        request
          .post(API.QINIU_API, formData, {
            headers: { "Content-Type": "multiple/form-data" }
          })
          .then(res => {
            let imageUrl = "https://qiniu.zakesi.com/" + res.key;
            resolve(imageUrl);
          });
      });
    });
  }
};

export default teacherService;
