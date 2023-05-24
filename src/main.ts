import { createApp } from 'vue'
// import App from './App.vue'
import App from '@/App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
// @ts-ignore // 忽略当前文件ts类型检测，否则有红色提示，打包会失败
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App) // 获取应用实例对象

// 使用element-plus插件
app.use(ElementPlus, {
  locale: zhCn // 中文---配置element-plus国际化
})
// svg插件需要配置
import 'virtual:svg-icons-register'


console.log(import.meta.env);


app.mount('#app')
