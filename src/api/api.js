/* eslint-disable camelcase */
import axios from '@/api/http'

const baseURL_ERP = process.env.VUE_APP_API_URL_ERP // 导入http中创建的axios实例

const api = {
  // 获取学员列表
  getStudentList (params) {
    return axios.post(`${baseURL_ERP}/StudentApi/getStudentList`, params)
  },
  // 获取学员列表
  classroomNumList (params) {
    return axios.post(`${baseURL_ERP}/ClassroomNum/classroomNumList`, params)
  }
}

export default api
