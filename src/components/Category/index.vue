<template>
  <div>
    <el-card shadow="hover">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select v-model="categoryStore.c1Id" @change="handler">
            <!-- value是需要收集的数据，vModel绑定 -->
            <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
              :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select v-model="categoryStore.c2Id" @change="handler1">
            <!--  v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
            <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
              :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select  v-model="categoryStore.c3Id">
            <!--  v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
            <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 引入分类仓库
import { useCategoryStore } from '@/store/modules/category'

let categoryStore = useCategoryStore()

// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()

}
// 一级下拉菜单，change事件，选中值时会被触发，此时c1Id有了
const handler = () => {
  // 清除二级三级的框中内容
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 拿二级分类的数据
  categoryStore.getC2()
}
// 二级下拉菜单的change事件，此时c2Id有了
const handler1 = () => {
  // 清除三级分类框中内容
  categoryStore.c3Id = ''
  // 拿三级分类数据
  categoryStore.getC3()
}

// 全局组件挂载完毕，发请求获取一级分类数据
onMounted(() => {
  getC1()
})
</script>

<style scoped lang="scss"></style>
