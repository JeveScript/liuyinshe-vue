import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const lessonService = {
  all: function (params) {
    return axios.get(api.lesson, params)
  },
  add: function (params) {
    return axios.post(api.lesson, params)
  },
  show: function (id) {
    return axios.get(api.lessonId(id))
  },
  edit: function (id, params) {
    return axios.put(api.lessonId(id), params)
  },
  del: function (id) {
    return axios.delete(api.lessonId(id))
  }
}
export default lessonService
