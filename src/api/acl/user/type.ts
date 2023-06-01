// 返回数据的ts
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 用户账号ts
export interface User {
  id?: number | string
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
// 获取全部用户信息返回数据ts
export interface UserResponseData extends ResponseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    pages: number
  }
}

// role的ts
export interface RoleData {
  id?: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
// 获取全部职位以及当前账号有的职位 返回数据ts
export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: RoleData[]
    allRolesList: RoleData[]
  }
}

// 给已有的用户分配角色,data的ts
export interface UserRoleData {
  roleIdList: number[]
  userId: number
}


