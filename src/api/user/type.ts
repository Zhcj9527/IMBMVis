// 登陆接口参数TS类型
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
  message: string
}

// 登陆接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

// 用户信息返回数据类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface User {
  checkUser: userInfo
}
export interface userInfoResponseData {
  code: number
  data: User
}
