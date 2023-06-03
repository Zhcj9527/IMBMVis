<template>
  <el-button
    icon="Refresh"
    size="small"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    icon="FullScreen"
    size="small"
    circle
    @click="fullScreen"
  ></el-button>
  <el-popover
    placement="top-start"
    title="主题设置"
    :width="300"
    trigger="hover"
  >
    <!-- 表单元素 -->
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="250px" label-position="left">
      <el-form-item label="主题颜色">
        <!-- v-model="color" -->
        <el-color-picker
          @change="setColor"
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <!-- v-model="value" -->
        <el-switch
          @change="changeDark"
          v-model="dark"
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" size="small" circle></el-button>
    </template>
  </el-popover>
  <!-- 头像 -->
  <img :src="setting.logo" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import setting from '../../../setting'
import { useSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

let settingStore = useSettingStore()
let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
// 主题颜色
let color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 收集开关的数据
let dark = ref<boolean>(false)

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
const logout = async () => {
  // 1. 向服务器发请求
  // 2. 仓库数据要清空token username avatar
  // 3. 跳转login
  await userStore.userLogout()
  router.push({
    path: '/login',
    query: {
      redirect: route.path,
    },
  })
}
// switch开关的change事件
const changeDark = () => {
  // 获取HTML的根节点
  let html = document.documentElement
  console.log(html.className)
  dark.value ? (html.className = 'dark') : (html.className = '')
}
// 主题颜色的设置
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
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
