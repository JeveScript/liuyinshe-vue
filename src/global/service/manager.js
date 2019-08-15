import request from "@/global/request/axios";
import API from "@/global/request/api";

const managerService = {
  list: function() {
    return request.get(API.manager);
  }
};

export default managerService;
