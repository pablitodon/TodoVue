<template>
  <div class="wrapp">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <fieldset class="auth-form__fieldset">
        <legend class="auth-form__legend">
          {{ props.isLogin ? 'Логин' : 'Регистрация' }}
        </legend>

        <div class="auth-form__field">
          <label class="auth-form__label" for="name">Логин</label>
          <input
            id="name"
            v-model="username"
            class="auth-form__input"
            type="text"
            autocomplete="username"
            placeholder="ololo@gmail.com"
            required
          />
        </div>

        <div class="auth-form__field">
          <label class="auth-form__label" for="password">Пароль</label>
          <div class="password__field">
            <input
              id="password"
              v-model="password"
              class="auth-form__input"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
            />
            <img
              :src="eye.eyeLight"
              class="eye__icon"
              alt="Toggle Password Visibility"
              @click="toggleVisibilityPassword"
            />
          </div>
        </div>
        <!-- добавить кнопку Back через baseButton -->
        <BaseButton />

        <button
          v-if="props.isLogin"
          class="auth-form__back"
          type="button"
          @click="goBack"
        >
          Зарегистрироваться
        </button>
        <button v-else class="auth-form__back" type="submit">
          <img :src="arrow.arrowBack" alt="" />
          Назад
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { arrow, eye } from '../../../assets/svg/index';
import BaseButton from '../../../shared/BaseButton.vue';

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false,
  },
});

const username = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);

const toggleVisibilityPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  if (props.isLogin) {
    console.log('Logging in:', {
      username: username.value,
      password: password.value,
    });
  } else {
    console.log('Registering:', {
      username: username.value,
      password: password.value,
    });
  }
};
const goBack = () => {
  console.log('Going back');
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';

.wrapp {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  background: var(--grey-bg);
  height: 100vh;
  border: 1px solid #000;
  border-radius: 35px;
  margin: 10px auto;
}

.auth-form {
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  padding-bottom: 46px;
  width: 518px;
  height: 650px;
  background: var(--bg-form);
  max-width: 518px;
  max-height: 650px;
  border-radius: var(--radius-32);
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 10%);

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
    margin-bottom: 50px;
  }

  &__label {
    font-weight: 600;
  }

  input {
    width: 100%;
    border-radius: var(--radius-8);
    background-color: var(--grey-input);
    padding: 15px 30px;
    margin-top: 10px;
    font-weight: 700;
    font-size: 20px;
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
    display: flex;
    align-items: center;
    background-color: #fff;
    border: none;
    gap: 10px;
    height: 24px;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 108px;
  }
}
</style>
