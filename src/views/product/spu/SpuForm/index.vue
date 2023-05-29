<template>
  <div>
    <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称..."></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
        <el-select>
          <!-- v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
          <el-option label="华为" value="123">
          </el-option>
          <el-option label="华为" value="123">
          </el-option>
          <el-option label="华为" value="123">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input placeholder="请输入描述..." type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片墙">
        <!-- v-model:file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" -->
        <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <!-- v-model="dialogVisible" :src="dialogImageUrl" -->
        <el-dialog>
          <img w-full alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
        <el-select>
          <!-- v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
          <el-option label="华为" value="123">
          </el-option>
          <el-option label="华为" value="123">
          </el-option>
          <el-option label="华为" value="123">
          </el-option>
        </el-select>
        <el-button style="margin-left: 10px;" type="primary" size="default" icon="Plus" @click="">添加销售属性</el-button>
        <!-- table展示销售属性与属性值的地方  :data=""-->
        <el-table border stripe style="margin-top: 10px;">
          <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column type="index" label="属性名" width="80px">
          </el-table-column>
          <el-table-column type="index" label="销售属性值">
          </el-table-column>
          <el-table-column type="index" label="操作" width="80px">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" size="default" @click="">save</el-button>
         <el-button type="primary" size="default" @click="">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>




</script>

<style scoped lang='scss'></style>