<template>
  <main class="wrapper">
    <AuthSwitcher />
  </main>
</template>

<script setup>
import AuthSwitcher from '~/widgets/user/AuthSwitcher/AuthSwitcher.vue';
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
