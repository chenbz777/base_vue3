<script setup>
import { ref, reactive, useSlots, toRefs } from 'vue';
import useAnimate from '@/hooks/useAnimate';

// 插槽对象
const slots = useSlots();

const { animateElement } = useAnimate();

// 表单ref
const formPro = ref();

const emit = defineEmits(['submit', 'cancel']);

const props = defineProps({
  formData: {
    required: false,
    type: Object,
    default: () => { }
  },
  formRules: {
    required: false,
    type: Array,
    default: () => []
  },
  formConfig: {
    required: false,
    type: Array,
    default: () => []
  },
  showSubmitBtn: {
    required: false,
    type: Boolean,
    default: true
  },
  showResetBtn: {
    required: false,
    type: Boolean,
    default: true
  },
  submitBtnText: {
    required: false,
    type: String,
    default: '提交'
  },
  showCancelBtn: {
    required: false,
    type: Boolean,
    default: false
  }
});

const { formData: myFormData, formConfig } = toRefs(props);

const getPlaceholder = (data) => {

  let trigger = 'change';
  let placeholder = `请选择${data.label}`;

  const arr = ['input', 'password', 'textarea', 'number'];

  if (arr.includes(data.type)) {
    trigger = 'blur';
    placeholder = `请填写${data.label}`;
  }

  return {
    trigger,
    placeholder
  };
};

const rules = reactive({});

formConfig.value.forEach(item => {
  const placeholderData = getPlaceholder(item);

  const { placeholder, trigger } = placeholderData;

  if (item.required) {

    rules[item.key] = item.rule || [
      { required: true, message: placeholder, trigger }
    ];
  }

  if (!item.placeholder) {
    item.placeholder = placeholder;
  }
});

const submit = () => {
  emit('submit', JSON.parse(JSON.stringify(myFormData.value)));
};

const validate = (elmId) => {
  return new Promise((resolve, reject) => {
    formPro.value.validate((valid, fields) => {
      if (valid) {
        submit();

        resolve(true);
      } else {

        // 振动动画
        animateElement(`#${elmId}`, 'animate__wobble');

        reject(fields);
      }
    });
  });
};

const reset = () => {
  formPro.value.resetFields();
};

const clearValidate = (data) => {
  formPro.value.clearValidate(data);
};

// 暴露函数
defineExpose({
  reset,
  validate,
  submit,
  clearValidate
});

