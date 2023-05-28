<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动条 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单 -->
        <el-menu
          :default-active="$route.path"
          background-color="#001526"
          text-color="white"
          :collapse="settingStore.isExpand"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ isExpand: settingStore.isExpand ? true : false }"
    >
      <!-- 顶部导航 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域  -->
    <div
      class="layout_main"
      :class="{ isExpand: settingStore.isExpand ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取路由
import { useRoute } from 'vue-router'
// 获取用户仓库->菜单
import { useUserStore } from '@/store/modules/user'
// 获取layout配置仓库
import { useSettingStore } from '@/store/modules/setting'

let $route = useRoute()
// console.log($route.path)
let userStore = useUserStore()
let settingStore = useSettingStore()
</script>

<!-- 给组件个名字 -->
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  position: relative;

  width: 100%;
  height: 100vh;
  // background: red;

  .layout_slider {
    height: inherit;
    width: $base-menu-width;
    background-color: $base-menu-background;
    transition: all 0.3s linear;

    color: white;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s linear;

    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: rgb(217, 228, 228);

    &.isExpand {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }

  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    transition: all 0.3s linear;

    padding: 20px;

    overflow: auto;

    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: rgb(105, 47, 172);

    &.isExpand {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
