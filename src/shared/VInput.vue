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
  console.log('Invalid:', props.invalid);
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
  border: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    border-width 0.3s ease;

  &:focus {
    outline: none;
    border-width: 1px;
    box-shadow: 0 0 5px rgb(65 69 66 / 44.1%);
  }

  &.invalid {
    background-color: var(--rose-invalid);
    box-shadow: 0 0 5px rgb(255 0 0 / 44.1%);
  }
}
</style>
