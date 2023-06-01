// 用户管理模块
import request from '@/utils/request'
// ts type
import type { User, UserResponseData, RoleResponseData, UserRoleData } from './type'
// 枚举
enum API {
  // 获取全部已有账号信息 get
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新用户 post
  ADD_URL = '/admin/acl/user/save',
  // 更新用户 put
  UPDATE_URL = '/admin/acl/user/update',
  // 获取全部职位以及当前账号有的职位 get
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole'
}

// 获取全部用户信息 {page}/{limit}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
// 添加|修改用户
export const reqAddOrUpdate = (data: User) => {
  // 携带id
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_URL, data)
  }
}
// 获取全部职位以及当前账号有的职位  {adminId}
export const reqAllRole = (adminId: number) => request.get<any, RoleResponseData>(API.ALLROLE_URL + adminId)
// 给已有的用户分配角色
export const reqSetUserRole = (data: UserRoleData) => request.post<any, any>(API.SETROLE_URL, data)












