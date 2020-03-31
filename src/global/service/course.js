import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const courseService = {
  all: function () {
    return axios.get(api.course)
  },
  add: function (params) {
    return axios.post(api.course, params)
  },
  show: function (id, params) {
    return axios.get(api.courseId(id))
  },
  edit: function (id, params) {
    return axios.put(api.courseId(id), params)
  },
  del: function (id) {
    return axios.delete(api.courseId(id))
  }
}
export default courseService
