import axios from '@/global/request/axios.js'
import api from '@/global/request/api.js'

const paymentService = {
  all: function (params) {
    return axios.get(api.payment, params)
  }
}
export default paymentService
