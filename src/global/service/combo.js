import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const comboService = {
  all: function () {
    return axios.get(api.combo)
  },
  add: function (params) {
    return axios.post(api.combo, params)
  },
  show: function (id, params) {
    return axios.get(api.comboId(id))
  },
  edit: function (id, params) {
    return axios.put(api.comboId(id), params)
  },
  del: function (id) {
    return axios.delete(api.comboId(id))
  }
}
export default comboService
