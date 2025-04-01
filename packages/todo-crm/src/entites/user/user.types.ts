export interface IUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UseFetchAxiosResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
export interface IStorageKeys {
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
}
export type HttpMethod = 'GET' | 'POST';

export type FormType = 'login' | 'register';
