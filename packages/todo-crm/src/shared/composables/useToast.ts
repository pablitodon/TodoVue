import { toast, ToastPosition } from 'vue3-toastify';
import { h } from 'vue';
import   ToastIconError from '../toasts/components/ToastIconError.vue';
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
    success: () => toast.success(message, toastOptions),
    error: () => toast.error(message, toastOptions),
    pending: () => toast.loading(message, toastOptions),
  };
  return toastTypes[type]();
};
