<template>
  <div class="line_container">
    <div class="title">
      <p>未来七天游客数量的趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图表的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref<any>()

onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '游客访问量',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // 分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      // 分割线不要
      splitLine: {
        show: false,
      },
      // y轴线
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      right: 20,
      top: 0,
      bottom: 20,
    },
    series: {
      type: 'line',
      data: [120, 240, 22, 45, 55, 66, 12],
      smooth: true,
      // 区域填充样式
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  })
})
</script>

<style scoped lang="scss">
.line_container {
  // margin: 0 20px;

  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
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
    // background-color: #fff;
  }
}
</style>
