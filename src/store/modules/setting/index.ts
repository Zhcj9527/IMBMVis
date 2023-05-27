import { defineStore } from 'pinia'
// 引入用户仓库的name
import { Names } from '@/store-namespaced'

import type { SettingStore } from './type'

export const useSettingStore = defineStore(Names.SETTING, {
  state: (): SettingStore => {
    return {
      isExpand: false, // 控制菜单是否折叠
      refresh: false, // 用于控制刷新效果
    }
  },
  getters: {},
  actions: {},
})
