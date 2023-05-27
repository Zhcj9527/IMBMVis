<template>
  <el-button icon="Refresh" size="small" circle @click="updateRefresh"></el-button>
  <el-button icon="FullScreen" size="small" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" size="small" circle></el-button>
  <!-- 头像 -->
  <img :src="setting.logo" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{userStore.username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item  @click="logout">logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import setting from '../../../setting'
import { useSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';

let settingStore = useSettingStore()
let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
// 刷新按钮
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}
// 全屏按钮
const fullScreen = () => {
  // DOM对象的一个属性 -> document.fullscreenElement
  // 判断当前是否为全屏，全屏为true，不是全屏为null
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 退出登陆
const logout = () => {
  // 1. 向服务器发请求
  // 2. 仓库数据要清空token username avatar
  // 3. 跳转login
  userStore.userLogout()
  router.push({
    path: '/login',
    query: {
      redirect: route.path
    }
  })
}


</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
img {
  margin: 0 15px;

  width: 30px;
  height: 30px;
  border-radius: 30px;
}
</style>
