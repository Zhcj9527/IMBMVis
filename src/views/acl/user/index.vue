<template>
  <div>
    <el-card shadow="hover" style="height: 70px;">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" -->
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名..." clearable @change=""></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="default" @click="">search</el-button>
          <el-button type="primary" size="default" @click="">reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" style="margin: 10px 0;">
      <el-button type="primary" size="default" @click="addUser">添加</el-button>
      <el-button type="primary" size="default" @click="">批量删除</el-button>
      <!-- table :data="" -->
      <el-table :data="userInfoArr" border style="margin: 10px 0;">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column type="selection" align="center">
        </el-table-column>
        <el-table-column label="#" type="index" align="center">
        </el-table-column>
        <el-table-column label="ID" prop="id" align="center">
        </el-table-column>
        <el-table-column label="用户名字" prop="username" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="用户名称" prop="name" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="用户角色" prop="roleName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="User" @click="">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange"  -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
        :background="true" layout=" prev, pager, next, jumper, ->, sizes,total" :total="total"
        @current-change="getUserInfo" @size-change="handleSizeChange" />
    </el-card>
    <!-- drawer，添加|修改用户信息 -->
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h4>添加用户</h4>
      </template>
      <template #default>
        <!-- :model=" " ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
        <el-form :model="userParams">
          <el-form-item label="用户姓名">
            <el-input placeholder="请你输入用户的姓名" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input placeholder="请你输入用户的昵称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input placeholder="请你输入用户的密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="save">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
// api
import { reqUserInfo, reqAddOrUpdate } from '@/api/acl/user';
// ts type
import type { UserResponseData, User } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';

// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
// 存用户展示展示数据
let total = ref<number>(0)
let userInfoArr = ref<User[]>([])
// 抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 收集用户信息数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: ''
})

// 获取用户账号信息
const getUserInfo = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    userInfoArr.value = result.data.records
  }
}
// 分页器页面展示的数量
const handleSizeChange = () => {
  getUserInfo()
}
// 添加用户
const addUser = () => {
  // 清空数据
  Object.assign(userParams, {
    username: '',
    name: '',
    password: ''
  })
  // 显示抽屉
  drawer.value = true
}
// 更新用户
const updateUser = (row: User) => {
  // 显示抽屉
  drawer.value = true
}
// 保存按钮
const save = async () => {
  let result: any = await reqAddOrUpdate(userParams)
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false
    ElMessage.success(userParams.id ? '更新成功' : '添加成功')
    // 再次请求
    getUserInfo()
  } else {
    drawer.value = false
    ElMessage.error(userParams.id ? '更新失败' : '添加失败')
  }
}
// 取消按钮
const cancel = () => {
  // 关闭抽屉
  drawer.value = false
}


// 挂载获取用户信息
onMounted(() => {
  getUserInfo()
})
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
