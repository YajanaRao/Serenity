/* global __DEV__ */
import Analytics from 'appcenter-analytics';

export default function log(string) {
  if (__DEV__) {
    console.log(string);
  } else {
    Analytics.trackEvent('error', string);
  }
}

export function logEvent(event, message) {
  if (__DEV__) {
    console.log(event, message);
  } else {
    Analytics.trackEvent(event, message);
  }
}
