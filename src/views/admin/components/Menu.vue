<script setup>
import { useRoute } from 'vue-router';
import MenuItem from './MenuItem.vue';
import useMenu from '@/hooks/useMenu';

const route = useRoute();

const { isOpen, menuList } = useMenu();
</script>

<template>
  <div>
    <el-menu :router="true" :default-active="route.path" :collapse="!isOpen" v-if="menuList.length"
      class="el-menu-vertical">
      <MenuItem v-for="item in menuList" :key="item.path" :data="item">
      </MenuItem>
    </el-menu>
  </div>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: 0;
  background-color: transparent;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
</style>