/* global __DEV__ */
import crashlytics from '@react-native-firebase/crashlytics';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const WEBHOOK: string = Config.WEBHOOK_URL;

export function sendMessage(content: any) {
  fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }).catch(error => {
    console.log('error', error);
  });
}

export const log = {
  error(title: any, message?: any) {
    try {
      if (__DEV__) {
        console.log(title, message);
      } else {
        let text;
        if (message.componentStack) {
          text = message.componentStack.slice(0, 2000);
        } else {
          text = message.toString();
        }

        const platform = Platform.OS;
        const extras: any = [];
        extras.push({
          name: 'Platform',
          value: platform,
        });
        if (platform === 'web') {
          extras.push(
            {
              name: 'Browser',
              value: navigator.appCodeName,
            },
            {
              name: 'OS',
              value: navigator.platform,
            },
          );
        } else if (platform === 'android') {
          extras.push({
            name: 'Android Version',
            value: Platform.Version,
          });
        }
        const content = {
          username: 'error-logs',
          avatar_url: 'https://i.imgur.com/4M34hi2.png',
          content: title.toString(),
          embeds: [
            {
              title,
              fields: extras,
              description: text,
              color: 14177041,
            },
          ],
        };
        sendMessage(content);
      }
      if (message instanceof Error) {
        crashlytics().recordError(message);
      }
    } catch (error) {
      console.log(error);
      crashlytics().recordError(message);
    }
  },

  debug(title: string, message: string) {
    try {
      if (__DEV__) {
        console.log(title, message);
      } else {
        const extras = [];
        extras.push({
          name: 'Platform',
          value: Platform.OS,
        }, {
          name: 'Version',
          value: Platform.Version
        }, {
          name: 'Version Code',
          value: Config.VERSION_CODE
        });
        const content = {
          username: 'debug-logs',
          avatar_url: 'https://i.imgur.com/4M34hi2.png',
          content: title,
          embeds: [
            {
              title,
              description: message,
              color: 15258703,
              fields: extras,
            },
          ],
        };
        sendMessage(content);
        crashlytics().log(message);
      }
    } catch (error) {
      console.log(error);
      crashlytics().recordError(error);
    }
  },
};
