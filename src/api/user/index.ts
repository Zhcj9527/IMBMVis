/* 统一管理用户相关的api接口 */
import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserInfoResponseData } from './type'

// 管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 对外暴露函数
// 登陆接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)
// 用户信息
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)
// 退出登陆
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
