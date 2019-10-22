/* global __DEV__ */
import Analytics from 'appcenter-analytics';

export default function log(string) {
  if (__DEV__) {
    console.log(string);
  } else {
    Analytics.trackEvent('error', string);
  }
}
