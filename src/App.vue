<template>
   <div class="wrapp">
      <Register />
   </div>
</template>

<script setup>
import Register from './features/User/Register.vue';
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
