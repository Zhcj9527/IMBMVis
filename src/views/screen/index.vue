<template>
  <div class="container">
    <!-- 数据大屏展示区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 子组件
import Top from './components/top/index.vue'

// 数据大屏的dom
let screen = ref<HTMLElement>()

// 定义大屏缩放的比例
const getScale = (w:number = 1920, h:number = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监听视口变化
window.onresize = () => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

onMounted(() => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top; // 基点

    width: 1920px;
    height: 1080px;
    // background: red;

    .top{
      width: 100%;
      height: 40px;
      // background-color: aqua;
    }
    .bottom {
      display: flex;

      .right {
        flex: 1
      }
      .center{
        flex: 2
      }
      .left{
        flex: 1
      }
    }
  }
}
</style>
