/* 进行axios二次封装：使用请求与响应拦截器 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步就是利用axios的create方，创建axios实例-->基础路径和超时时间
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,  // 基础路径上会携带/api
  // 发请求超时
  timeout: 5000,
})

// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 返回配置对象
  // config有headers属性请求头，经常给服务器端携带公共参数
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use((response) => {
  // 简化数据--> 成功的回调
  return response.data
}, (error) => {
  // 失败的回调：处理网络错误
  // 定义一个变量：存储网络错误信息
  let msg = ''
  // http状态码
  let status = error.response.status
  switch (status) {
    case 401:
      msg = "token过期";
      break;
    case 403:
      msg = '无权访问';
      break;
    case 404:
      msg = "请求地址错误";
      break;
    case 500:
      msg = "服务器出现问题";
      break;
    default:
      msg = "无网络";
  }
  // 提示错误信息
  ElMessage({
    type: 'error',
    message: msg
  })

  return Promise.reject(error)
})

// 对外暴露
export default request