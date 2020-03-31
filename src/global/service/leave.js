import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const leaveService = {
  all: function () {
    return axios.get(api.leave)
  },
  edit: function (params) {
    return axios.put(api.leave, params)
  }
}
export default leaveService
