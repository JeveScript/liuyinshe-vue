import request from "@/global/request/axios";
import API from "@/global/request/api";

const noteService = {
  sendNote: function(params) {
    return request.post(API.note, params);
  },
  showNote: function(params) {
    return request.get(API.note, params);
  }
};

export default noteService;
