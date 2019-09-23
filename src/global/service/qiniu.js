import request from "@/global/request/axios";
import API from "@/global/request/api";

const teacherService = {
  getToken: function() {
    return request.get(API.qiniuToken);
  }
};

export default teacherService;
