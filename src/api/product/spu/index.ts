// spu接口
import request from '@/utils/request'
// ts type
import type { SpuResponseData, AllTrademarkResponseData, SpuImgResponseData, SaleAttrResponseData, AllSaleAttrResponseData } from './type'

enum API {
  // 获取已有的spu的数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的照片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某个SPU下的已有销售属性数据
  SALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取全部的销售属性
  ALLSALEATTR = '/admin/product/baseSaleAttrList'
}

// 获取某个三级分类的spu数据    {page}/{limit}
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, SpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
// 获取全部spu品牌的数据
export const reqAllTrademark = () => request.get<any, AllTrademarkResponseData>(API.ALLTRADEMARK_URL)
// 获取某个spu下的全部照片 {spuId}
export const reqSpuImageList = (spuId: number) => request.get<any, SpuImgResponseData>(API.IMAGE_URL + spuId)
// 获取某个spu下的销售属性 {spuId}
export const reqSpuSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SALEATTR_URL + spuId)
// 获取全部的销售属性
export const reqAllSaleAttr = () => request.get<any, AllSaleAttrResponseData>(API.ALLSALEATTR)
















