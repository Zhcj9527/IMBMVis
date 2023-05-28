// category仓库返回数据的 ts 类型
import type { CategoryObj } from "@/api/product/attr/type"

export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryObj[]
}