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
import { eye } from '../../../../assets/svg/index';

import VButton from '../../../../shared/VButton.vue';
import VInput from '../../../../shared/VInput.vue';

import { IUser } from '../../../../entites/user/user.contract';
import {
  resetFormData,
  validateLogin,
  validatePassword,
} from '../../../../entites/user/user.model';
import { loginUser } from '../../../../entites/user/user.api';

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
    alert('Пожалуйста, заполните все поля корректно!');
    return;
  }
  loginUser(formData.value.login, formData.value.password);
  resetFormData(formData.value);
};
</script>
<style scoped lang="scss">
@use '../../../../assets/styles/variables';

.wrapp {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  max-width: 1440px;
  height: auto;
  min-height: 100vh;
  background: var(--grey-bg);
  border: 1px solid #000;
  border-radius: 35px;

  @media (width <= 1024px) {
    padding: 2vh 0;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-form);
  max-width: 516px;
  height: auto;
  border-radius: var(--radius-32);
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  padding: 40px 0;

  &__fieldset {
    border: none;
    padding: 20px;
  }

  &__legend {
    text-align: center;
    width: 100%;
    font-weight: 600;
    font-size: 30px;
  }

  &__field {
    flex-direction: column;
    padding: 20px 0;

    // margin-bottom: 50px;
  }

  &__label {
    font-weight: 600;
  }

  .password__field {
    position: relative;
    margin-bottom: 38px;
  }

  .eye__icon {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 40px;
    height: 34px;
    margin: 5px;
  }

  &__back {
    cursor: pointer;
    margin-top: 100px;
  }
}
</style>
