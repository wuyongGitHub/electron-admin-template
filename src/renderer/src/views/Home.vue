<template>
  <div>
    <h1>Home</h1>
    <button @click="login">登录</button><el-button type="success">Success</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@store'
import { loginByJson } from '@api/login'

const store = useStore()
const login = async () => {
  const res = await loginByJson({
    username: 'admin',
    password: 'admin'
  })
}
</script>
