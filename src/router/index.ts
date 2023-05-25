import { createRouter, createWebHashHistory } from "vue-router";
// 引入路由
import { constantRoutes } from "./routes";


let router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  },
  routes: constantRoutes
})


export default router