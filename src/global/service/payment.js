import request from "@/global/request/axios";
import API from "@/global/request/api";

const paymentService = {
  create: function(params) {
    return request.post(API.payment, params);
  },
  list: function(params) {
    return request.get(API.payment, params);
  },
  accounts: function(){
    return request.get(API.accounts);
  }
};

export default paymentService;
