<script setup>
import { ref, nextTick, onMounted } from 'vue';

const props = defineProps({
  height: {
    required: false,
    type: String,
    default: ''
  }
});

const randomString = (length = 16) => {

  const strList = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = strList.length;
  let str = '';

  for (let i = 0; i < length; i++) {
    str += strList.charAt(Math.floor(Math.random() * a));
  }

  return str;
};

const headId = ref(randomString());
const contentId = ref(randomString());
const footId = ref(randomString());

onMounted(async () => {
  await nextTick();

  const headDom = document.getElementById(headId.value);
  const contentDom = document.getElementById(contentId.value);
  const footDom = document.getElementById(footId.value);

  const headHeight = headDom.offsetHeight;
  const footHeight = footDom.offsetHeight;

  contentDom.style.paddingTop = `${headHeight}px`;
  contentDom.style.paddingBottom = `${footHeight}px`;
  contentDom.style.height = props.height ? props.height : '100%';
});
</script>

<template>
  <div class="udl">
    <div class="udl__head" :id="headId">
      <slot name="head" />
    </div>
    <div class="udl__content" :id="contentId">
      <slot />
    </div>
    <div class="udl__foot" :id="footId">
      <slot name="foot" />
    </div>
  </div>
</template>

<style scoped>
.udl {
  position: relative;
}

.udl__head {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
  width: 100%;
  background-color: white;
}

.udl__content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.udl__foot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
  width: 100%;
  background-color: white;
}
</style>
