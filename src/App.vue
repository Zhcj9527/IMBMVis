<template>
  <div class="box">
    <h1>我是App</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const str = 'woaini'

const fun = () => {
  console.log(str)
}

fun()
</script>

<style scoped lang="scss">
.box {
  width: 400px;
  height: 600px;
  background: black;
  h1 {
    color: white;
  }
}
</style>
