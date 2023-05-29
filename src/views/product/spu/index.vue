<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
    <el-card shadow="hover" style="margin: 10px 0;">
      <div v-show='changeScene === 0'>
        <el-button type="primary" size="default" icon="Plus" @click="addSpu"
          :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
        <el-table :data="records" border stripe style="margin: 10px 0;">
          <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
          <el-table-column label="序号" type="index" align="center" width="80px">
          </el-table-column>
          <el-table-column label="SPU名称" prop="spuName">
          </el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="add spu" @click=""></el-button>
              <el-button type="primary" size="small" icon="Edit" title="edit spu" @click=""></el-button>
              <el-button type="primary" size="small" icon="View" title="view sku" @click=""></el-button>
              <el-button type="primary" size="small" icon="Delete" title="delete spu" @click=""></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          :background="true" layout=" prev, pager, next, jumper, ->,sizes,total" :total="total" @current-change="getSpu"
          @size-change="handleSizeChange" />
      </div>
      <!-- add|update SPU -->
      <SpuForm v-show='changeScene === 1'></SpuForm>
      <!-- add SKU -->
      <SkuForm v-show='changeScene === 2'></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// spu，sku组件
import SpuForm from './SpuForm/index.vue'
import SkuForm from './SkuForm/index.vue'
// store
import { useCategoryStore } from '@/store/modules/category';
// api
import { reqHasSpu } from '@/api/product/spu'
// ts type
import type { SpuResponseData, SpuData } from '@/api/product/spu/type'

let categoryStore = useCategoryStore()
// 三级列表，场景数据
let scene = ref<boolean>(true)
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
// 存储spu数据
let records = ref<SpuData[]>([])
let total = ref<number>(0)
// 场景切换 0: 已有的SPU，1：添加|修改SPU，2：添加SKU
let changeScene = ref<number>(1)

// 监听三级分类id
watch(() => categoryStore.c3Id, () => {
  // 有三级分类id发请求
  if (!categoryStore.c3Id) return
  getSpu()
})
// 获取某个三级分类下的全部spu
const getSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: SpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
// 分页器的下拉菜单发生变化
const handleSizeChange = () => {
  getSpu()
}
// 添加新的SPU按钮
const addSpu = () => {
  // 1：添加|修改SPU
  changeScene.value = 1
}











</script>

<style scoped lang="scss"></style>
