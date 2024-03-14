<script setup>
import { onMounted } from 'vue';
import api from '@/api';


onMounted(() => {
  api.demo.get().then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <div>
    home
  </div>
</template>

<style scoped></style>
