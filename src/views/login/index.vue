<template>
  <div class="login_container">
    <el-row :gutter="20">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal" -->
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="ruleFormRef"
          class="login_form"
        >
          <h1>Hello Handsomer</h1>
          <h2>Welcome to IMBMVis</h2>
          <el-form-item prop="username" size="default">
            <!--  v-model="" placeholder="" size="normal" clearable @change="" -->
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="account"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" size="default">
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
              @click="login()"
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
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { LoginForm } from '@/api/user/type'
// 引入用户仓库
import { useUserStore } from '@/store/modules/user'
// 引入time
import { getTime } from '@/utils/getTime'

let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
// 控制login加载效果
let isLoading = ref<boolean>(false)
// 表单元素
let ruleFormRef = ref<FormInstance>()

// 收集账号与密码
const loginForm: LoginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

const validatorUserName = (rule: any, value: any, callback: any) => {
  // console.log(rule, value, callback);
  // rule: 校验规则对象
  // value: 表单元素文本内容
  // callback: 符合条件放行即可，不符合条件则是注入错误提示信息
  // 还可以写正则的
  // if (/^\d{4,10}$/.test(value)) {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为5位'))
  }
}

// 表单验证rules
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      validator: validatorUserName, // 自定义校验规则
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: '密码长度必须是6~15位',
      trigger: 'change',
    },
  ],
})

// 登陆按钮的回调
const login = async () => {
  // 保证表单验证通过才可以继续
  await ruleFormRef.value?.validate()
  // 点击login按钮加载开始
  isLoading.value = true
  try {
    // 用户登陆
    await userStore.userLogin(loginForm)
    // 登陆成功的信息
    ElNotification({
      type: 'success',
      title: `HI, ${getTime()}!!!`,
      message: 'You are a great man. Keep fighting',
    })
    // 登陆成功，加载结束
    isLoading.value = false
    // 浏览器自动刷新
    window.location.reload()
    // 编程式导航 路由跳转
    let redirect: any = route.query.redirect
    router.replace({ path: redirect || '/' })
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
  overflow: hidden;

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
