// 登陆接口参数TS类型
export interface LoginForm {
  username: string
  password: string
}

// 定义全部接口的返回数据的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 登陆接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}

// 获取用户信息返回数据的ts类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}
