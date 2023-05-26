/* 自定义插件 */
import type { App, Component } from 'vue'
// 引入全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 注册element-plus所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
type GlobalCom = { [name: string]: Component }
const allGlobalComponent: GlobalCom = { SvgIcon, Pagination }
//对外暴露插件对象
export default {
  install(app: App) {
    // 注册项目中去全部全局组件
    Object.keys(allGlobalComponent).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 注册所有element-plus图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
