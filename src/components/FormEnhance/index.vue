<script setup>
import { ref, useSlots, watch } from 'vue';
import FormItemModel from './Model/FormItemModel';
import { ElMessage } from 'element-plus';
import UploadFile from '@/components/UploadFile.vue';


// 插槽对象
const slots = useSlots();

// 表单ref
const formRef = ref(null);

const props = defineProps({
  formData: {
    required: true,
    type: Object,
    default: () => { }
  },
  formConfig: {
    required: true,
    type: Array,
    default: () => []
  },
  operationConfig: {
    required: false,
    type: Array,
    default: () => []
  },
  operationPosition: {
    required: false,
    type: String,
    default: 'left'  // 居左: left, 居右: right, 居中: center
  },
  labelPosition: {
    required: false,
    type: String,
    default: 'right'  // 居左: left, 居右: right, 顶部: top
  },
  inline: {
    required: false,
    type: Boolean,
    default: false
  },
  isReadOnly: {
    required: false,
    type: Boolean,
    default: false
  },
  labelWidth: {
    required: false,
    type: String,
    default: 'auto'
  }
});

const myFormConfig = ref([]);

// 初始化表单配置
myFormConfig.value = props.formConfig.map(item => {
  return new FormItemModel(item);
});

// 初始化远程 options 数据
myFormConfig.value.forEach(item => {
  // 如果有远程数据
  if (item.props.optionsPromise) {
    // 获取远程数据
    item.props.optionsPromise().then(res => {
      // 设置 options
      item.props.options = res;
    });
  }
});

/**
 * 初始化表单校验规则
 */
const myRules = ref({});

myFormConfig.value.forEach(item => {
  if (item.required) {
    myRules.value[item.key] = item.props.getRules();
  }

  if (item.rules) {
    myRules.value[item.key] = item.rules;

    item.required = true;
  }
});

/**
 * end 初始化表单校验规则
 */


// 扁平化对象：将嵌套对象转化为 'parent.child' 的形式
function flattenObject(obj, prefix = '') {
  // 存储最终结果的扁平对象
  let result = {};

  // 遍历当前对象的所有可枚举属性
  for (const key in obj) {
    // 安全检测：确保只处理对象自身的属性（跳过原型链属性）
    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      /* 键名生成逻辑 */
      // 当前属性路径：如果有前缀则拼接，否则直接使用当前键
      // 示例：prefix='parent', key='child' => 'parent.child'
      const newKey = prefix ? `${prefix}.${key}` : key;

      // 获取当前属性值
      const value = obj[key];

      /* 值处理逻辑 */
      // 如果是数组，则保留原结构
      if (Array.isArray(value)) {
        result[newKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        // 递归情况：值为对象/数组时继续深层扁平化
        // 使用 Object.assign 合并深层扁平化结果到当前结果集
        Object.assign(
          result,
          flattenObject(value, newKey) // 递归时传递拼接后的新键名作为前缀
        );
      } else {
        // 基础情况：原始值直接存入结果对象
        result[newKey] = value;
      }
    }
  }

  return result;
}

// 恢复扁平对象：将扁平对象转化为嵌套对象
function unfastenObject(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const path = key.split('.');
    let current = result;

    for (let i = 0; i < path.length; i++) {
      const part = path[i];
      const isLast = i === path.length - 1;

      // 更严格的数组索引检测逻辑
      let isNextPartArrayIndex = false;
      if (!isLast) {
        const nextPart = path[i + 1];
        const num = Number(nextPart);

        // 同时满足：
        // 1. 是有效数字
        // 2. 是非负整数
        // 3. 数字的字符串形式与原字符串严格一致（避免前导零等问题）
        isNextPartArrayIndex = (
          !isNaN(num) &&                     // 是有效数字
          Number.isInteger(num) &&           // 是整数
          num >= 0 &&                        // 非负
          num <= 4294967295 &&               // 在数组最大索引范围内
          String(num) === nextPart           // 严格匹配格式
        );
      }

      if (!isLast) {
        if ((current[part] === undefined) || (current[part] === null)) {
          // 根据下一层级是否为数组索引，决定创建数组或对象
          current[part] = isNextPartArrayIndex ? [] : {};
        }
        current = current[part];
      } else {
        current[part] = value;
      }
    }
  }

  return result;
}

/**
 * 初始化表单数据
 */

const myFormData = ref({});

