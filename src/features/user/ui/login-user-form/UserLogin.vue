<template>
  <LoginRegisterWrapper>
    <form class="login-form" @submit.prevent="handleSubmit">
      <fieldset class="login-form__fieldset">
        <legend class="login-form__legend">Вход</legend>
        <div class="login-form__field">
          <label
            class="login-form__label"
            for="name"
            :class="{ invalid: !isLoginValid }"
          >
            Логин
          </label>
          <VInput
            v-model="formData.username"
            type="text"
            placeholder="ololo@gmail.com"
            :invalid="!isLoginValid"
          />
        </div>
        <div class="login-form__field">
          <label
            class="login-form__label"
            for="password"
            :class="{ invalid: !isPasswordValid }"
          >
            Пароль
          </label>
          <div class="password__field">
            <VInput
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              :invalid="!isPasswordValid"
              placeholder="Введите пароль"
            />
            <img
              :src="eye.eyeLight"
              class="eye__icon"
              alt="Toggle Password Visibility"
              @click="toggleVisibilityPassword"
            />
          </div>
        </div>
        <VButton target="submit" styleType="rounded-8" type="submit">
          Продолжить
        </VButton>
        <div class="login-form__back">
          <VButton>Зарегистрироваться</VButton>
        </div>
      </fieldset>
    </form>
  </LoginRegisterWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { eye } from '~/assets/svg/index';

import VButton from '~/shared/VButton.vue';
import VInput from '~/shared/VInput.vue';
import LoginRegisterWrapper from '~/shared/LoginRegisterWrapper.vue';
import { IUser } from '~/entites/user/user.types';
import {
  resetFormData,
  validateLogin,
  validatePassword,
} from '~/entites/user/user.model';
import { loginUser } from '~/entites/user/user.api';
import { useToast } from '~/shared/composables/useToast';

const showPassword = ref<boolean>(false);
const formData = ref<IUser>({
  username: '',
  password: '',
});
const isLoginValid = ref<boolean>(true);
const isPasswordValid = ref<boolean>(true);

const toggleVisibilityPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  isLoginValid.value = validateLogin(formData.value.username);
  isPasswordValid.value = validatePassword(formData.value.password);
  if (!isLoginValid.value || !isPasswordValid.value) {
    useToast('Заполните правильно все поля.', 'error');
    return;
  }

  loginUser(formData.value);
  resetFormData(formData.value);
};
</script>
<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg-form);
  width: 32.25rem;
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-32);
  box-shadow: var(--shadow-form);
  box-sizing: border-box;
  padding: 2.5rem 0;

  @include respond-to-desktop {
    max-width: 25rem;
  }

  @include respond-to-laptop {
    max-width: 25rem;
  }

  @include respond-to-tablet {
    margin: 0 auto;
    margin-top: 6.5rem;
  }

  @include respond-to-phone {
    padding: 1rem;
    max-width: 100%;
  }

  &__fieldset {
    border: none;
    padding: 1.25rem;

    @include respond-to-laptop {
      padding: 1rem;
    }

    @include respond-to-phone {
      padding: 0.75rem;
    }
  }

  &__legend {
    text-align: center;
    font-size: 2rem;

    @include respond-to-laptop {
      font-size: 1.8rem;
      padding-top: 0.5rem;
    }

    @include respond-to-tablet {
      font-size: 2rem;
    }
  }

  &__field {
    padding: 1.25rem 0;
  }

  &__label {
    &.invalid {
      color: var(--rose-words);
      font-weight: bold;
    }

    @include respond-to-laptop {
      font-size: 1.3rem;
    }

    @include respond-to-tablet {
      font-size: 1.1rem;
    }

    @include respond-to-phone {
      font-size: 0.9rem;
    }
  }

  .password__field {
    position: relative;
    margin-bottom: 2rem;
  }

  .eye__icon {
    position: absolute;
    right: 0.3125rem;
    top: 55%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 2rem;
    height: 1.5rem;
  }

  &__back {
    cursor: pointer;
    margin-top: 5rem;
  }
}
</style>
