import request from "@/global/request/axios";
import API from "@/global/request/api";
import DataStore from "@/global/storage/index.js";

const managerService = {
  login: async function(params) {
    return request.post(API.authLogin, params).then(res => {
      DataStore.setToken(res.token);
      DataStore.setUser_name(res.userInfo.user_name);
      DataStore.setUser_id(res.userInfo.user_id);
    });
  },
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
