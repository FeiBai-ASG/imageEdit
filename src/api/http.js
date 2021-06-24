/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64'

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    const newConfig = config
    if (config.url.indexOf('uploadFile') === -1) {
      for (const data in newConfig.data) {
        if ({}.hasOwnProperty.call(newConfig.data, data)) {
          newConfig.data[data] = Base64.encode(newConfig.data[data])
        }
      }
      newConfig.data = qs.stringify(newConfig.data)
    }
    return newConfig
  },
  (error) => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) =>
    res.status === 200 && res.data.code === 0
      ? Promise.resolve(res.data.data)
      : Promise.reject(res.data),
  // 请求失败
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response)
    }
  }
)

export default instance
