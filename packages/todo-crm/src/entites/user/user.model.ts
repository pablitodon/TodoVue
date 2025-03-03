import { Ref } from 'vue';
import { IUser } from './user.types';
import router from '~/app/router';

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


export const setDataToken  = (key:string, token: string ):void => {
  localStorage.setItem(`${key}`, token);
} 

export const getDataToken  = (key:string):string|null => {
 return localStorage.getItem(`${key}`);
} 


 export  const toggleVisibilityPassword = (toggleElem:Ref<boolean>) => {
  toggleElem.value = !toggleElem.value;
};

export const handleTransitionTo = (page: string = '') => {
  router.push(`/${page}`);
};

