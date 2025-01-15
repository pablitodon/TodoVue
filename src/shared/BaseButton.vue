<template>
  <button class="button-submit" type="submit">
    <slot>Продолжить</slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use '../assets/styles/mixins' as mixin;

.button-submit {
  @include mixin.button-styles-form(var(--green), var(--shadow-green-button));
}
</style>

<!-- сделать динамичным текст  и классы -->
