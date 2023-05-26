<template>
  <!-- 路由的过渡效果 -->
  <router-view #default="{ route, Component }">
    <transition enter-active-class="animate__animated animate__fadeInDown">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Main'
}
</script>

<style scoped lang="scss"></style>
