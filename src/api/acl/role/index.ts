// 角色管理
import request from '@/utils/request'
// ts type
import type { AllRoleResponseData, RoleData, MenuResponseData } from './type'
// 枚举地址
enum API {
  // 获取全部职位的接口 get
  ALLROLE_URL = '/admin/acl/role/',
  // 新增role post
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新role  put
  UPDATE_URL = '/admin/acl/role/update',
  // 获取全部的菜单与按钮的数据 get
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限 post
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  // 删除角色  delete
  REMOVEROLE_URL = '/admin/acl/role/remove/'
}

// 获取全部职位 {page}/{limit}
export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, AllRoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  )
// 添加|更新职位role
export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    // update
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    // add
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
// 获取全部的菜单与按钮的数据 {roleId}
export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
// 给相应的职位分配权限 post
export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
// 删除角色  {id}
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)



