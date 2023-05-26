import { defineStore } from 'pinia'
// 引入用户仓库的name
import { Names } from '@/store-namespaced'

import type { SettingStore } from './type'

export const useSettingStore = defineStore(Names.SETTING, {
  state: (): SettingStore => {
    return {
      isExpand: false
    }
  },
  getters:{},
  actions:{}
})





