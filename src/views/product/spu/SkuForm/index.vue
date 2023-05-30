<template>
  <div>
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="80px">
      <el-form-item label="sku名称">
        <el-input placeholder="sku"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input placeholder="weight" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="sku dec" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item label="内存">
            <el-select>
              <el-option value="123">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option value="123">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内存">
            <el-select>
              <el-option value="123">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item label="颜色">
            <el-select>
              <el-option value="黑色">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border>
          <el-table-column type="selection" width="80px" align="center">
          </el-table-column>
          <el-table-column label="图片">
          </el-table-column>
          <el-table-column label="名称">
          </el-table-column>
          <el-table-column label="操作">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">save</el-button>
        <el-button type="primary" @click="cancel">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

type Obj = { flag: number, params?: string }
let emit = defineEmits<{
  (event: 'changeScene', obj: Obj): void
}>()

// 取消按钮
const cancel = () => {
  emit('changeScene', { flag: 0 })
}

</script>

<style scoped lang="scss"></style>
