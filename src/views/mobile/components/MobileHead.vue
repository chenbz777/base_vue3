<script setup>
import { useRoute } from 'vue-router';


const route = useRoute();
</script>

<template>
  <div class="mobile__head">
    {{ route.meta?.title || route.name }}
  </div>
</template>

<style scoped>
.mobile__head {
  padding: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  background-color: #eaeaea;
  border-bottom: 1px solid #e2e2e2;
}
</style>