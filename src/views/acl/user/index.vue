<template>
  <div>
    <el-card shadow="hover" style="height: 70px">
      <!-- :model="form" ref="form" :rules="rules" label-width="80px" -->
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input v-model="keyWord" placeholder="请输入用户名..." clearable @change=""></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="default" @click="search" :disabled="keyWord ? false : true">
            search
          </el-button>
          <el-button type="primary" size="default" @click="reset">
            reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser">添加</el-button>
      <el-button type="primary" size="default" :disabled="selectArr.length == 0" @click="deleteSelectUser">
        批量删除
      </el-button>
      <!-- table :data="" -->
      <el-table :data="userInfoArr" border style="margin: 10px 0" @selection-change="selectChange">
        <!-- v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" -->
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column label="用户名字" prop="username" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" prop="name" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" prop="roleName" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">
              编辑
            </el-button>
            <el-popconfirm :title="`Are you sure to delete ${row.username}?`" width="200px" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
        <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <!-- :model=" " ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input placeholder="请你输入用户的姓名" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请你输入用户的昵称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="userParams.id ? false : true">
            <el-input placeholder="请你输入用户的密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="save">确定</el-button>
      </template>
    </el-drawer>
    <!-- drawer, 分配角色 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <template #default>
        <el-form label-width="80px">
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <!-- v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" -->
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <!-- v-model="checkedCities" @change="handleCheckedCitiesChange" -->
            <el-checkbox-group v-model="assignRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(role, index) in allRoles" :key="index" :label="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <!-- <el-button @click="cancelClick">cancel</el-button> -->
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
  reqUserInfo,
  reqAddOrUpdate,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
// ts type
import type {
  UserResponseData,
  User,
  RoleData,
  RoleResponseData,
  UserRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
// store
import { useSettingStore } from '@/store/modules/setting'

let settingStore = useSettingStore()
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
// 存用户展示展示数据
let total = ref<number>(0)
let userInfoArr = ref<User[]>([])
// 抽屉的显示与隐藏,控制更新用户信息
let drawer = ref<boolean>(false)
// 抽屉的显示与隐藏,控制分配角色
let drawer1 = ref<boolean>(false)
// 收集用户信息数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// form组件
let formRef = ref<any>()
// 复选框
let checkAll = ref<boolean>(false)
// 设置不确定状态，仅负责样式控制
let isIndeterminate = ref<boolean>(true)
// 收集全部职位|当前账号的数据
let allRoles = ref<RoleData[]>([])
let assignRoles = ref<any[]>([])
// 收集要批量删除的id
let selectArr = ref<User[]>([])
// 收集搜索框中的关键字
let keyWord = ref<string>('')

// 获取用户账号信息
const getUserInfo = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyWord.value,
  )
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
    id: '',
    username: '',
    name: '',
    password: '',
  })
  // 清除表单验证信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
  // 显示抽屉
  drawer.value = true
}
// 更新用户
const updateUser = (row: User) => {
  // 显示抽屉
  drawer.value = true
  // 清除表单验证信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
  // 收集已有的账号信息
  Object.assign(userParams, JSON.parse(JSON.stringify(row)))
}
// 保存按钮
const save = async () => {
  // 点击保存按钮的时候。务必要保证表单全部符合条件采取发请求。
  await formRef.value.validate()
  // 发请求
  let result: any = await reqAddOrUpdate(userParams)
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false
    ElMessage.success(userParams.id ? '更新成功' : '添加成功')
    // 再次请求
    getUserInfo(userParams.id ? pageNo.value : 1)
    // 浏览器自动刷新
    window.location.reload()
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
// 用户名的校验
const validateUsername = (rule: any, value: any, callback: any) => {
  // 用户名字长度至少五位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户的信息名称至少是五位'))
  }
}
// 用户昵称的校验
const validateName = (rule: any, value: any, callback: any) => {
  // 用户名字长度至少五位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户的昵称至少是五位'))
  }
}
// 用户密码的校验
const validatePassword = (rule: any, value: any, callback: any) => {
  // 用户名字长度至少五位
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户的昵称至少是六位'))
  }
}
// 表单校验字段
const rules = {
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
}
// 分配角色按钮
const setRole = async (row: User) => {
  // 收集已有的用户信息
  Object.assign(userParams, JSON.parse(JSON.stringify(row)))
  // 发请求,获取全部职位|当前账号的数据
  let result: RoleResponseData = await reqAllRole(row.id as number)
  if (result.code === 200) {
    allRoles.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
    // 弹出对话框
    drawer1.value = true
  }
}
// 顶部复选框
const handleCheckAllChange = (val: any) => {
  // val -> true代表全选
  assignRoles.value = val ? allRoles.value : []
  // 设置不确定状态，仅负责样式控制
  isIndeterminate.value = false
}
// 底部复选框
const handleCheckedCitiesChange = (value: any) => {
  // value 返回的是选中的role的string[]
  // 顶部复选框是否勾选
  checkAll.value = value.length === allRoles.value.length
  // 不确定的样式
  isIndeterminate.value = !checkAll.value
}
// 分配职位的确定按钮
const confirmClick = async () => {
  // 收集参数
  let data: UserRoleData = {
    userId: userParams.id as number,
    roleIdList: assignRoles.value.map((item: RoleData) => item.id!),
  }
  // 发请求
  let result: any = await reqSetUserRole(data)
  if (result.code === 200) {
    // 提示
    ElMessage.success('分配职位成功')
    // 关闭drawer
    drawer1.value = false
    // 再次捞数据展示
    getUserInfo(pageNo.value)
  }
}
// 删除某一个用户
const deleteUser = async (row: User) => {
  let result = await reqRemoveUser(row.id as number)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getUserInfo(pageNo.value)
  } else {
    ElMessage.error('删除失败')
  }
}
// table勾选复选框会触发的事件
const selectChange = (selection: any) => {
  // 准备一个数组存储批量删除的id
  selectArr.value = selection
}
// 批量删除按钮的回调
const deleteSelectUser = async () => {
  // 整理参数
  let idList: any = selectArr.value.map((item: User) => {
    return item.id
  })
  // 批量删除
  let result: any = await reqSelectUser(idList)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getUserInfo()
  } else {
    ElMessage.error('删除失败')
  }
}
// 搜索按钮
const search = () => {
  // 根据关键字获取数据
  getUserInfo()
  // 清空关键字
  keyWord.value = ''
}
// 重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
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
