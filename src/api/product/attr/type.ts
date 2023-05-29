// 分类ts类型.
// 共有的返回数据
interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 分类返回的数据中data的ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 属性、属性值的ts类型
// 属性值的ts
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
// 属性的ts
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}
// 属性/属性值返回数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
