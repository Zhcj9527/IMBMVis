<template>
  <div>
    <h1>2级路由Home-{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
// 挂载后加载用户信息
import { useUserStore } from '@/store/modules/user'

let userStore = useUserStore()

</script>

<style scoped></style>
