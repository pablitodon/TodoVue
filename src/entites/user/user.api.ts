import { ILoginResponse, IUser } from './user.types';
import { API_AUTH_URL } from '~/shared/constants/constants';
import { useFetchAxios } from '~/shared/composables/useFetch';

export const registerUser = async (user: IUser) => {
  const url = `${API_AUTH_URL}/register`;
  const { data } = useFetchAxios<string, IUser>(url, 'POST', user);
  return data;
};

export const loginUser = async (user: IUser) => {
  const url = `${API_AUTH_URL}/login`;
  const { data } = useFetchAxios<ILoginResponse, IUser>(url, 'POST', user);
  return data;
};
