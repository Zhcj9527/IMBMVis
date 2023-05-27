<template>
  <!-- 左侧图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- Fold -->
    <component :is="settingStore.isExpand ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字和标题 route.matched 可以得到路由 -->
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="item.name"
      v-show="item.meta.title"
      :to="item.path"
    >
      <template style="display: flex; align-items: center">
        <!-- 图标 -->
        <el-icon style="margin: 0 4px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 路由匹配->面包屑标题 -->
        {{ item.meta.title }}
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting'
// 引入路由
import { useRoute } from 'vue-router'
// 获取layout相关配置的store
let settingStore = useSettingStore()
let route = useRoute()
// 修改图标
const changeIcon = () => {
  settingStore.isExpand = !settingStore.isExpand
}
</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss"></style>
