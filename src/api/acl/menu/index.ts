// 菜单管理模块
import request from '@/utils/request'
// ts type
import type { PermissionResponseData, MenuData } from './type'

// 枚举地址
enum API {
  // 获取全部菜单|按钮数据 get
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 新增子菜单 post
  ADDMENU_URL = '/admin/acl/permission/save',
  // 更新子菜单 put
  UPDATEMENU_URL = '/admin/acl/permission/update',
  // 删除已有的菜单
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}

// 获取全部菜单|按钮数据 get
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
// 添加与更新菜单
export const reqAddOrUpdateMenu = (data: MenuData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
// 删除已有的菜单 {id}
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id)
