<script setup>
</script>

<template>
  <div>
    home

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>

    <ImageEnhance :src="`https://img.chenbz.com/a_test/zwt1x1.png?index=${index}`" v-for="index in 10" :key="index">
    </ImageEnhance>
  </div>
</template>

<style scoped></style>