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
  max-width: 100%;
  min-height: 100vh;
  background: var(--grey-bg);
  border: 0.0625rem solid var(--black);
  border-radius: 2rem;
  padding: 2rem;

  @include respond-to-desktop {
    padding: 1.5rem;
  }

  @include respond-to-laptop {
    padding: 1rem;
  }

  @include respond-to-tablet {
    padding: 0.75rem;
  }

  @include respond-to-phone {
    height: 100vh;
  }
}
</style>
