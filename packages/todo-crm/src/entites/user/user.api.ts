import { ILoginResponse, IUser } from './user.types';
import { API_AUTH_URL } from '~/shared/constants/constants';
import { useFetchAxios } from '~/shared/composables/useFetch';
import { useToast } from '~/shared/composables/useToast';
import { getRefreshToken, setRefreshToken } from './user.model';

export const registerUser = async (user: IUser) => {
  const url = `${API_AUTH_URL}/register`;
  const response = await useFetchAxios<string, IUser>(
    url,
    'POST',
    user,
    () => useToast('Success', 'success'),
    err => useToast(`Error ${err}`, 'error')
  );
  return response;
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

export const updateAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  const url = `${API_AUTH_URL}/update-token`;
  const { data } = await useFetchAxios<
    string | null,
    Pick<ILoginResponse, 'refreshToken'>
  >(url, 'POST', { refreshToken });
  if (data) setRefreshToken(data);
  return data;
};
