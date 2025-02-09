import axios, { AxiosError, AxiosResponse } from 'axios';
import { ref, toValue } from 'vue';
import { useToast } from './useToast';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface UseFetchAxiosResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
type HttpMethod = 'GET' | 'POST';

export const useFetchAxios = <T, P>(
  url: string,
  method: HttpMethod = 'GET',
  payload?: P
): UseFetchAxiosResponse<T> => {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const toastId = ref<string | number | null>(null);
  const fetchData = async () => {
    data.value = null;
    error.value = null;
    loading.value = true;

    const methodMap: Record<HttpMethod, () => Promise<AxiosResponse<T>>> = {
      GET: () => axios.get<T>(toValue(url)),
      POST: () => axios.post<T>(toValue(url), payload),
    };

    toastId.value = useToast('Загрузка...', 'pending');
    try {
      const response = await methodMap[method]();
      data.value = response.data;
      useToast('Успешно!', 'success');
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message;
        useToast('Ошибка: ' + err.message, 'error');
      }
    } finally {
      loading.value = false;
      if (toastId.value !== null) {
        toast.remove(toastId.value);
      }
    }
  };

  fetchData();

  return { data: data.value, error: error.value, loading: loading.value };
};
