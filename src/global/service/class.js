import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const classService = {
  all: function (params) {
    return axios.get(api.class, params)
  },
  add: function (params) {
    return axios.post(api.class, params)
  },
  show: function (id, params) {
    return axios.get(api.classId(id))
  },
  classReferShow: function (params) {
    return axios.post(api.classReferShow, params)
  }
}
export default classService
