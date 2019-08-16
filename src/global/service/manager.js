import request from "@/global/request/axios";
import API from "@/global/request/api";

const managerService = {
  create: function(params) {
    return request.post(API.manager, params);
  },
  list: function() {
    return request.get(API.manager);
  },
  delete: function(id) {
    return request.delete(API.managerItem(id));
  },
  update: function(id, params) {
    return request.put(API.managerItem(id), params);
  },
  show: function(id) {
    return request.get(API.managerItem(id));
  }
};

export default managerService;
