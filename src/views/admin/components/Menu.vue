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
    name: '仪表盘2',
    path: '/admin/home2/2',
    icon: 'Files'
  },
  {
    name: '仪表盘3',
    path: '/admin/home2/3',
    icon: 'Files'
  }
  // {
  //   name: '组织架构',
  //   path: '/admin/organizational',
  //   icon: 'User',
  //   children: [
  //     {
  //       name: '人员管理',
  //       path: '/admin/organizational/personnelManage'
  //     },
  //     {
  //       name: '部门管理',
  //       path: '/admin/organizational/departmentManage'
  //     },
  //     {
  //       name: '角色权限',
  //       path: '/admin/organizational/roleManage'
  //     }
  //   ]
  // }
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