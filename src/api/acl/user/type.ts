// 返回数据的ts
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 用户账号ts
export interface User {
  id?: number
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




