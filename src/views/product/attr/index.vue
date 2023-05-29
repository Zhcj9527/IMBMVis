<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card shadow="hover" style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true">
        添加属性
      </el-button>
      <!-- :data="" -->
      <el-table :data="attrArr" border style="margin-top: 10px">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{row, $index}">
            <el-tag v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin-left: 5px;">{{ attrValue.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{row, $index}">
            <el-button type="primary" size="small" icon="Edit" @click=""></el-button>
            <el-button type="primary" size="small" icon="Delete" @click=""></el-button>            
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
// api
import { reqAttr } from '@/api/product/attr'
// ts type 
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
// 获取分类仓库
import { useCategoryStore } from '@/store/modules/category';
import { storeToRefs } from 'pinia';
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])

// 监听三级分类的id
watch(() => categoryStore.c3Id, () => {
  // 清空原有的attr数据
  attrArr.value = []
  // 要保证三级分类有再发请求
  if (categoryStore.c3Id) {
    getAttr()
  }
})
// 获取已有属性和属性值
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = storeToRefs(categoryStore)
  let result: AttrResponseData = await reqAttr(c1Id.value, c2Id.value, c3Id.value)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}










</script>

<style scoped lang="scss"></style>
