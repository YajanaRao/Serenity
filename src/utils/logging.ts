/* global __DEV__ */
import Analytics from 'appcenter-analytics';
import crashlytics from '@react-native-firebase/crashlytics';

export const log = (message: any) => {
  if (__DEV__) {
    console.log(message);
  } else {
    Analytics.trackEvent('error', message);
    crashlytics().log(message);
    crashlytics().recordError(message);
  }
};

export const logEvent = (event: string, message: any) => {
  if (__DEV__) {
    console.log(event, message);
  } else {
    Analytics.trackEvent(event, message);
  }
};
