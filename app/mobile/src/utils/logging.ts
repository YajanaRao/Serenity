/* global __DEV__ */
import * as Sentry from '@sentry/react-native';

export const log = {
  error(title: any, message?: any) {
    try {
      if (__DEV__) {
      console.error(title, message);
      } else {
        Sentry.captureException(message, {
          tags: title
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  debug(title: string, message: string) {
    try {
      if (__DEV__) {
      console.log('debug: ', title, message);
      } 
    } catch (error) {
      console.log(error);
    }
  },
};
