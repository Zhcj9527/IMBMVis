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
// 全部职位的接口 返回数据的tx
export interface AllRoleResponseData extends ResponseData {
  data: {
    records: RoleData[]
    total: number
    size: number
    current: number
    pages: number
    "orders": [],
    "optimizeCountSql": boolean,
    "hitCount": boolean,
    "countId": null,
    "maxLimit": null,
    "searchCount": boolean,
  }
}