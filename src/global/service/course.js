import request from "@/global/request/axios";
import API from "@/global/request/api";

const courseService = {
  create: function(params) {
    return request.post(API.course, params);
  },
  list: function(params) {
    return request.get(API.course, params);
  },
  delete: function(id) {
    return request.delete(API.courseItem(id));
  },
  update: function(id, params) {
    return request.put(API.courseItem(id), params);
  },
  show: function(id) {
    return request.get(API.courseItem(id));
  }
};

export default courseService;
