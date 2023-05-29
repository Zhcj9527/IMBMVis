// category仓库返回数据的 ts 类型
import type { CategoryObj } from '@/api/product/attr/type'

export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: string | number
  c2Arr: CategoryObj[]
  c2Id: string | number
  c3Arr: CategoryObj[]
  c3Id: string | number
}
