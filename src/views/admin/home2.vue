<script setup>
import { ref, onMounted } from 'vue';

const num = ref(2);

onMounted(() => {
  console.log('home2 onMounted');
});
</script>

<template>
  <div>
    home
    <el-input-number v-model="num" />
  </div>
</template>

<style scoped></style>