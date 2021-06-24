/* eslint-disable camelcase */
import axios from '@/api/http'

const baseURL_ERP = process.env.VUE_APP_API_URL_ERP
const baseURL_TMS = process.env.VUE_APP_API_URL_TMS

const api = {
  // 获取学员列表
  getStudentList (params) {
    return axios.post(`${baseURL_ERP}/StudentApi/getStudentList`, params)
  },
  // 获取教室号列表
  classroomNumList (params) {
    return axios.post(`${baseURL_ERP}/ClassroomNum/classroomNumList`, params)
  },

  // 获取老师信息
  // http://yapi.feibai.xyz/project/18/interface/api/551
  getTeacherInfoByid (params) {
    return axios.post(
      `${baseURL_ERP}/ExternalApiThird/getTeacherInfoByid`,
      params
    )
  },

  // 获取作业及订正信息
  getHomeworkRevisionForStu (params) {
    return axios.post(
      `${baseURL_TMS}/HomeworkRevision/getHomeworkRevisionForStu`,
      params
    )
  },
  // 获取作业及订正信息
  getHomeworkCorrectionForStu (params) {
    return axios.post(
      `${baseURL_TMS}/HomeworkRevision/getHomeworkCorrectionForStu`,
      params
    )
  }
}

export default api
