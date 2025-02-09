<template>
  <main class="wrapper">
    <slot></slot>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '~/assets/styles/mixins';

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
