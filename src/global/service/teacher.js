import request from "@/global/request/axios";
import API from "@/global/request/api";

const teacherService = {
  create: function(params) {
    return request.post(API.teacher, params);
  },
  list: function(params) {
    return request.get(API.teacher, params);
  },
  show: function(id) {
    return request.get(API.teacherShow(id));
  },
  edit: function(id, params) {
    return request.put(API.teacherShow(id), params);
  }
};

export default teacherService;
