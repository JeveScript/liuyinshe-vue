import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const comboPlanService = {
  all: function () {
    return axios.get(api.comboPlan)
  },
  add: function (params) {
    return axios.post(api.comboPlan, params)
  },
  show: function (id, params) {
    return axios.get(api.comboPlanId(id))
  },
  edit: function (id, params) {
    return axios.put(api.comboPlanId(id), params)
  },
  del: function (id) {
    return axios.delete(api.comboPlanId(id))
  }
}
export default comboPlanService
