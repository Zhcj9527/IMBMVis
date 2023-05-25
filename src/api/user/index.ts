/* 统一管理用户相关的api接口 */
import request from '@/utils/request'
import type { loginForm, loginResponseData, userInfoResponseData } from './type'

// 管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 对外暴露函数
// 登陆接口
export const reqLogin = (data: loginForm) =>
  request<any, loginResponseData>({ url: API.LOGIN_URL, method: 'post', data })
// 用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
