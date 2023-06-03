<template>
  <div>
    <el-card shadow="hover">
      <div class="box">
        <img :src="userStore.avatar!" alt="" class="avatar" />
        <div class="bottom">
          <h1 class="title">
            {{ getTime() }} 好呀！！ {{ userStore.username }}
          </h1>
          <p class="subtitle">IMBMVis</p>
        </div>
      </div>
    </el-card>
    <!-- svg -->
    <div class="svg">
      <SvgIcon name="welcome" width="600px" height="600px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
// store 挂载后加载用户信息
import { useUserStore } from '@/store/modules/user'
//
import { getTime } from '@/utils/getTime'

let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  // justify-content: center;
  align-items: center;

  .avatar {
    height: 150px;
    width: 150px;
    border-radius: 150px;
  }

  .bottom {
    margin-left: 30px;
    .title {
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 20px;
    }
    .subtitle {
      font-style: italic;
      color: rgb(166, 208, 208);
    }
  }
}

.svg {
  display: flex;
  justify-content: center;
}
</style>
