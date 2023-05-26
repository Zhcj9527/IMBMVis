// 回调：获取时间--> morning noon afternoon evening
export const getTime = () => {
  let message = ''
  // 内置构造函数Date
  let hour = new Date().getHours()
  if (hour <= 9) {
    message = 'morning'
  } else if (hour <= 12) {
    message = 'noon'
  } else if (hour <= 18) {
    message = 'afternoon'
  } else {
    message = 'evening'
  }

  return message
}
