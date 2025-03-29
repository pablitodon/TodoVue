import { createRouter, createWebHistory } from 'vue-router';
import { getAccessToken } from '~/entites/user/user.model';
import UserLogin from '~/features/user/ui/login-user-form/UserLogin.vue';
import RegisterUser from '~/features/user/ui/register-user-form/RegisterUser.vue';
import HomePage from '~/pages/HomePage.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = getAccessToken();
  if (to.meta.requireAuth && !isAuth) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuth) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
