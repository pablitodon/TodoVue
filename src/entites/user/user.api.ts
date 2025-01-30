import axios, { AxiosError } from 'axios';

const API_AUTH_URL = import.meta.env.VITE_API_URL_AUTH;

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/register`, {
      username,
      password,
    });
    alert('Поользователь зарегистрирован');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Ошибка регистрации пользователя:', error.message);
    }
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, {
      username,
      password,
    });
    console.log('Пользователь вошел', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Ошибка входа пользователя:', error.message);
    }
  }
};
