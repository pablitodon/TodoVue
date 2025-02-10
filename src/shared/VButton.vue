<template>
  <button
    class="btn"
    :class="[
      `btn-${props.target}`,
      `btn-${props.styleType}`,
      { invalid: props.invalid },
    ]"
    :type="props.type"
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
  font-weight: var(--font-weight-600);
  font-size: 1rem;
  background-color: var(--white);

  &.invalid {
    background-color: var(--grey-stop);
    cursor: not-allowed;
    color: var(--black);
  }

  &-submit {
    width: 100%;
    padding: 1rem 0;
    background-color: var(--green);
    transition: background-color 1s ease;

    &:hover {
      background-color: var(--green-hover);
      cursor: pointer;
      box-shadow: var(--shadow-green-button);
    }
  }

  &-dashboard-button {
    background-color: var(--green);
    padding: 1rem 1.6rem;
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
