// 品牌管理接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
// 接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = `/admin/product/baseTrademark`, // 带参数的需要抽离出来再去拼接
  // 新增trademark
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改trademark
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除trademark
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

// 获取trademark
export const reqTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )

// 添加与修改
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // update
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // add
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + `/${id}`)
