import { toast, ToastPosition } from 'vue3-toastify';
import { h } from 'vue';
import ToastIconError from '../Toasts/components/ToastIconError.vue';

const globalToastOptions = {
  autoClose: 3000,
  draggable: true,
  position: 'bottom-right' as ToastPosition,
  hideProgressBar: true,
};

export const useToast = (
  message: string,
  type: 'success' | 'error' | 'pending'
): string | number => {
  const toastOptions = {
    ...globalToastOptions,
    icon: type === 'error' ? () => h(ToastIconError) : undefined,
  };
  const toastTypes = {
    success: function () {
      return toast.success(message, toastOptions);
    },
    error: function () {
      return toast.error(message, toastOptions);
    },
    pending: function () {
      return toast.loading(message, toastOptions);
    },
  };
  return toastTypes[type]();
};
