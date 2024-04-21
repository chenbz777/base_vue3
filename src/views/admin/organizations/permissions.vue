<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';


const formConfig = [
  {
    label: '权限名称',
    key: 'name',
    type: 'input',
    required: true
  },
  {
    label: '权限描述',
    key: 'description',
    type: 'input',
    required: false
  },
  {
    label: '权限标识',
    key: 'url',
    type: 'input',
    required: true
  }
];

const getFormData = () => {
  return {
    name: '',
    description: '',
    url: ''
  };
};

const formData = ref(getFormData());

const tableConfig = [
  {
    label: '权限名称',
    key: 'name'
  },
  {
    label: '权限描述',
    key: 'description'
  },
  {
    label: '权限标识',
    key: 'url'
  }
];

const tableData = ref([]);

const total = ref(0);

const getList = (params = {}) => {
  api.permissions.list(params).then(res => {
    console.log('权限列表: ', res);

    tableData.value = res.list;
    total.value = res.total;
  });
};

onMounted(() => {
  getList();
});

const dialogVisible = ref(false);

function handleAdd() {
  formData.value = getFormData();
  dialogVisible.value = true;
}

function handleEdit(data) {
  formData.value = data;
  dialogVisible.value = true;
}

function handleDelete(data) {
  api.permissions.remove(data.id).then(() => {
    getList();
  });
}

function submit(data) {
  const req = data.id ? api.permissions.update(data) : api.permissions.create(data);

  req.then(() => {
    getList();
    dialogVisible.value = false;
  });
}
</script>

<template>
  <div>
    <el-button type="success" @click="handleAdd()">新增</el-button>

    <el-divider />

    <TablePro :tableConfig="tableConfig" :tableData="tableData" :total="total" @edit="handleEdit" @delete="handleDelete"
      @paginationChange="getList" />

    <el-dialog v-model="dialogVisible" :title="formData.id ? '编辑' : '新增'" width="600" destroy-on-close>
      <FormPro :formConfig="formConfig" :formData="formData" :showCancelBtn="true" :showResetBtn="false"
        submitBtnText="确认" label-width="120px" @submit="submit" @cancel="dialogVisible = false"></FormPro>
    </el-dialog>
  </div>
</template>

<style scoped></style>