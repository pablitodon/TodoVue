<template>
  <transition name="fade" mode="out-in">
    <component
      :is="currentForm"
      @toggle-form="handleFormToggle"
      class="auth-form"
    />
  </transition>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import type { Component } from 'vue';
import { FormType } from '~/entites/user/user.types';
import AuthLoginForm from '~/features/user/login/ui/AuthLoginForm.vue';
import AuthRegisterForm from '~/features/user/register/ui/AuthRegisterForm.vue';

const currentForm = shallowRef<Component>(AuthLoginForm);

const handleFormToggle = (formType: FormType) => {
  currentForm.value =
    formType === 'login' ? AuthLoginForm : AuthRegisterForm;
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
