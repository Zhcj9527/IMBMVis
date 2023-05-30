// SPU的ts类型
// 返回的数据类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
}
// 获取spu返回的数据的ts类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: SpuData[]
    total: number
    size: number
    current: number
    pages: number
    searchCount: boolean
  }
}

// spu品牌数据的ts类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
// spu品牌返回数据ts类型
export interface AllTrademarkResponseData extends ResponseData {
  data: TradeMark[]
}

// 图片
export interface SpuImg {
  id: number
  spuId: number
  imgName: string
  imgUrl: string
}
// 图片返回数据类型
export interface SpuImgResponseData extends ResponseData {
  data: SpuImg[]
}

// 已有的销售属性
// 已有的销售属性的属性值ts
export interface SaleAttrValue {
  id?: number
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}
// 销售属性ts
export interface SaleAttr {
  id?: number
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValue[]
}
// 销售属性返回数据ts
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 全部的销售属性，及返回数据的ts
export interface AllSaleAttr {
  id: number
  name: string
}
export interface AllSaleAttrResponseData extends ResponseData {
  data: AllSaleAttr[]
}
