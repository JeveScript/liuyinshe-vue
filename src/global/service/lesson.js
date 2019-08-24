import request from "@/global/request/axios";
import API from "@/global/request/api";

const lessonService = {
  list: function(id, params) {
    return request.get(API.lessonItem(id), params);
  }
};

export default lessonService;
