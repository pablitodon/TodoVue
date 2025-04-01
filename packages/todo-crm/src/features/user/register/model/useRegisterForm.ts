import { ref } from 'vue';
import { registerUser } from '~/entites/user/user.api';
import {
  resetFormData,
  validateLogin,
  validatePassword,
} from '~/entites/user/user.model';
import { IUser } from '~/entites/user/user.types';
import { useToast } from '~/shared/composables/useToast';
import { handleTransitionTo } from '~/shared/router/navigate';
import { toggleVisibilityPassword } from '~/entites/user/user.model';

export const useRegisterForm = () => {
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
      useToast('Заполните все поля', 'error');
      return;
    }
    const { error, loading } = await registerUser(formData.value);
    if (!error && !loading) {
      handleTransitionTo();
    }
    resetFormData(formData.value);
  };

  const handleTogglePassword = () => {
    toggleVisibilityPassword(showPassword);
  };

  return {
    formData,
    isLoginValid,
    isPasswordValid,
    showPassword,
    handleSubmit,
    handleTogglePassword,
  };
};
