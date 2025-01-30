import { IUser } from './user.contract';

export const validateLogin = (login: string): boolean => {
  return login.length > 0;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const resetFormData = (formData: IUser): void => {
  formData.login = '';
  formData.password = '';
};
