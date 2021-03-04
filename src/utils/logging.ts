/* global __DEV__ */
import crashlytics from '@react-native-firebase/crashlytics';

export const log = (message: any) => {
  if (__DEV__) {
    console.log(message);
  } else {
    crashlytics().log(message);
    crashlytics().recordError(message);
  }
};

export const logEvent = (event: string, message: any) => {
  if (__DEV__) {
    console.log(event, message);
  } else {
    crashlytics().setAttributes({
      event,
      message,
    });
  }
};
