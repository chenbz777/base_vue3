<script setup>
import { ref, onMounted } from 'vue';
import FormEnhance from '@/components/FormEnhance/index.vue';


onMounted(() => {
  console.log('home onMounted');
});

const formData = ref({});

const options = [
  {
    label: '选项1',
    value: '1'
  },
  {
    label: '选项2',
    value: '2'
  }
];

const formConfig = [
  {
    label: '输入框',
    key: 'input',
    type: 'input',
    required: true
  },
  {
    label: '多行输入框',
    key: 'textarea',
    type: 'textarea',
    required: true,
    props: {
      textFormat: '邮箱'
    },
    showFn: (_formData) => {
      return _formData.input === '1';
    }
  },
  {
    label: '数字输入框',
    key: 'number',
    type: 'number',
    required: true
  },
  {
    label: '开关',
    key: 'switch',
    type: 'switch',
    required: true
  },
  {
    label: '时间',
    key: 'time',
    type: 'time',
    required: false
  },
  {
    label: '时间范围',
    key: 'timeToTime',
    type: 'timeToTime',
    required: false,
    props: {
      startKey: 'startTime',
      endKey: 'endTime'
    }
  },
  {
    label: '日期',
    key: 'date',
    type: 'date',
    required: false
  },
  {
    label: '日期范围',
    key: 'dateToDate',
    type: 'dateToDate',
    required: false
  },
  {
    label: '日期时间',
    key: 'dateTime',
    type: 'dateTime',
    required: false
  },
  {
    label: '日期时间范围',
    key: 'dateTimeToDateTime',
    type: 'dateTimeToDateTime',
    required: false
  },
  {
    label: '文件',
    key: 'uploadFile',
    type: 'uploadFile',
    required: false
  },
  {
    label: '单选',
    key: 'radio',
    type: 'radio',
    required: false,
    props: {
      options,
      key: 'value',
      value: 'value',
      label: 'label'
    }
  },
  {
    label: '多选框',
    key: 'checkbox',
    type: 'checkbox',
    required: false,
    props: {
      options,
      key: 'value',
      value: 'value',
      label: 'label'
    }
  },
  {
    label: '下拉框',
    key: 'select',
    type: 'select',
    required: false,
    props: {
      options,
      key: 'value',
      value: 'value',
      label: 'label'
    }
  },
  {
    label: '下拉多选框',
    key: 'selectMultiple',
    type: 'selectMultiple',
    required: false,
    props: {
      options,
      key: 'value',
      value: 'value',
      label: 'label'
    }
  }
];

const operationConfig = [
  {
    text: '提交',
    type: 'primary',
    clickFn: (data) => {
      const { validateSuccess } = data;

      validateSuccess((myFormData) => {
        console.log('校验通过');
        console.log('myFormData: ', myFormData);
      });
    }
  }
];
</script>

<template>
  <div>
    home
    <FormEnhance :formData="formData" :formConfig="formConfig" :operationConfig="operationConfig"></FormEnhance>
  </div>
</template>

<style scoped></style>