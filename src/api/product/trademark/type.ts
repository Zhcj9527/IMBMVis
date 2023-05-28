// treadmark的ts类型

// 返回数据共有的类型
interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 已有品牌的ts类型, 单个展示的数据
export interface TradeMark {
  id?: number, // 已有的是有id的，新增的是么有id的
  tmName: string,
  logoUrl: string
}
// trademark返回的数据
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: TradeMark[],
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}

