import path from 'path';
import { createRouter, createWebHistory } from 'vue-router';
import { getAccessToken } from '~/entites/user/user.model';
import AuthLoginForm from '~/features/user/login/ui/AuthLoginForm.vue';
import AuthRegisterForm from '~/features/user/register/ui/AuthRegisterForm.vue';
import HomePage from '~/pages/HomePage.vue';
import Authorization from '~/pages/user/auth/Authorization.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/auth',
    component: Authorization,
    children: [
      { path: '', redirect: { name: 'login' } },
      {
        path: 'login',
        name: 'login',
        component: AuthLoginForm,
      },
      {
        path: 'register',
        name: 'register',
        component: AuthRegisterForm,
      },
    ],
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
