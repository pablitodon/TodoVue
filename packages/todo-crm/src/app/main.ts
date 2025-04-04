import { createApp } from 'vue';
import App from './App.vue';
import '~/assets/styles/globals.scss';
import '~/assets/styles/variables.scss';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router';

const app = createApp(App);
app
.use(router)
.use(Vue3Toastify)
.mount('#app');
