// 路由鉴权
import router from "@/router"
// 系统设置
import setting from './setting'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false });
// token
import pinia from './store'
import { useUserStore } from "./store/modules/user"
let userStore = useUserStore(pinia)
let token = userStore.token
let username = userStore.username
// 全局前置守卫   
// 访问某个路由之前触发
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}_${to.meta.title}`
  // to: 将要访问的路由对象
  // next() 放行函数
  nprogress.start()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (username) {
        next()
      } else {
        // 没有用户信息，需要发请求
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期|本地token被修改
          // 先删除token，退出登陆
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})