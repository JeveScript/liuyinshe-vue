import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const teacherService = {
  all: function (data) {
    return axios.get(api.teacher, data)
  },
  add: function (params) {
    return axios.post(api.teacher, params)
  },
  show: function (id, params) {
    return axios.get(api.teacherId(id))
  },
  edit: function (id, params) {
    return axios.put(api.teacherId(id), params)
  },
  del: function (id) {
    return axios.delete(api.teacherId(id))
  }
}
export default teacherService
