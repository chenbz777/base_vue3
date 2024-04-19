<script setup>
import { onMounted } from 'vue';


onMounted(() => {
  console.log('home2 mounted');
});
</script>

<template>
  <div class="home-2">
    <h2 class="m-0">
      home2
    </h2>

    <router-link to="/mobile/home3">
      <h2>
        点击千万home3
      </h2>
    </router-link>
  </div>
</template>

<style scoped>
.home-2 {
  height: 100vh;
  background-color: #ecb572;
}
</style>