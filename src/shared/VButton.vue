<template>
  <button
    class="btn"
    :class="[
      `btn-${props.target}`,
      `btn-${props.styleType}`,
      { disabled: props.disabled || props.invalid },
    ]"
    :type="props.type"
    :disabled="props.disabled || props.invalid"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  target?: 'submit' | 'toggle' | 'modal-button' | 'dashboard-button';
  styleType?: 'rectangle' | 'rounded-8' | 'rounded-32' | 'rounded-40';
  disabled?: boolean;
  invalid?: boolean;
  type?: 'submit' | 'button' | 'reset';
}>();
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  background-color: var(--white);

  &.disabled {
    background-color: var(--grey-stop);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &-submit {
    width: 100%;
    padding: 15px 0;
    background-color: var(--green);

    &:hover {
      background-color: var(--green-hover);
      cursor: pointer;
      box-shadow: var(--shadow-green-button);
    }
  }

  &-dashboard-button {
    background-color: var(--green);
    padding: 15px 25px;
  }

  &-rectangle {
    border-radius: var(--radius-0);
  }

  &-rounded-8 {
    border-radius: var(--radius-8);
  }

  &-rounded-32 {
    border-radius: var(--radius-32);
  }

  &-rounded-40 {
    border-radius: var(--radius-40);
  }
}
</style>
