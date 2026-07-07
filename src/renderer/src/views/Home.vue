<template>
  <div class="home">
    <header @mousedown="mousedown"></header>
    <div class="home">内容</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
onBeforeMount(() => { 
  window.electron.ipcRenderer.invoke("resize-window");

})
</script>
<style scoped >

</style>
