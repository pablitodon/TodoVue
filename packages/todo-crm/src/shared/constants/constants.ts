import { IStorageKeys } from '~/entites/user/user.types';

export const API_AUTH_URL = import.meta.env.VITE_API_URL_AUTH;

export const LOCALSTORAGE_KEYS: IStorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const APP_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
};
