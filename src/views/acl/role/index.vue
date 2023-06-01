<template>
  <div>
    <el-card shadow="hover" style="margin: 10px 0; height: 70px;">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input v-model="keyword" placeholder="请你输入职位的关键字..."></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :disabled="keyword ? false : true" @click="search">search</el-button>
          <el-button type="primary" @click="reset">reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-button type="primary" icon="Plus" size="default" @click="addRole">添加职位</el-button>
      <!-- :data=""  -->
      <el-table :data="roleArr" border style="margin: 10px 0;">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column label="#" type="index" align="center">
        </el-table-column>
        <el-table-column label="id" prop="id" align="center">
        </el-table-column>
        <el-table-column label="职位名称" prop="roleName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="roleName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="User" @click="">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @current-change="getRole"
        @size-change="handleSizeChange" />
    </el-card>
    <!-- dialog 添加|更新role -->
    <!-- v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose" -->
    <el-dialog v-model="dialogVisible" title="添加职位">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form>
        <el-form-item label="角色名称">
          <el-input placeholder="请你输入职位的名称..."></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="">Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// api
import { reqAllRole, reqAddOrUpdate } from '@/api/acl/role';
// ts type
import type { AllRoleResponseData, RoleData } from '@/api/acl/role/type'
//store
import { useSettingStore } from '@/store/modules/setting';

let settingStore = useSettingStore()
// 分页器
let pageNo = ref<number>(0)
let pageSize = ref<number>(10)
let keyword = ref<string>('')
// 收集role展示数据
let roleArr = ref<RoleData[]>([])
let total = ref<number>(0)
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)

// 获取角色信息|分页器当前页码的回调
const getRole = async (pager = 1) => {
  pageNo.value = pager
  let result: AllRoleResponseData = await reqAllRole(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    total.value = result.data.total
    roleArr.value = result.data.records
  }
}
// 分页器数量变化
const handleSizeChange = () => {
  getRole()
}
// 搜索按钮
const search = () => {
  // 根据关键字再次发请求
  getRole()
  // 清除关键字
  keyword.value = ''
}
// 重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
// 添加职位
const addRole = () => {
  // 对话框显示出来
  dialogVisible.value = true
}
// 更新职位
const updateRole = (row: RoleData) => {
  // 对话框显示出来
  dialogVisible.value = true
}
// 取消按钮
const cancel = () => {
  dialogVisible.value = false
}

// 组件挂载
onMounted(() => {
  getRole()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