function initFormData() {
  myFormData.value = flattenObject(props.formData);

  const myFormDataKeys = Object.keys(myFormData.value);

  // 兜底默认值
  myFormConfig.value.forEach(formItem => {
    // 如果表单数据中没有该字段，则使用默认值
    if (!myFormDataKeys.includes(formItem.key)) {
      myFormData.value[formItem.key] = formItem.props.getDefaultValue();
    }

    // 如果表单数据为null，则使用默认值
    if (myFormData.value[formItem.key] === null) {
      myFormData.value[formItem.key] = formItem.props.getDefaultValue();
    }

    // 特殊处理：时间范围选择
    if (['timeToTime', 'dateToDate', 'dateTimeToDateTime'].includes(formItem.type)) {
      // 时间范围选择, 把startKey和endKey的值合并到key中
      if (formItem.props.startKey && formItem.props.endKey) {
        if (myFormData.value[formItem.props.startKey] && myFormData.value[formItem.props.endKey]) {
          myFormData.value[formItem.key] = [
            myFormData.value[formItem.props.startKey],
            myFormData.value[formItem.props.endKey]
          ];

          // 删除原始的时间范围数据
          delete myFormData.value[formItem.props.startKey];
          delete myFormData.value[formItem.props.endKey];
        }
      }
    }
  });
}

watch(() => props.formData, (value) => {
  initFormData();
}, {
  deep: true,
  immediate: true
});
/**
 * end 初始化表单数据
 */


class Operation {
  constructor(operationData = {}) {
    Object.assign(this, {
      text: '操作按钮',
      type: 'primary',  // primary / success / warning / danger / info
      clickFn: () => {
        ElMessage({
          message: '功能暂未开放',
          type: 'warning'
        });
      }
    }, operationData);
  }
}

// 获取表单数据
function getFormData() {
  const _formData = JSON.parse(JSON.stringify(myFormData.value));

  myFormConfig.value.forEach(formItem => {
    // 特殊处理：时间范围选择
    if (['timeToTime', 'dateToDate', 'dateTimeToDateTime'].includes(formItem.type)) {
      // 时间范围选择，拆分为 startKey 和 endKey
      if (_formData[formItem.key] && _formData[formItem.key].length) {
        if (formItem.props.startKey && formItem.props.endKey) {
          _formData[formItem.props.startKey] = _formData[formItem.key][0];
          _formData[formItem.props.endKey] = _formData[formItem.key][1];

          // 删除原始的时间范围数据
          delete _formData[formItem.key];
        }
      }
    }
  });

  return unfastenObject(_formData);
}

// 校验成功后执行回调
function validateSuccess(callbackFn) {
  formRef.value.validate((valid, errorList) => {
    if (valid) {
      callbackFn(getFormData());
    } else {
      formRef.value.scrollToField(Object.keys(errorList)[0]);
    }
  });
}

const defineExposeData = {
  formRef,
  getFormData,
  validateSuccess
};

const operationList = props.operationConfig.map(item => new Operation(item));

function handleOperationClick(operation) {
  operation.clickFn(defineExposeData);
}

defineExpose(defineExposeData);
</script>

