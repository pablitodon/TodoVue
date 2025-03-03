export interface IUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface UseFetchAxiosResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export type HttpMethod = 'GET' | 'POST';
