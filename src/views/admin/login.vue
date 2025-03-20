<script setup>
import { ref } from 'vue';
import useMenu from '@/hooks/useMenu/index.js';
import useAnimate from '@/hooks/useAnimate/index.js';

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

        <div class="login--forgot-password">
          <el-button text>忘记密码?</el-button>
        </div>

        <el-button type="primary" size="large" round class="login__btn" id="loginBtn" @click="validateForm()">
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
  background-color: #f8f8f8;
}

.login__content {
  padding: 30px 20px;
  border-radius: 8px;
  width: 500px;
  background-color: white;
}

.login__content__title {
  font-size: 30px;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 60px;
  color: var(--theme-active);
  font-weight: bold;
}

.login__btn {
  margin-top: 30px;
  width: 100%;
  letter-spacing: 10px;
  font-size: 18px;
  background-color: var(--theme-active);
}

.login--forgot-password {
  text-align: right;
}

:deep(.el-input__wrapper) {
  padding: 5px 20px;
}
</style>