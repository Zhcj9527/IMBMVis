import pinia from '@/store'
import { useUserStore } from '@/store/modules/user'

let userStore = useUserStore(pinia)
console.log(userStore)

export function isHasButton(app: any) {
  // 全局的自定义指令
  app.directive('has', {
    // 代表全局自定义指令的DOM|组件挂载完毕之后会执行一次
    mounted(el: HTMLElement, binding: any) {
      // 没有的话就直接从dom树上移除
      if (!userStore.buttons.includes(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
