// 创建用户仓库
import { defineStore } from 'pinia'
// 引入用户仓库的name
import { Names } from '@/store-namespaced'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入类型
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types'
// 引入token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由, 异步|任意路由
import { constantRoutes, asyncRoute, anyRoute } from '@/router/routes'
// 路由器
import router from '@/router'
// 引入深拷贝的方法
// @ts-ignore // 忽略一下
import cloneDeep from 'lodash/cloneDeep'

// 用于过滤当前用户展示的异步路由
const filterAsyncRoute = (asyncRoute: any, routes: any) => {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      // 子路由也是需要过滤的,秒啊
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

export const useUserStore = defineStore(Names.USER, {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
      menuRoutes: constantRoutes, // 仓库存储菜单的路由
      username: '',
      avatar: '',
      buttons: [], // 存储当前用户是否包含某个按钮的
    }
  },
  getters: {},
  actions: {
    // 用户登陆
    async userLogin(data: LoginForm) {
      let result: LoginResponseData = await reqLogin(data)
      // 成功--> token
      // 失败--> error.message
      // console.log(result)
      if (result.code === 200) {
        // this.token = result.data.token as string
        // token持久化
        SET_TOKEN(result.data)
        // 返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },

    // 获取用户信息
    async userInfo() {
      let result: UserInfoResponseData = await reqUserInfo()
      // console.log(result)
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        // 用户信息过滤成功，获取当前用户展示的异步路由
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        // 菜单的数据
        this.menuRoutes = [...constantRoutes, ...userAsyncRoute, ...anyRoute]
        // 目前路由器管理的只有常量路由：用户的异步路由以及任意路由要动态追加
        ;[...userAsyncRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        console.log(router.getRoutes())

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登陆
    async userLogout() {
      let result: any = await reqLogout()
      // console.log(result)
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
