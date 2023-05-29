// spu接口
import request from "@/utils/request";
// ts type
import type { SpuResponseData } from "./type";

enum API {
  // 获取已有的spu的数据
  HASSPU_URL = '/admin/product/'
}


// 获取某个三级分类的spu数据    {page}/{limit}
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, SpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)


















