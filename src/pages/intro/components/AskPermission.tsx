import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { log } from '../../../utils/logging';

export interface AskPermissionProps {
  color: string;
  next: () => void;
}

export function AskPermission({ color, next }: AskPermissionProps) {
  const requestPermission = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Grant Access',
          message:
            'Serenity App needs access to your EXTERNAL_STORAGE ' +
            'so you can take play offline songs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          log.debug('App mounted', 'Access given');
          next();
        } else {
          log.debug('App mounted', 'No access given');
        }
      });
    } catch (err) {
      log.error('App mounted', err);
    }
  };

  return (
    <Button
      mode="contained"
      icon="file-tray-full-outline"
      color={color}
      onPress={requestPermission}
    >
      Allow Access
    </Button>
  );
}
