interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// sku的ts类型
export interface SkuAttrValue {
  attrId: number | string
  valueId: number | string
  id?: number
  valueName?: string
}
export interface SkuSaleAttrValue {
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrValueName?: string
}
export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: SkuAttrValue[]
  skuSaleAttrValueList?: SkuSaleAttrValue[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
  skuImageList?: any[]
}

// 获取sku返回数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    pages: number
  }
}

// 获取sku商品详情返回数据的ts
export interface SkuInfoResponseData extends ResponseData {
  data: SkuData
}








