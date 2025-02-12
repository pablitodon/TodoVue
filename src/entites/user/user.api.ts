import { ILoginResponse, IUser } from './user.types';
import { API_AUTH_URL } from '~/shared/constants/constants';
import { useFetchAxios } from '~/shared/composables/useFetch';
import { useToast } from '~/shared/composables/useToast';

export const registerUser = async (user: IUser) => {
  const url = `${API_AUTH_URL}/register`;
  const { data } = await useFetchAxios<string, IUser>(
    url,
    'POST',
    user,
    () => useToast('Success', 'success'),
    err => useToast(`Error ${err}`, 'error')
  );
  return data;
};

export const loginUser = async (user: IUser) => {
  const url = `${API_AUTH_URL}/login`;
  const { data } = await useFetchAxios<ILoginResponse, IUser>(
    url,
    'POST',
    user,
    () => useToast('Success!', 'success'),
    err => useToast(`Error: ${err}`, 'error')
  );
  return data;
};
