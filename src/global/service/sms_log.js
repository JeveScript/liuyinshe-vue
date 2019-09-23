import request from "@/global/request/axios";
import API from "@/global/request/api";

const sms_logService = {
  sendSms_log: function(params) {
    return request.post(API.sms_log, params);
  },
  showSms_log: function(params) {
    return request.get(API.sms_log, params);
  }
};

export default sms_logService;
