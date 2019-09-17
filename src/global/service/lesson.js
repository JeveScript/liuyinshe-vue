import request from "@/global/request/axios";
import API from "@/global/request/api";

const lessonService = {
  list: function(id, params) {
    return request.get(API.lessonItem(id), params);
  },
  status: function(id, params) {
    return request.post(API.lessonStatus(id), params);
  },
  callnow: function(id, params) {
    return request.post(API.lessonCallNow(id), params);
  },
  newDate: function() {
    return request.get(API.newDateLesson);
  }
};

export default lessonService;
