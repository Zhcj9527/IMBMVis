<template>
  <div class="menu_content">
    <!-- {{ menuList }} -->
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有孩子的 -->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.isHidden" :index="item.path" @click="goRouter">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由，只有一个 -->
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item v-if="!item.children[0].meta.isHidden" :index="item.children[0].path" @click="goRouter">
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>

    </template>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
// 获取路由器对象
let $router = useRouter()


// 获取父组件传递来的全部组件信息
defineProps(['menuList'])

// 路由跳转 // index是路由的path
const goRouter = (vc: any) => {
  $router.push(vc.index)
}


</script>

<!-- 递归组件的名字一定要另开一个script标签，且要保持语言要一致 -->
<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped lang='scss'>
.menu_content {
  font-size: $base-menu-info-fontSize;
}
</style>