// 三级分类全局组件的小仓库
import { defineStore } from 'pinia'
// 仓库名称
import { Names } from '@/store-namespaced'
// 分类api
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
// 返回结果的ts类型
import type { CategoryResponseData } from '@/api/product/attr/type'
// 仓库的state的返回值 ts类型
import type { CategoryState } from './type'

export const useCategoryStore = defineStore(Names.CATEGORY, {
  state: (): CategoryState => {
    return {
      // 一级分类的数据和id
      c1Arr: [],
      c1Id: '',
      // 二级分类的数据和id
      c2Arr: [],
      c2Id: '',
      // 三级分类的数据和id
      c3Arr: [],
      c3Id: '',
    }
  },
  getters: {},
  actions: {
    // 获取一级分类
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id)
      // console.log(result);
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    // 获取三级分类的数据
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },
  },
})
