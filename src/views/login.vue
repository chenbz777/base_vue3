<script setup>
import { ref } from 'vue';
import useMenu from '@/hooks/useMenu/index.js';
import useAnimate from '@/hooks/useAnimate/index.js';
import { User, Lock } from '@element-plus/icons-vue';


const { title } = useMenu();

const formRef = ref();

const { animateElement } = useAnimate();

const formData = ref({
  username: '',
  password: ''
});

const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

/**
 * @author: chenbz
 * @description: 表单验证
 * @return {*}
 */
const validateForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      login();
    } else {
      animateElement('#loginBtn', 'animate__shakeX');
    }
  });
};

const login = () => {
  console.log('login');
};
</script>

<template>
  <div class="login">
    <div class="login__content">
      <div class="login__content__title">
        {{ title }}
      </div>

      <div class="login__content__card">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" label-position="top" size="large"
          status-icon>
          <el-form-item prop="username">
            <el-input v-model="formData.username" placeholder="请输入账号" clearable>
              <template #prefix>
                <el-icon :size="20">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" clearable>
              <template #prefix>
                <el-icon :size="20">
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" class="login__btn" id="loginBtn" @click="validateForm()">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary-color);
}

.login__content {
  padding: var(--p-4);
  border-radius: var(--br-2);
  width: 500px;
  background-color: var(--bg-base-color);
}

.login__content__title {
  font-size: var(--fs-5);
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: var(--m-5);
  color: var(--primary-color);
  font-weight: bold;
}

.login__btn {
  margin-top: var(--m-3);
  width: 100%;
  letter-spacing: 10px;
  font-size: var(--fs-4);
  background-color: var(--primary-color);
  border-radius: var(--br-2);
}

:deep(.el-input__wrapper) {
  padding: var(--p-1) var(--p-2);
  border-radius: var(--br-2);
}
</style>