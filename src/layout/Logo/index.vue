<template>
  <div class="logo" v-if="setting.isLogoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo配置文件
import setting from '@/setting'
</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;

  width: 80%;
  height: $base-menu-logo-height;

  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }

  p {
    font-size: $base-menu-logo-fontSize;
  }
}
</style>
