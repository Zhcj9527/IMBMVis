<template>
  <!-- 左侧图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- Fold -->
    <component :is="settingStore.isExpand ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting';
// 获取layout相关配置的store
let settingStore = useSettingStore()
// 修改图标
const changeIcon = () => {
  settingStore.isExpand = !settingStore.isExpand
}

</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped lang="scss"></style>
