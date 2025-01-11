<script setup>
import Menu from './Menu.vue';
import { useMenu } from '@/stores';

const store = useMenu();
</script>

<template>
  <div>
    <div class="admin__aside__head">
      <el-icon :size="30">
        <ElementPlus />
      </el-icon>
      <span v-show="store.showTitle">{{ store.title }}</span>
    </div>

    <Menu class="admin__aside__menu" />
  </div>
</template>

<style scoped>
.admin__aside__head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 60px;
  font-size: 22px;
  font-weight: 500;
  color: var(--theme-active);
}
</style>