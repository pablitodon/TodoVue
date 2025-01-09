<template>
   <div>
      <button>Lang</button>
      <button>Them</button>
      <div class="form-register">
         <form class="form-container" @submit.prevent="handleRegisterSubmit">
            <h2>РЕГИСТРАЦИЯ</h2>
            <div class="form-group">
               <label for="login">Логин</label>
               <input
                  id="login"
                  v-model="formData.login"
                  type="text"
                  placeholder="username@mailbox.com "
               />
            </div>
            <div class="form-group">
               <label for="password">Пароль</label>
               <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  placeholder="123456"
               />
            </div>
            <button class="button-form" type="submit">Продолжить</button>
         </form>
         <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
         </div>
         <button class="button-back">&#8592; Назад</button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IFormData {
   login: string;
   password: string;
}

const formData = ref<IFormData>({
   login: '',
   password: '',
});

const errorMessage = ref<string | null>(null);

const handleRegisterSubmit = () => {
   errorMessage.value = null;
   if (!formData.value.login || !formData.value.password) {
      errorMessage.value = 'Что-то пошло не так!';
   }
};
</script>

<style scoped lang="scss">
.form {
   &-register {
      width: 518px;
      height: auto;
      border-radius: 36px;
      background-color: #fff;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      padding: 35px;
   }

   &-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 95px;
      padding-bottom: 95px;
   }
}
label {
   display: block;
   margin-bottom: 4px;
   font-weight: 600;
   font-size: 16px;
   color: #333;
}

input {
   width: calc(100% - 24px);
   padding: 12px;
   border: 1px solid #ccc;
   border-radius: 8px;
   font-size: 16px;

   &:focus {
      border-color: #526378;
      box-shadow: 0 0 5px rgba(76, 121, 170, 0.5);
      outline: none;
   }
}

.button {
   &-form {
      width: 100%;
      padding: 12px;
      background-color: rgba(0, 220, 150, 0.28);
      color: rgb(11, 11, 11);
      border: none;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
         background-color: rgba(47, 171, 132, 0.5);
      }
   }
   &-back {
      background-color: #fff;
      border: none;
      width: 100px;
      height: 24px;
      color: #000;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
   }
}

.error-message {
   color: red;
   font-size: 14px;
   margin-top: 10px;
}
</style>
