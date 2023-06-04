<template>
  <div class="tourist_container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999人</span>
      </p>
    </div>
    <div class="number">
      <span v-for="(str, index) in people" :key="index">{{ str }}</span>
    </div>
    <!-- 盒子是echarts展示图形图标 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'
// 水球图
import 'echarts-liquidfill'

let people = ref<string>('666666人')
// echarts的ref
let charts = ref<any>()

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '水球图',
    },
    // tooltip: {},
    // xAxis: {
    //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    // },
    // yAxis: {},
    series: [
      {
        type: 'liquidFill',
        data: [0.6],
        radius: '90%',
      },
    ],
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.tourist_container {
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;

      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    margin-top: 30px;
    padding: 10px;

    display: flex;

    span {
      flex: 1;
      height: 40px;

      color: #29fcff;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .charts {
    height: 250px;
    // background-color: red;
  }
}
</style>
