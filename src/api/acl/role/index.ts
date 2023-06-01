// 角色管理
import request from "@/utils/request";
// ts type
import type { AllRoleResponseData, RoleData } from './type'
// 枚举地址
enum API {
  // 获取全部职位的接口 get
  ALLROLE_URL = '/admin/acl/role/',
  // 新增role post
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新role  put
  UPDATE_URL = '/admin/acl/role/update',
}

// 获取全部职位 {page}/{limit}
export const reqAllRole = (page: number, limit: number, roleName: string) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`)
// 添加|更新职位role
export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    // update
    return request.put<any,any>(API.UPDATE_URL, data)
  } else {
    // add
    return request.post<any,any>(API.ADDROLE_URL, data)
  }
}












