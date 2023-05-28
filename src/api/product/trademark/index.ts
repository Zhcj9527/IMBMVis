// 品牌管理接口
import request from "@/utils/request";
import type { TradeMarkResponseData } from "./type";
// 接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = `/admin/product/baseTrademark` // 带参数的需要抽离出来再去拼接
}

// 获取trademark
export const reqTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)



















