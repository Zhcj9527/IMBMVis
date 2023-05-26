<template>
  <el-button icon="Refresh" size="small" circle></el-button>
  <el-button icon="FullScreen" size="small" circle></el-button>
  <el-button icon="Setting" size="small" circle></el-button>
  <!-- 头像 -->
  <img :src="setting.logo" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      zhcj
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import setting from '../../../setting'
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
