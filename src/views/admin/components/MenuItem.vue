<script setup>
// import { ref, reactive } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


const props = defineProps({
  data: {
    required: true,
    type: Object
  }
});

</script>

<template>
  <el-sub-menu v-if="props.data.children && props.data.children.length" :index="props.data.path">
    <template #title>
      <el-icon v-if="props.data.icon">
        <component :is="ElementPlusIconsVue[props.data.icon]"></component>
      </el-icon>
      <span>{{ props.data.name }}</span>
    </template>

    <MenuItem v-for="item in props.data.children" :key="item.path" :data="item" />
  </el-sub-menu>


  <el-menu-item v-else :index="props.data.path">
    <el-icon v-if="props.data.icon">
      <component :is="ElementPlusIconsVue[props.data.icon]"></component>
    </el-icon>
    <span>{{ props.data.name }}</span>
  </el-menu-item>
</template>

<style scoped>
:deep(.el-sub-menu__title) {
  border-radius: var(--br-2);
  height: 46px !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
}

.el-sub-menu .el-menu-item {
  padding-left: 60px !important;
}

.el-menu-item {
  margin: 3px 0;
  border-radius: var(--br-2);
  height: 46px !important;
}

.el-menu-item:hover {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
}

.el-menu-item.is-active,
.el-menu-item:hover {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
}
</style>
