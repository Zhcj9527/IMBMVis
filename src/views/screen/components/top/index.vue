<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
// router
import { useRouter } from 'vue-router'

let router = useRouter()
// 储存当前时间
let time = ref<any>(moment().format('YYYY年-MM月-DD日: hh:mm:ss'))
// 计时器
let timer = ref(0)

// 点击首页按钮
const goHome = () => {
  router.push('/')
}

// 挂载即开启计时器更新时间
onMounted(() => {
  timer.value = setTimeout(() => {
    time.value = moment().format('YYYY年-MM月-DD日: hh:mm:ss')
  }, 1000)
})
// 卸载前清除计时器
onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  display: flex;

  width: 100%;
  height: 40px;

  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      float: right;

      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;

      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;

      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;

      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }

    .time {
      margin-right: 10px;

      color: #29fcff;
      font-size: 18px;
    }
  }
}
</style>
