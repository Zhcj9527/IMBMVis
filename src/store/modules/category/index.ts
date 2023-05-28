// 三级分类全局组件的小仓库
import { defineStore } from "pinia";
// 仓库名称
import { Names } from "@/store-namespaced";
// 分类api
import { reqC1 } from "@/api/product/attr";
// 返回结果的ts类型
import type { CategoryResponseData, CategoryObj } from "@/api/product/attr/type";
// 仓库的state的返回值 ts类型
import type { CategoryState } from "./type";

export const useCategoryStore = defineStore(Names.CATEGORY, {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: ''
    }
  },
  getters:{},
  actions:{
    // 获取一级分类
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    }
  }
})