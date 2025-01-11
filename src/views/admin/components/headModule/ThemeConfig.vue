<script setup>
import { ref } from 'vue';
import localStorage from '@/utils/localStorage';


const drawer = ref(false);

const formProRef = ref(null);

function open() {
  drawer.value = true;
}

function clone() {
  drawer.value = false;
}

const themeMap = {
  themePageBg: '--theme-page-bg',
  themePageSecondaryBg: '--theme-page-secondary-bg',
  themeActive: '--theme-active',
  themeActiveContrast: '--theme-active-contrast',
  themePrimaryText: '--theme-primary-text',
  themeRegularText: '--theme-regular-text',
  themeSecondaryText: '--theme-secondary-text',
  themeBaseBorder: '--theme-base-border',
  themeBorderRadius: '--theme-border-radius'
};

function confirm() {
  drawer.value = false;

  const _formData = formProRef.value.getFormData();

  const theme = {};

  for (const key in _formData) {
    const themeKey = themeMap[key];
    const value = _formData[key];

    document.documentElement.style.setProperty(themeKey, value);

    theme[themeKey] = value;
  }

  localStorage.set('theme', theme);
}

defineExpose({
  open
});

const formData = ref({});

function handleOpen() {
  const root = getComputedStyle(document.documentElement);

  const getPropertyValue = (name) => {
    return root.getPropertyValue(name).trim();
  };

  for (const key in themeMap) {
    formData.value[key] = getPropertyValue(themeMap[key]);
  }
}

const formConfig = [
  {
    key: 'themePageBg',
    label: '页面背景色',
    type: 'color'
  },
  {
    key: 'themePageSecondaryBg',
    label: '页面次要背景色',
    type: 'color'
  },
  {
    key: 'themeActive',
    label: '主题色',
    type: 'color'
  },
  {
    key: 'themeActiveContrast',
    label: '主题色对比色',
    type: 'color'
  },
  {
    key: 'themePrimaryText',
    label: '主要文字颜色',
    type: 'color'
  },
  {
    key: 'themeRegularText',
    label: '常规文字颜色',
    type: 'color'
  },
  {
    key: 'themeSecondaryText',
    label: '次要文字颜色',
    type: 'color'
  },
  {
    key: 'themeBaseBorder',
    label: '基础边框颜色',
    type: 'color'
  },
  {
    key: 'themeBorderRadius',
    label: '边框圆角',
    type: 'input'
  }
];
</script>

<template>
  <div>
    <el-drawer v-model="drawer" direction="rtl" size="500px" @open="handleOpen">
      <template #header>
        <h4>主题设置</h4>
      </template>

      <div>
        <FormPro :formData="formData" :formConfig="formConfig" ref="formProRef"></FormPro>
      </div>

      <template #footer>
        <el-button @click="clone()">取消</el-button>
        <el-button type="primary" @click="confirm()">保存</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>