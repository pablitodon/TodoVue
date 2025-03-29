import { Ref } from 'vue';
import { IUser } from './user.types';
import { LOCALSTORAGE_KEYS } from '~/shared/constants/constants';

export const validateLogin = (login: string): boolean => {
  return login.length > 0;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const resetFormData = (formData: IUser): void => {
  formData.username = '';
  formData.password = '';
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, token);
};
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN);
};

export const toggleVisibilityPassword = (toggleElem: Ref<boolean>) => {
  toggleElem.value = !toggleElem.value;
};
