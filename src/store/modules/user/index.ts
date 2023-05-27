// 创建用户仓库
import { defineStore } from 'pinia'
// 引入用户仓库的name
import { Names } from '@/store-namespaced'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types'
// 引入token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import { constantRoutes } from '@/router/routes'

export const useUserStore = defineStore(Names.USER, {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
      menuRoutes: constantRoutes, // 仓库存储菜单的路由
      username: '',
      avatar: '',
    }
  },
  getters: {},
  actions: {
    // 用户登陆
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // 成功--> token
      // 失败--> error.message
      if (result.code === 200) {
        // this.token = result.data.token as string
        // token持久化
        SET_TOKEN(result.data.token!)
        // 返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },

    // 获取用户信息
    async userInfo() {
      let result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar

        return 'ok'
      } else {
        return new Error('failure')
      }
    },

    // 退出登陆
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
})
