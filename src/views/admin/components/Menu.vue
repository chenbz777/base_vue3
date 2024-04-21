<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MenuItem from './MenuItem.vue';
import { useMenu } from '@/stores';

const adminMenuData = [
  {
    name: '仪表盘',
    path: '/admin/home',
    icon: 'Files'
  },
  {
    name: '组织架构',
    path: '/admin/organizational',
    icon: 'User',
    children: [
      {
        name: '权限管理',
        path: '/admin/permissions'
      }
    ]
  }
];

const store = useMenu();

const route = useRoute();

const menuData = ref(adminMenuData);
</script>

<template>
  <div>
    <el-menu :router="true" :default-active="route.path" :collapse="!store.isOpen" v-if="menuData.length"
      class="el-menu-vertical">
      <MenuItem v-for="item in menuData" :key="item.path" :data="item" />
    </el-menu>
  </div>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: 0;
  background-color: transparent;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
}
</style>