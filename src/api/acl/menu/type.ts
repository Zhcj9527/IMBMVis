// 返回数据的ts
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 菜单|按钮数据ts类型
export interface Permission {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: null
  type: number
  status: null
  level: number
  children?: Permission[]
  select: boolean
}
// 菜单|按钮数据 返回数据ts
export interface PermissionResponseData extends ResponseData {
  data: Permission[]
}

// 添加与更新菜单 ts
export interface MenuData {
  id?: number
  code: string // 权限值
  level: number // 更新的是几级菜单
  name: string // 菜单名
  pid: number // 菜单的ID
}
