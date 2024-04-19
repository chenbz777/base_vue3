<script setup>
import { onMounted } from 'vue';


onMounted(() => {
  console.log('home mounted');
});
</script>

<template>
  <div class="home-1">
    <h2 class="m-0">home</h2>


    <router-link to="/mobile/home2">
      <h2>
        点击前往home2
      </h2>
    </router-link>
  </div>
</template>

<style scoped>
.home-1 {
  height: 100vh;
  background-color: #eaf4fe;
}
</style>