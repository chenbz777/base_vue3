<script setup>
import { ref, useSlots } from 'vue';
import { ElMessageBox } from 'element-plus';
import UpAndDownLayout from '@/components/UpAndDownLayout.vue';

// 插槽对象
const slots = useSlots();

// 表单ref
const tablePro = ref();

const emit = defineEmits(['paginationChange', 'edit', 'delete']);

const props = defineProps({
  tableConfig: {  // 表格配置
    required: true,
    type: Array,
    default: () => []
  },
  tableData: {  // 表格数据
    required: true,
    type: Array,
    default: () => []
  },
  total: {  // 总条数
    required: false,
    type: Number,
    default: 0
  },
  showEditBtn: {  // 显示编辑按钮
    required: false,
    type: Boolean,
    default: true
  },
  showDeleteBtn: {  // 显示删除按钮
    required: false,
    type: Boolean,
    default: true
  },
  operationsWidth: {  // 操作栏宽度
    required: false,
    type: Number,
    default: 200
  },
  openSelection: {  // 开启多选
    required: false,
    type: Boolean,
    default: false
  },
  showPagination: {  // 显示分页
    required: false,
    type: Boolean,
    default: true
  }
});


const replaceColumnData = (data, asValue) => {
  const keys = asValue.split('.');

  // 递归次数
  const count = keys.length;
  // 当前递归次数
  let i = 0;
  // 临时存储值
  let value = Object.assign({}, data);

  while (i < count) {
    value = value[keys[i]];

    i++;
  }

  return value;
};


const multipleSelection = ref([]);

const handleSelectionChange = (value) => {
  multipleSelection.value = value;
};

const current = ref(1);
const size = ref(10);

const handleSizeChange = (pageSize) => {
  size.value = pageSize;

  handlePagination();
};

const handleCurrentChange = (page) => {
  current.value = page;

  handlePagination();
};

// 改变了分页
const handlePagination = () => {
  emit('paginationChange', {
    current: current.value,
    size: size.value
  });
};

// 点击了编辑
const handleEdit = (data, index) => {
  emit('edit', data, index);
};

// 点击了删除
const handleDelete = (data, index) => {
  ElMessageBox.confirm(
    '删除后数据不可恢复,确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      emit('delete', data, index);
    })
    .catch(() => {
    });

};

// 重置分页
const resetPagination = (data = {}) => {

  current.value = data.current || 1;
  size.value = data.size || 10;
};

const getPagination = () => {
  return {
    current: current.value,
    size: size.value
  };
};

// 暴露函数
defineExpose({
  resetPagination,
  multipleSelection,
  getPagination
});
</script>

<template>
  <UpAndDownLayout>
    <el-table :data="props.tableData" border stripe style="width: 100%" ref="tablePro"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="props.openSelection" />
      <el-table-column :prop="item.key" :label="item.label" :width="item.width" v-for="item in props.tableConfig"
        :key="item.key">
        <template #default="scope">
          <slot v-if="slots[item.key]" :name="item.key" :data="scope.row"></slot>
          <span v-else-if="item.asValue">
            {{ replaceColumnData(scope.row, item.asValue) }}
          </span>
          <span v-else>
            {{ scope.row[item.key] }}
          </span>
        </template>
      </el-table-column>


      <el-table-column fixed="right" label="操作" :width="operationsWidth" v-if="operationsWidth">
        <template #default="scope">
          <slot name="operations" :data="JSON.parse(JSON.stringify(scope.row))"></slot>

          <el-button type="primary" text @click="handleEdit(JSON.parse(JSON.stringify(scope.row)), scope.$index)"
            v-if="props.showEditBtn">编辑</el-button>
          <el-button type="danger" text @click="handleDelete(JSON.parse(JSON.stringify(scope.row)), scope.$index)"
            v-if="props.showDeleteBtn">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #foot>
      <div class="p-3" v-if="showPagination">
        <el-pagination :page-sizes="[10, 20, 50, 100]" background layout="total, sizes, prev, pager, next, jumper"
          :total="props.total" v-model:current-page="current" v-model:page-size="size" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </template>
  </UpAndDownLayout>
</template>

<style scoped></style>