<template>
  <!-- 路由的过渡效果 -->
  <router-view #default="{ route, Component }">
    <transition enter-active-class="animate__animated animate__fadeInDown">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting';
import { watch, ref, nextTick } from 'vue';

let settingStore = useSettingStore()

// 控制组件销毁的标识
let flag = ref<boolean>(true)
// 监听仓库refresh值的变化，发生变化则是点击过refresh按钮
// /* 点击过之后，需要销毁和重载main中的组件 */
// watch 配合 nextTick 使用
watch(() => settingStore.refresh, () => {
  // 点击刷新按钮：组件销毁
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
})

</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss"></style>
