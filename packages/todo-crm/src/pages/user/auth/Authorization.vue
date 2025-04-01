<template>
  <main class="wrapper">
    <AuthComponent />
  </main>
</template>

<script setup>
import AuthComponent from '~/widgets/user/AuthComponent/AuthComponent.vue';
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
