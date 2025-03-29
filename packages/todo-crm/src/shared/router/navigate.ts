import router from '~/app/router';
import { AppPath } from './types';
import { APP_PATHS } from '../constants/constants';

export const handleTransitionTo = (page: AppPath = 'HOME') => {
  const path = APP_PATHS[page];
  router.push(path);
};
