<template>
  <div>
    <h1>Axios TSET</h1>
  </div>
</template>

<script setup lang="ts">
import request from './utils/request';
import { onMounted } from 'vue';

onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then((res) => {
    console.log(res);
    
  })
})

</script>

<style scoped lang="scss">
div{
  h1 {
    color: $color;
  }
}
</style>
