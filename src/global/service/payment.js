import request from "@/global/request/axios";
import API from "@/global/request/api";

const paymentService = {
  create: function(params) {
    return request.post(API.payment, params);
  },
  list: function(params) {
    console.log(params);
    return request.get(API.payment, params);
  }
};

export default paymentService;
