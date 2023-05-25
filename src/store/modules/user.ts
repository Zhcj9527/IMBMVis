// 创建用户仓库
import { defineStore } from 'pinia'
// 引入用户仓库的name
import { Names } from '@/store-namespaced'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'

export const useUserStore = defineStore(Names.USER, {
  state: () => {
    return {
      token: <string>localStorage.getItem('TOKEN'), // 用户唯一标识
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
        // this.token = result.data.token
        // token持久化
        localStorage.setItem('TOKEN', result.data.token)
        // 返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
})
