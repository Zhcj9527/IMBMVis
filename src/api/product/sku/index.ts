// sku模块接口管理
import request from '@/utils/request'
// ts type
import type { SkuResponseData, SkuInfoResponseData } from './type'

// 枚举地址
enum API {
  // 获取已有的sku
  SKU_URL = '/admin/product/list/',
  // 上架
  ONSALE_URL = '/admin/product/onSale/',
  // 下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情的接口
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除sku
  REMOVESKU_URL = '/admin/product/deleteSku/',
}

// 获取sku {page}/{limit}
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
// 上架 {skuId}
export const reqOnSale = (skuId: number) =>
  request.get<any, any>(API.ONSALE_URL + skuId)
// 下架  {skuId}
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
// 获取商品详情 {skuId}
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoResponseData>(API.SKUINFO_URL + skuId)
// 删除某个商品 {skuId}
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.REMOVESKU_URL + skuId)
