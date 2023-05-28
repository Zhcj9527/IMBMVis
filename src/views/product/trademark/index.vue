<template>
  <div>
    <el-card shadow="hover">
      <!-- 添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="">添加品牌</el-button>
      <!-- 表格组件：用于展示已有数据平台数据 -->
      <!-- :data="" -->
      <el-table :data="trademarkAttr" border style="margin: 10px 0;">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!--  el-table-column，默认用div展示, 可以通过插槽自定义 -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" alt="loading..." style="width: 50px; height: 50px;">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Edit" size="small" @click=""></el-button>
            <el-button type="primary" icon="Delete" size="small" @click=""></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->, sizes, total" :total="total" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入api
import { reqTrademark } from '@/api/product/trademark'
// trademark的ts类型
import type { TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示条目个数
let limit = ref<number>(3)
// 存储已有品牌的总数
let total = ref<number>(0)
// 储存已有品牌的数据
let trademarkAttr = ref<TradeMark[]>([])

// 获取已有品牌的接口封装为函数
const getTrademark = async () => {
  let result: TradeMarkResponseData = await reqTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    total.value = result.data.total
    trademarkAttr.value = result.data.records
  }
}

// 组件挂载完的钩子
onMounted(() => {
  getTrademark()
})


</script>

<style scoped lang="scss"></style>
