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

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 20px;

  width: 100%;
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
