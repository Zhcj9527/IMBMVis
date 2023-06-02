// 返回数据的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// role数据ts
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
// 全部职位的接口 返回数据的ts
export interface AllRoleResponseData extends ResponseData {
  data: {
    records: RoleData[]
    total: number
    size: number
    current: number
    pages: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
  }
}

// 获取全部的菜单与按钮的数据ts
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: null
  type: number
  status: null
  level: null
  children?: MenuData[]
  select: boolean
}
// 全部菜单与按钮的数据 返回的数据
export interface MenuResponseData extends ResponseData {
  data: MenuData[]
}
