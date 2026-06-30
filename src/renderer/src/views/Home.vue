<template>
  <div class="home">
    <header @mousedown="mousedown"></header>
    <div class="home">内容</div>
  </div>
</template>

<script setup>
import { useStore } from "@store"
let store = useStore();
import { loginByJson } from "@api/login";
const login = async () => {
  const res = await loginByJson({
    username: "admin",
    password: "<PASSWORD>",
  });
  console.log(res);
};
login();
</script>
<style scoped>

</style>
