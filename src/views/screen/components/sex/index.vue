<template>
  <div class="sex_container">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="center">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
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
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'bar',
    },
    tooltip: {},
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        barGap: '-100%',
        z: 100,
        itemStyle: {
          borderRadius: 50,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        itemStyle: {
          borderRadius: 50,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.sex_container {
  margin: 20px 0;

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

  .center {
    display: flex;
    justify-content: center;

    padding-top: 60px;

    .man {
      margin: 0 40px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
    }

    .woman {
      margin: 0 40px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 111px;
      height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;

    color: white;
  }

  .charts {
    height: 100px;
    // background-color: #fff;
  }
}
</style>
