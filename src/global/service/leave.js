import request from "@/global/request/axios";
import API from "@/global/request/api";

const leaveService = {
  index: function(params) {
    return request.get(API.leave, params);
  },
  update: function(id, params) {
    return request.put(API.leaveItem(id), params);
  }
};

export default leaveService;
