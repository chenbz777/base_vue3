<script setup>
import Menu from './Menu.vue';
import useMenu from '@/hooks/useMenu';
import { ElementPlus } from '@element-plus/icons-vue';


const { showTitle, title } = useMenu();
</script>

<template>
  <div>
    <div class="admin__aside__head">
      <el-icon :size="30">
        <ElementPlus />
      </el-icon>
      <span v-show="showTitle">{{ title }}</span>
    </div>

    <Menu class="admin__aside__menu" />
  </div>
</template>

<style scoped>
.admin__aside__head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--p-2);
  height: 60px;
  font-size: var(--fs-4);
  font-weight: 500;
  color: var(--primary-color);
}
</style>