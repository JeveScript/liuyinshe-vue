import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const userService = {
  all: function (data) {
    return axios.get(api.user, data)
  },
  add: function (params) {
    return axios.post(api.user, params)
  },
  show: function (id, params) {
    return axios.get(api.userId(id))
  },
  edit: function (id, params) {
    return axios.put(api.userId(id), params)
  },
  del: function (id, params) {
    return axios.delete(api.userId(id), params)
  },
  integral: function (type, data) {
    return axios.post(api.integral(type), data)
  },
  userAllPlan: function () {
    return axios.get(api.userPlan)
  },
  total: function (type, data) {
    return axios.post(api.total(type), data)
  },
  userAddPlan: function (data) {
    return axios.post(api.userPlan, data)
  },
  userIdAllPlan: function (id) {
    return axios.get(api.userPlanId(id))
  },
  delUserIdPlan: function (id) {
    return axios.delete(api.userPlanId(id))
  },
  addUserLesson: function (params) {
    return axios.post(api.userLesson, params)
  },
  endUserLessonID: function (id, params) {
    return axios.put(api.userLessonID(id), params)
  },
  allUserLessonID: function (id, params) {
    return axios.get(api.userLessonID(id))
  },
  paymentUser: function () {
    return axios.get(api.paymentUser)
  }
}
export default userService
