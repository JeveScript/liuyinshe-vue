import request from "@/global/request/axios";
import API from "@/global/request/api";

const classService = {
  create: function(params) {
    return request.post(API.class, params);
  },
  list: function(params) {
    return request.get(API.class, params);
  },
  delete: function(id) {
    return request.delete(API.classItem(id));
  },
  update: function(id, params) {
    return request.put(API.classItem(id), params);
  },
  show: function(id) {
    return request.get(API.classItem(id));
  },
  updateLesson: function(id, params) {
    return request.put(API.lessonItem(id), params);
  }
};

export default classService;
