<template>
  <div class="rank_container">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      // 主标题
      text: '景区排行',
      left: '50%',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      // 子标题
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16,
      },
    },
    // x|y轴
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    // 系列
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        label: {
          show: true,
          position: 'top',
        },
        showBackground: true,
        backgroundStyle: {
          color: 'white',
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 80],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.rank_container {
  margin: 20px 0;

  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 40px);
    // background-color: #fff;s
  }
}
</style>
