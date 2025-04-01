import { ref } from 'vue';
import { loginUser } from '~/entites/user/user.api';
import {
  resetFormData,
  setAccessToken,
  setRefreshToken,
  toggleVisibilityPassword,
  validateLogin,
  validatePassword,
} from '~/entites/user/user.model';
import { IUser } from '~/entites/user/user.types';
import { useToast } from '~/shared/composables/useToast';
import { handleTransitionTo } from '~/shared/router/navigate';

export const useLoginForm = () => {
  const isLoginValid = ref<boolean>(true);
  const isPasswordValid = ref<boolean>(true);
  const showPassword = ref<boolean>(false);

  const formData = ref<IUser>({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {
    isLoginValid.value = validateLogin(formData.value.username);
    isPasswordValid.value = validatePassword(formData.value.password);
    if (!isLoginValid.value || !isPasswordValid.value) {
      useToast('Заполните правильно все поля.', 'error');
      return;
    }
    const resp = await loginUser(formData.value);
    const accessToken = resp?.accessToken;
    const refreshToken = resp?.refreshToken;
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      resetFormData(formData.value);
      handleTransitionTo();
    }
  };

  const handleTogglePassword = () => {
    toggleVisibilityPassword(showPassword);
  };

  return {
    formData,
    handleSubmit,
    showPassword,
    isLoginValid,
    isPasswordValid,
    handleTogglePassword,
  };
};