<template>
  <div>
    <el-form :model="myFormData" ref="formRef" :rules="myRules" :label-width="labelWidth" :inline="inline"
      @submit.prevent class="form-enhance" :class="{ 'form-enhance-inline': inline }" :label-position="labelPosition">
      <AnimateTransitionGroup>
        <template v-for="formItem in myFormConfig" :key="formItem.key">

          <div class="form-enhance__group-title" v-if="formItem.groupTitle">
            {{ formItem.groupTitle }}
          </div>

          <el-form-item :label="formItem.label" :prop="formItem.key" v-if="formItem.showFn(myFormData)">
            <template #label>
              {{ formItem.label }}
            </template>

            <!-- 预留自定义表单 -->
            <slot v-if="slots[formItem.key]" :name="formItem.key" :formItem="formItem"></slot>

            <template v-else-if="isReadOnly">
              <div class="form-item-read-only">
                <div class="form-item-read-only__content" v-html="formItem.props.getText(myFormData[formItem.key])">
                </div>
              </div>
            </template>

            <!-- 输入框 -->
            <el-input v-else-if="formItem.type === 'input'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :maxlength="formItem.props.maxLength" :show-word-limit="formItem.props.showLimit"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @input="formItem.onChange($event, { formItem, formData: myFormData })">
              <template #prepend v-if="formItem.props.prefix">{{ formItem.props.prefix }}</template>
              <template #append v-if="formItem.props.suffix">{{ formItem.props.suffix }}</template>
            </el-input>

            <!-- 文本框 -->
            <el-input v-else-if="formItem.type === 'textarea'" v-model="myFormData[formItem.key]"
              :autosize="{ minRows: formItem.props.minRows, maxRows: formItem.props.maxRows }" type="textarea"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :show-word-limit="formItem.props.showLimit" :maxlength="formItem.props.maxLength"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @input="formItem.onChange($event, { formItem, formData: myFormData })">
            </el-input>

            <!-- 数字输入框 -->
            <el-input-number v-else-if="formItem.type === 'number'" v-model="myFormData[formItem.key]"
              :controls-position="formItem.props.controlsPosition" :disabled="formItem.props.disabled"
              :precision="formItem.props.precision" :min="formItem.props.min" :max="formItem.props.max"
              :style="formItem.props.style" @change="formItem.onChange($event, { formItem, formData: myFormData })">
              <template #prefix v-if="formItem.props.prefix">
                {{ formItem.props.prefix }}
              </template>
              <template #suffix v-if="formItem.props.suffix">
                {{ formItem.props.suffix }}
              </template>
            </el-input-number>

            <!-- 开关 -->
            <el-switch v-else-if="formItem.type === 'switch'" v-model="myFormData[formItem.key]"
              :disabled="formItem.props.disabled" :active-value="formItem.props.activeValue"
              :inactive-value="formItem.props.inactiveValue" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 时间 -->
            <el-time-picker v-else-if="formItem.type === 'time'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled" format="HH:mm:ss"
              value-format="HH:mm:ss" :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 时间 to 时间 -->
            <el-time-picker v-else-if="formItem.type === 'timeToTime'" v-model="myFormData[formItem.key]" is-range
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled" format="HH:mm:ss"
              value-format="HH:mm:ss" :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 日期 -->
            <el-date-picker v-else-if="formItem.type === 'date'" v-model="myFormData[formItem.key]" type="date"
              format="YYYY-MM-DD" value-format="YYYY-MM-DD" :placeholder="formItem.props.placeholder"
              :disabled="formItem.props.disabled" :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 日期 to 日期 -->
            <el-date-picker v-else-if="formItem.type === 'dateToDate'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 日期时间 -->
            <el-date-picker v-else-if="formItem.type === 'dateTime'" v-model="myFormData[formItem.key]" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :placeholder="formItem.props.placeholder"
              :disabled="formItem.props.disabled" :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 日期时间 to 日期时间 -->
            <el-date-picker v-else-if="formItem.type === 'dateTimeToDateTime'" v-model="myFormData[formItem.key]"
              type="datetimerange" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
              :range-separator="formItem.props.rangeSeparator" :start-placeholder="formItem.props.startPlaceholder"
              :end-placeholder="formItem.props.endPlaceholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />

            <!-- 上传 -->
            <UploadFile v-else-if="formItem.type === 'uploadFile'" v-model="myFormData[formItem.key]"
              :option="formItem.props" :disabled="formItem.props.disabled" :style="formItem.props.style" />

            <!-- 单选 -->
            <el-radio-group v-else-if="formItem.type === 'radio'" v-model="myFormData[formItem.key]"
              :style="formItem.props.style" @change="formItem.onChange($event, { formItem, formData: myFormData })">
              <el-radio v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :value="option[formItem.props.value]">
                {{ option[formItem.props.label] }}
              </el-radio>
            </el-radio-group>

            <!-- 多选框 -->
            <el-checkbox-group v-else-if="formItem.type === 'checkbox'" v-model="myFormData[formItem.key]"
              :style="formItem.props.style" @change="formItem.onChange($event, { formItem, formData: myFormData })">
              <el-checkbox v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :value="option[formItem.props.value]">
                {{ option[formItem.props.label] }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 下拉单选 -->
            <el-select v-else-if="formItem.type === 'select'" v-model="myFormData[formItem.key]"
              :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })">
              <el-option v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :label="option[formItem.props.label]" :value="option[formItem.props.value]" />
            </el-select>

            <!-- 下拉单选 -->
            <el-select v-else-if="formItem.type === 'selectMultiple'" v-model="myFormData[formItem.key]"
              :multiple="true" :placeholder="formItem.props.placeholder" :disabled="formItem.props.disabled"
              :clearable="formItem.props.clearable" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })">
              <el-option v-for="option in formItem.props.options" :key="option[formItem.props.key]"
                :label="option[formItem.props.label]" :value="option[formItem.props.value]" />
            </el-select>

            <!-- 颜色 -->
            <el-color-picker v-else-if="formItem.type === 'color'" v-model="myFormData[formItem.key]"
              :disabled="formItem.props.disabled" :style="formItem.props.style"
              @change="formItem.onChange($event, { formItem, formData: myFormData })" />
          </el-form-item>
        </template>
      </AnimateTransitionGroup>

      <el-form-item>
        <div class="form-enhance__operation" :style="{ textAlign: operationPosition }">
          <template v-for="operation in operationList" :key="operation.text">
            <el-button :type="operation.type" @click="handleOperationClick(operation)">
              {{ operation.text }}
            </el-button>
          </template>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-enhance__operation {
  flex: 1;
}

.form-enhance-inline :deep(.el-input) {
  --el-input-width: 220px;
}

.form-enhance-inline :deep(.el-select) {
  --el-select-width: 160px;
}

.el-form-item__label--required {
  color: #f56c6c;
  margin-right: 4px;
}

.form-item-read-only {
  flex: 1;
  width: 0;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.form-item-read-only__content:empty::before {
  content: '---';
  color: #999;
}

.form-enhance__group-title {
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #eff1f3;
  margin-top: 24px;
  margin-bottom: 12px;
  padding: 12px;
  color: #606266;
}

.form-enhance__group-title:first-child {
  margin-top: 0;
}
</style>