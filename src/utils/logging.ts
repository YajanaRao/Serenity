/* global __DEV__ */
import Analytics from 'appcenter-analytics';

export default function log(message: string) {
  if (__DEV__) {
    console.log(message);
  } else {
    Analytics.trackEvent('error', message);
  }
}

export function logEvent(event: any, message: any) {
  if (__DEV__) {
    console.log(event, message);
  } else {
    Analytics.trackEvent(event, message);
  }
}
