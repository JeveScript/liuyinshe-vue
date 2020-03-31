import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'
import DataStore from '@/global/storage/index.js'
const managerService = {
  login: function (params) {
    return axios.post(api.Login, params).then(res => {
      DataStore.setToken(res.token)
      DataStore.setManagerName(res.manager_name)
      DataStore.setManagerId(res.manager_id)
      DataStore.setManagerStatus(res.manager_status)
    })
  },
  all: function () {
    return axios.get(api.manager)
  },
  add: function (params) {
    return axios.post(api.manager, params)
  },
  show: function (id, params) {
    return axios.get(api.managerId(id))
  },
  edit: function (id, params) {
    return axios.put(api.managerId(id), params)
  },
  del: function (id) {
    return axios.delete(api.managerId(id))
  }
}
export default managerService