const defaultDisplayConditions = () => {
  return true;
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <el-form :model="myFormData" :rules="rules" ref="formPro" label-width="120px" @submit.prevent>
    <template v-for="item in props.formConfig" :key="item.key">
      <el-form-item :label="item.label" :prop="item.key"
        v-if="item.displayConditions ? item.displayConditions(myFormData) : defaultDisplayConditions()">
        <!-- 预留自定义表单 -->
        <slot v-if="slots[item.key]" :name="item.key" :value="myFormData[item.key]" :config="item"></slot>
        <!-- 输入框 -->
        <el-input v-else-if="item.type === 'input'" v-model="myFormData[item.key]" :placeholder="item.placeholder"
          :disabled="item.disabled" clearable :maxlength="item.props?.maxlength" />
        <!-- 密码框 -->
        <el-input v-else-if="item.type === 'password'" v-model="myFormData[item.key]" type="password"
          :placeholder="item.placeholder" :disabled="item.disabled" show-password clearable />
        <!-- 文本框 -->
        <el-input v-else-if="item.type === 'textarea'" v-model="myFormData[item.key]"
          :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" :placeholder="item.placeholder"
          :disabled="item.disabled" clearable />
        <!-- 数字输入框 -->
        <el-input-number v-else-if="item.type === 'number'" v-model="myFormData[item.key]" controls-position="right"
          :disabled="item.disabled" :precision="item.props.precision ?? 2" />
        <!-- 单选 -->
        <el-radio-group v-else-if="item.type === 'radio'" v-model="myFormData[item.key]">
          <el-radio v-for="option in item.options" :key="option[item.props.key]" :value="option[item.props.value]">
            {{ option[item.props.label] }}
          </el-radio>
        </el-radio-group>
        <!-- 单选按钮组 -->
        <el-radio-group v-else-if="item.type === 'radioBtn'" v-model="myFormData[item.key]">
          <el-radio-button v-for="option in item.options" :key="option[item.props.key]"
            :value="option[item.props.value]" :label="option[item.props.label]">
          </el-radio-button>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="myFormData[item.key]">
          <el-checkbox v-for="option in item.options" :key="option[item.props.key]" :value="option[item.props.value]">
            {{ option[item.props.label] }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- 下拉单选 or 多选 -->
        <el-select v-else-if="item.type === 'select'" :multiple="item.props.multiple" v-model="myFormData[item.key]"
          :placeholder="item.placeholder" :disabled="item.disabled" clearable>
          <el-option v-for="option in item.options" :key="option[item.props.key]" :label="option[item.props.label]"
            :value="option[item.props.value]" />
        </el-select>
        <!-- 联级单选 or 多选 -->
        <el-cascader v-else-if="item.type === 'cascader'" v-model="myFormData[item.key]" :options="item.options"
          :show-all-levels="false" :props="item.props" :placeholder="item.placeholder" :disabled="item.disabled"
          clearable />
        <!-- 开关 -->
        <el-switch v-else-if="item.type === 'switch'" v-model="myFormData[item.key]" :disabled="item.disabled" />
        <!-- 时间 -->
        <el-time-picker v-else-if="item.type === 'time'" v-model="myFormData[item.key]" :placeholder="item.placeholder"
          :disabled="item.disabled" format="hh:mm:ss" value-format="hh:mm:ss" />
        <!-- 时间 to 时间 -->
        <el-time-picker v-else-if="item.type === 'timeToTime'" v-model="myFormData[item.key]" is-range
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :disabled="item.disabled"
          format="hh:mm:ss" value-format="hh:mm:ss" />
        <!-- 日期 -->
        <el-date-picker v-else-if="item.type === 'date'" v-model="myFormData[item.key]" type="date" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" :placeholder="item.placeholder" :disabled="item.disabled" />
        <!-- 日期 to 日期 -->
        <el-date-picker v-else-if="item.type === 'dateToDate'" v-model="myFormData[item.key]"
          :placeholder="item.placeholder" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="item.disabled" />
        <!-- 日期时间 -->
        <el-date-picker v-else-if="item.type === 'datetime'" v-model="myFormData[item.key]" type="datetime"
          format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" :placeholder="item.placeholder"
          :disabled="item.disabled" />
        <!-- 日期时间 to 日期时间 -->
        <el-date-picker v-else-if="item.type === 'datetimeToDatetime'" v-model="myFormData[item.key]"
          type="datetimerange" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :disabled="item.disabled" />

        <div v-if="item.tips" class="w-100">
          <div class="g-tips" v-for="tip in item.tips" :key="tip">{{ tip }}</div>
        </div>
      </el-form-item>
    </template>

    <el-form-item
      v-if="[!!slots.operations, props.showSubmitBtn, props.showResetBtn, props.showCancelBtn].includes(true)"
      :class="{ 'operations--right': props.showCancelBtn }">
      <!-- 预留自定义区域 -->
      <slot name="operations"></slot>

      <el-button @click="handleCancel()" v-if="props.showCancelBtn">取消</el-button>
      <el-button type="primary" @click="validate('formProSubmitBtn')" id="formProSubmitBtn" v-if="props.showSubmitBtn">
        {{ props.submitBtnText }}
      </el-button>
      <el-button @click="reset()" v-if="props.showResetBtn">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
:deep(.el-upload-list__item .el-icon--close-tip) {
  display: none !important;
}

:deep(.upload-mini .el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

:deep(.upload-mini .el-upload-list__item) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload--none .el-upload--picture-card) {
  display: none;
}

:deep(.el-form-item .el-form-item) {
  margin-bottom: 18px;
}

.operations--right :deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
</style>