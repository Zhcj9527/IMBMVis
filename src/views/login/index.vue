<template>
  <div class="login_container">
    <el-row :gutter="20">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
        <el-form :model="loginForm" class="login_form">
          <h1>Hello Handsomer</h1>
          <h2>Welcome to IMBMVis</h2>
          <el-form-item label="" size="default">
            <!--  v-model="" placeholder="" size="normal" clearable @change="" -->
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="account"
            ></el-input>
          </el-form-item>
          <el-form-item label="" size="default">
            <!--  v-model="" placeholder="" size="normal" clearable @change="" -->
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              placeholder="password"
              show-password
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button> -->
            <el-button
              :loading="isLoading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { loginForm } from '@/api/user/type'
// 引入用户仓库
import { useUserStore } from '@/store/modules/user'

let userStore = useUserStore()
let $router = useRouter()
// 控制login加载效果
let isLoading = ref<boolean>(false)

// 收集账号与密码
const loginForm: loginForm = reactive({
  username: 'admin',
  password: '111111',
})

// 登陆按钮的回调
const login = async () => {
  // 点击login按钮加载开始
  isLoading.value = true
  try {
    // 用户登陆
    await userStore.userLogin(loginForm)
    // 编程式导航 路由跳转
    $router.push('/')
    // 登陆成功的信息
    ElNotification({
      type: 'success',
      title: 'Success',
      message: 'This is a success message',
    })
    // 登陆成功，加载结束
    isLoading.value = false
  } catch (error) {
    // 登陆失败，加载结束
    isLoading.value = false
    // 登陆失败
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;

    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
