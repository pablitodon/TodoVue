<template>
   <div class="wrapp">
      <UserRegister />
   </div>
</template>

<script setup>
import UserRegister from '../entites/user/ui/RegisterForm.vue';
</script>

<style lang="scss">
body {
   margin: 0;
   font-family: 'Montserrat', sans-serif;
}

.wrapp {
   display: flex;
   justify-content: center;
   align-items: center;
   max-width: 1440px;
   background: #f0f0f0;
   height: 100vh;
   border: 1px solid #000;
   border-radius: 35px;
   margin: 10px auto;
}
</style>
