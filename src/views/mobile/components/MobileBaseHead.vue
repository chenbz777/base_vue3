<script setup>
</script>

<template>
  <div class="mobile-base-head">
    <div class="mobile-base-head__tool">
      <slot name="left" />
    </div>

    <div class="mobile__head__content">
      <slot />
    </div>

    <div class="mobile-base-head__tool mobile-base-head__tool--right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.mobile-base-head {
  height: 48px;
  padding: var(--p-1) var(--p-2);
  text-align: center;
  font-size: 18px;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
}

.mobile__head__content {
  flex: 2;
  width: 0;
  text-align: center;
}

.mobile-base-head__tool {
  flex: 1;
  display: flex;
  align-items: center;
}

.mobile-base-head__tool--right {
  justify-content: flex-end;
}
</style>