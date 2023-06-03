<template>
  <div class="age_container">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <!-- 图形图表的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

let charts = ref<any>()

onMounted(() => {
  let myChart = echarts.init(charts.value);
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 40,
      right: 30,
      orient: 'vertical', // 图例方向的设置
      textStyle:{
        color: 'white',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '1' },
          { value: 735, name: '2' },
          { value: 580, name: '3' },
          { value: 484, name: '34' },
          { value: 300, name: '3s' }
        ]
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})

</script>

<style scoped lang='scss'>
.age_container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 250px;
    // background-color: #fff;
  }
}
</style>