<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card shadow="hover" style="margin: 10px 0;">
      <el-button type="primary" size="default" icon="Plus" @click="">添加属性</el-button>
      <!-- :data="" -->
      <el-table border style="margin-top: 10px;">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column label="序号" type="index" align="center" width="80px">
        </el-table-column>
        <el-table-column label="属性名称" width="120px">
        </el-table-column>
        <el-table-column label="属性值名称">
        </el-table-column>
        <el-table-column label="操作" width="120px">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">




</script>

<style scoped lang="scss"></style>
