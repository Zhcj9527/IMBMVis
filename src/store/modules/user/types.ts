import type { RouteRecordRaw } from 'vue-router'

// user仓库state返回数据的ts类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string | null
  avatar: string | null
}
