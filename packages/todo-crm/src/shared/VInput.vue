<template>
  <input
    :type="props.type"
    :value="modelValue"
    :placeholder="props.placeholder"
    :class="{ invalid: props.invalid }"
    @input="updateValue"
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  type?: string;
  placeholder?: string;
  modelValue: string | number;
  invalid?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  border-radius: var(--radius-8);
  background-color: var(--grey-input);
  padding: 15px 30px;
  margin-top: 10px;
  font-weight: 700;
  font-size: 18px;
  border: 1px solid transparent;
  transition:
    box-shadow 0.3s ease,
    border-width 0.3s ease,
    background-color 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid var(--grey);
    box-shadow: 0 0 10px var(--focus-shadow-color);
    background-color: var(--white);
  }

  &.invalid {
    background-color: var(--rose-invalid);
  }
}
</style>
