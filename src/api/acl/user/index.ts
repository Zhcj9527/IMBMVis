// 用户管理模块
import request from "@/utils/request";
// ts type
import type { User, UserResponseData } from "./type";
// 枚举
enum API {
  // 获取全部已有账号信息 get
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新用户 post
  ADD_URL = '/admin/acl/user/save',
  // 更新用户 put
  UPDATE_URL = '/admin/acl/user/update',
}

// 获取全部用户信息 {page}/{limit}
export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
// 添加|修改用户
export const reqAddOrUpdate = (data: User) => {
  // 携带id
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_URL, data)
  }
}










