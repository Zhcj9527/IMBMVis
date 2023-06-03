<template>
  <div>
    <el-table
      :data="permissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="code" label="权限值" sortable />
      <el-table-column prop="updateTime" label="修改时间" sortable />
      <el-table-column label="操作" sortable>
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 4 ? true : false"
            @click="addPermission(row)"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`Are you sure to delete ${row.name}?`"
            width="260px"
            @confirm="deleteMenu(row)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog 用于添加|更新已有菜单的结构 :before-close="handleClose" -->
    <el-dialog
      v-model="dialogVisible"
      :title="menuParams.id ? '更新菜单' : '添加菜单'"
      width="30%"
    >
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input
            v-model="menuParams.name"
            placeholder="请你输入菜单名称..."
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            v-model="menuParams.code"
            placeholder="请你输入权限值..."
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
// api
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/menu'
// ts type
import type {
  PermissionResponseData,
  Permission,
  MenuData,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

// 存储菜单|按钮的数据
let permissionArr = ref<Permission[]>([])
// 对话框的显示|隐藏
let dialogVisible = ref<boolean>(false)
// 收集dialog表单数据
let menuParams = reactive<MenuData>({
  name: '',
  code: '',
  level: 0,
  pid: 0,
})

// 获取菜单|按钮的数据
const getAllPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}
// 添加菜单按钮
const addPermission = (row: Permission) => {
  // 清空数据
  Object.assign(menuParams, {
    id: '',
    name: '',
    code: '',
    level: 0,
    pid: 0,
  })
  // 显示对话框
  dialogVisible.value = true
  // 整理参数，增加的是子菜单
  menuParams.level = row.level + 1
  menuParams.pid = row.id!
}
// 编辑按钮
const updatePermission = (row: Permission) => {
  // 显示对话框
  dialogVisible.value = true
  // 收集已有的菜单数据
  Object.assign(menuParams, row)
}
// dialog确定按钮
const confirm = async () => {
  // 添加子菜单|更新某个菜单
  let result: any = await reqAddOrUpdateMenu(menuParams)
  if (result.code === 200) {
    dialogVisible.value = false
    ElMessage.success(menuParams.id ? '更新成功' : '添加成功')
    getAllPermission()
  }
}
// 删除菜单按钮
const deleteMenu = async (row: Permission) => {
  let result = await reqRemoveMenu(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除成功....')
    getAllPermission()
  }
}

// 挂载完拿数据
onMounted(() => {
  getAllPermission()
})
</script>

<style scoped lang="scss"></style>
