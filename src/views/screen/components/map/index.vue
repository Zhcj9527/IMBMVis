<template>
  <div class="map_container" ref="map">map</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入chinaJson
import chinaJSON from './china.json'
// 获取map元素
let map = ref<HTMLElement>()
// 注册地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let myChart = echarts.init(map.value!)
  myChart.setOption({
    geo: [
      {
        map: 'china',
        roam: true, // 缩放
        // zoom: 2,
        label: {
          show: true,
          color: 'white',
          fontSize: 14,
        },
        // bottom: 0,
        // right: 0,
        // left: 100,
        // top: 100,
        // 地图区域的多边形的样式
        itemStyle: {
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
          opacity: 0.8,
        },
        // 地图高亮的设置
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
      },
    ],
    // 布局
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: {
      type: 'lines', // 航线
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [117.283042, 31.86119], // 终点        // 如果 polyline 为 true 还可以设置更多的点
          ],
          // 统一的样式设置
          lineStyle: {
            color: 'white',
            width: 10,
          },
        },
      ],
      // 线特效的配置，
      effect: {
        show: true,
        symbol: 'circle',
        symbolSize: 20,
        color: 'red',
      },
    },
  })
})
</script>

<style scoped lang="scss"></style>
