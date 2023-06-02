<template>
  <div>
    <el-card shadow="hover" style="margin: 10px 0; height: 70px">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input
            v-model="keyword"
            placeholder="请你输入职位的关键字..."
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
          >
            search
          </el-button>
          <el-button type="primary" @click="reset">reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-button type="primary" icon="Plus" size="default" @click="addRole">
        添加职位
      </el-button>
      <!-- :data=""  -->
      <el-table :data="roleArr" border style="margin: 10px 0">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column
          label="职位名称"
          prop="roleName"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="deleteRole(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @current-change="getRole"
        @size-change="handleSizeChange"
      />
    </el-card>
    <!-- dialog 添加|更新role -->
    <!-- v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose" -->
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.id ? '更新职位' : '添加职位'"
    >
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
      <el-form :model="roleParams" ref="form" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请你输入职位的名称..."
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 抽屉组件：分配职位的菜单权限|按钮权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <!-- 树形框架 -->
        <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
// api
import {
  reqAllRole,
  reqAddOrUpdate,
  reqAllMenuList,
  reqSetPermission,
  reqRemoveRole,
} from '@/api/acl/role'
// ts type
import type {
  AllRoleResponseData,
  RoleData,
  MenuResponseData,
  MenuData,
} from '@/api/acl/role/type'
//store
import { useSettingStore } from '@/store/modules/setting'
import { ElMessage } from 'element-plus'

let settingStore = useSettingStore()
// 分页器
let pageNo = ref<number>(0)
let pageSize = ref<number>(10)
// 收集搜索关键字
let keyword = ref<string>('')
// 收集role展示数据
let roleArr = ref<RoleData[]>([])
let total = ref<number>(0)
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 收集新增岗位数据
let roleParams = reactive<RoleData>({
  roleName: '',
})
// 获取form组件
let form = ref<any>()
// 抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 存储用户权限
let menuArr = ref<MenuData[]>([])
// tree的props
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 数据用于存储勾选节点的id--level4
let selectArr = ref<number[]>([])
// 回去tree组件实例
let tree = ref<any>()

// 获取角色信息|分页器当前页码的回调
const getRole = async (pager = 1) => {
  pageNo.value = pager
  let result: AllRoleResponseData = await reqAllRole(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
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
  // 清除数据
  Object.assign(roleParams, {
    id: '',
    roleName: '',
  })
  // 对话框显示出来
  dialogVisible.value = true
  // 清除验证信息
  nextTick(() => {
    form.value.clearValidate()
  })
}
// 更新职位
const updateRole = (row: RoleData) => {
  // 对话框显示出来
  dialogVisible.value = true
  //收集数据
  Object.assign(roleParams, row)
  // 清除验证信息
  nextTick(() => {
    form.value.clearValidate()
  })
}
// dialog取消按钮
const cancel = () => {
  dialogVisible.value = false
}
// roleName字段的校验
const validateRolename = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少是两位数...'))
  }
}
// 职位校验相关的
const rules = {
  roleName: [{ required: true, validator: validateRolename, trigger: 'blur' }],
}
// dialog确认按钮
const confirm = async () => {
  // 表单验证通过了，再去发请求
  await form.value.validate()
  // 添加|更新职位
  let result: any = await reqAddOrUpdate(roleParams)
  if (result.code === 200) {
    // 提示
    ElMessage.success(roleParams.id ? '更新成功' : '添加成功')
    // 对话框隐藏
    dialogVisible.value = false
    // 拿数据展示
    getRole(pageNo.value)
  }
}
// 分配权限按钮
const setPermission = async (row: RoleData) => {
  // 合并参数
  Object.assign(roleParams, row)
  //抽屉显示
  drawer.value = true
  // 发请求全部的菜单与按钮的数据
  let result: MenuResponseData = await reqAllMenuList(row.id!)
  if (result.code === 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 过滤树形组件level4的id
const filterSelectArr = (allData: MenuData[], resArr: number[]) => {
  allData.forEach((item) => {
    if (item.level === 4) {
      if (item.select) {
        resArr.push(item.id)
      }
    } else {
      filterSelectArr(item.children!, resArr)
    }
  })

  return resArr
}
// drawer确定按钮
const confirmClick = async () => {
  // 整理参数
  const roleId = roleParams.id!
  // 选中节点的id
  const arr = tree.value.getCheckedKeys()
  // 半选的id
  const arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  // 下发权限
  let result = await reqSetPermission(roleId, permissionId)
  if (result.code === 200) {
    drawer.value = false
    ElMessage.success('下发权限成功')
    // 页面刷新
    window.location.reload()
  } else {
    ElMessage.success('下发权限失败')
  }
}
// 删除角色
const deleteRole = async (row: RoleData) => {
  let result: any = await reqRemoveRole(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getRole(pageNo.value)
  } else {
    ElMessage.error('删除失败')
  }
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
