/* global __DEV__ */
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';

export const log = {
  error(title: any, message?: any) {
    try {
      if (__DEV__) {
        console.error(title, message);
      } else {
        Sentry.captureException(err);
        if (message instanceof Error) {
          crashlytics().recordError(message);
        }
      }
    } catch (error) {
      console.log(error);
      crashlytics().recordError(message);
    }
  },

  debug(title: string, message: string) {
    try {
      if (__DEV__) {
        console.log('debug: ', title, message);
      } else {
        crashlytics().log(message);
        Sentry.captureMessage(message);
      }
    } catch (error) {
      console.log(error);
      crashlytics().recordError(error);
    }
  },
};
