<template>
  <!-- xlink:href 执行用图标的话，需要用到属性值#icon-图标名字 -->
  <!-- fill可以改变图标的颜色 -->
  <!-- 大小 可以通过svg进行改变 -->
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

// 接收父组件传递过来的参数
defineProps({
  // xlink:href属性值得前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 图标svg名字
  name: String,
  // 图标的颜色
  color: {
    type: String,
    default: ''
  },
  // 图标的大小
  width: {
    type: String,
    default: "16px"
  },
  height: {
    type: String,
    default: "16px"
  }
})
</script>

<style scoped></style>