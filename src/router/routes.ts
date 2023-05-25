import type { RouteRecordRaw } from 'vue-router'
// 配置常量路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    // 登陆
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    // 登陆成功以后展示数据的路由
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue'),
  },
  {
    // 404
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    // 任意路由，没找到以上页面，重定向到404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]
