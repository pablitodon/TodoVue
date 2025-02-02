<template>
  <div class="wrapp">
    <form class="login-form" @submit.prevent="handleSubmit">
      <fieldset class="login-form__fieldset">
        <legend class="login-form__legend">Вход</legend>
        <div class="login-form__field">
          <label class="login-form__label" for="name">Логин</label>
          <VInput
            v-model="formData.login"
            type="text"
            placeholder="ololo@gmail.com"
            :invalid="!isLoginValid"
          />
        </div>
        <div class="login-form__field">
          <label class="login-form__label" for="password">Пароль</label>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { eye } from '~/assets/svg/index';

import VButton from '~/shared/VButton.vue';
import VInput from '~/shared/VInput.vue';

import { IUser } from '~/entites/user/user.contract';
import {
  resetFormData,
  validateLogin,
  validatePassword,
} from '~/entites/user/user.model';
import { loginUser } from '~/entites/user/user.api';

const showPassword = ref<boolean>(false);
const formData = ref<IUser>({
  login: '',
  password: '',
});
const isLoginValid = ref<boolean>(true);
const isPasswordValid = ref<boolean>(true);

const toggleVisibilityPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  isLoginValid.value = validateLogin(formData.value.login);
  isPasswordValid.value = validatePassword(formData.value.password);

  if (!isLoginValid.value || !isPasswordValid.value) {
    return;
  }
  loginUser(formData.value.login, formData.value.password);
  resetFormData(formData.value);
};
</script>
<style scoped lang="scss">
@use '~/assets/styles/variables';

.wrapp {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  max-width: 100%;
  height: auto;
  min-height: 100vh;
  background: var(--grey-bg);
  border: 0.0625rem solid var(--black);
  border-radius: 2rem;
  padding: 1rem;

  @media (width <= 1024px) {
    padding: 2rem;
  }

  @media (width <= 768px) {
    padding: 1rem;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-form);
  max-width: 32.25rem;
  height: auto;
  border-radius: var(--radius-32);
  box-shadow: 0 0.25rem 0.25rem 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  padding: 2.5rem 0;

  @media (width <= 1024px) {
    padding: 2rem 0;
  }

  @media (width <= 768px) {
    padding: 1.5rem 0.32rem;
  }

  &__fieldset {
    border: none;
    padding: 1.25rem;

    @media (width <= 1024px) {
      padding: 0.9375rem;
    }

    @media (width <= 768px) {
      padding: 0.625rem;
    }
  }

  &__legend {
    text-align: center;
    font-weight: 600;
    font-size: 2rem;

    @media (width <= 1024px) {
      font-size: 1.8rem;
    }

    @media (width <= 768px) {
      font-size: 1.6rem;
    }
  }

  &__field {
    padding: 1.25rem 0;

    @media (width <= 1024px) {
      padding: 0.625rem 0;
    }

    @media (width <= 768px) {
      padding: 0.625rem 0;
    }
  }

  &__label {
    font-weight: 600;

    @media (width <= 768px) {
      font-size: 0.9rem;
    }
  }

  .password__field {
    position: relative;
    margin-bottom: 2rem;

    @media (width <= 768px) {
      margin-bottom: 1.5rem;
    }
  }

  .eye__icon {
    position: absolute;
    right: 0.3125rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 2rem;
    height: 1.5rem;

    @media (width <= 768px) {
      width: 1.5rem;
      height: 1.2rem;
    }
  }

  &__back {
    cursor: pointer;
    margin-top: 5rem;

    @media (width <= 768px) {
      margin-top: 1.25rem;
    }
  }
}
</style>
