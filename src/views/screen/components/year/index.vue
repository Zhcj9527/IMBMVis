<template>
  <div class="year_container">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      // 主标题
      text: '散点图',
      left: '50%',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
    },
    // x|y轴
    xAxis: {
      type: 'category'
    },
    yAxis: {
      show: false
    },
    grid: {
      left: 20,
      bottom: 20,
      right: 20
    },
    // 系列
    series: [
      {
        type: 'scatter',
        data: [21, 12, 45, 76, 48, 12, 31, 64, 121, 79, 45],
        symbol: 'triangle'
      }
    ]
  })
})



</script>

<style scoped lang='scss'>
.year_container {
  // margin: 20px 0;

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
    height: calc(100% - 20px);
  }
}
</style>