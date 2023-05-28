// 商品属性的接口
import request from "@/utils/request";
// ts类型
import type { CategoryResponseData } from "./type";
enum API {
  // 一级分类
  C1_URL = '/admin/product/getCategory1',
  // 二级分类
  C2_URL = '/admin/product/getCategory2/',
  // 三级分类
  C3_URL = '/admin/product/getCategory3/'
}

// 一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 二级分类 category1Id
export const reqC2 = (category1Id: number) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 三级分类 category2Id
export const reqC3 = (category2Id: number) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id) 














