import axios, { AxiosError, AxiosResponse } from 'axios';
import { ref, toValue } from 'vue';
import { updateAccessToken } from '~/entites/user/user.api';
import { HttpMethod, UseFetchAxiosResponse } from '~/entites/user/user.types';

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  // при ошибке  запрос на новый токен и повтор оригинального запроса
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const newAccessToken = await updateAccessToken();
      if (newAccessToken) {
        const originalRequest = error.config;
        if (originalRequest) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const useFetchAxios = <T, P>(
  url: string,
  method: HttpMethod = 'GET',
  payload?: P,
  onSuccess?: () => void,
  onError?: (errorMessage: string | null) => void
): Promise<UseFetchAxiosResponse<T>> => {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchData = async () => {
    data.value = null;
    error.value = null;
    loading.value = true;

    const methodMap: Record<HttpMethod, () => Promise<AxiosResponse<T>>> = {
      GET: async () => await axios.get<T>(toValue(url)),
      POST: async () => await axios.post<T>(toValue(url), payload),
    };

    try {
      const response = await methodMap[method]();
      data.value = response.data;
      onSuccess?.();
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message;
        onError?.(error.value);
      }
    } finally {
      loading.value = false;
    }

    return { data: data.value, error: error.value, loading: loading.value };
  };
  return fetchData();
};
