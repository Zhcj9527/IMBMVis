<template>
  <div>
    <el-card shadow="hover">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select v-model="categoryStore.c1Id">
          <!-- value是需要收集的数据，vModel绑定 -->
          <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select>
            <!--  v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="三级分类">
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-select>
            <!--  v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
            <el-option value="123">
            </el-option>
          </el-select>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
// 引入分类仓库
import { useCategoryStore } from '@/store/modules/category'

let categoryStore = useCategoryStore()

// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}

// 全局组件挂载完毕，发请求获取一级分类数据
onMounted(()=>{
  getC1()
})

</script>

<style scoped lang='scss'></style>