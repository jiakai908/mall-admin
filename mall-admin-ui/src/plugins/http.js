import axios from 'axios'

const HttpServer = {}

HttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

  // 设置拦截器
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      const AUTH_TOKEN = sessionStorage.getItem('token')
      config.headers.Authorization = AUTH_TOKEN
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default HttpServer
