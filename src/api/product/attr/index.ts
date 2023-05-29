// 商品属性的接口
import request from '@/utils/request'
// ts类型
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

enum API {
  // 一级分类
  C1_URL = '/admin/product/getCategory1',
  // 二级分类
  C2_URL = '/admin/product/getCategory2/',
  // 三级分类
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下属性/属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加、修改已有属性
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性
  DALETEATTR_URL = '/admin/product/deleteAttr/'
}

// 一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 二级分类 category1Id
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 三级分类 category2Id
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 获取分类下的属性与属性值 {category1Id}/{category2Id}/{category3Id}
export const reqAttr = (
  category1Id: number | string,
  category2Id: string | number,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
// 新增|修改已有属性的接口
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
// 删除属性   attrId
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.DALETEATTR_URL + attrId)




