import { createApp } from 'vue'
// import App from './App.vue'
import App from '@/App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
// @ts-ignore // 忽略当前文件ts类型检测，否则有红色提示，打包会失败
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件需要配置
import 'virtual:svg-icons-register'
// 自定义插件：注册整个项目的全局组件
import globalComponent from '@/components'
// 引入模板的全局样式
import '@/styles/index.scss'
import 'animate.css'
// 引入router
import router from './router'
// 路由鉴权
import './permission.ts'
// 引入pinia
import pinia from './store'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入自定义指令
import { isHasButton } from './directive/has.ts'

const app = createApp(App) // 获取应用实例对象

// 使用element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // 中文---配置element-plus国际化
})
// 安装自定义插件
app.use(globalComponent)
// 安装router
app.use(router)
// 安装pinia
app.use(pinia)
// 自定义指令
isHasButton(app)

app.mount('#app')
