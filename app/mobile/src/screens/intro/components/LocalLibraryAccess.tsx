import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { UI, useAppDispatch, useAppSelector } from '@serenity/core';
import { Button } from '@serenity/components';

export interface LocalLibraryAccessProps {
  color: string;
  next: () => void;
}

export function LocalLibraryAccess({ color, next }: LocalLibraryAccessProps) {
  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const requestPermission = () => {
    dispatch(UI.giveReadOfflineAccess());
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => {
        if(status){
          next();
        }
      });
    }
  }, [offlineReadAccessGiven]);

  return (
    <Button
      icon="unlock-outline"
      color={color}
      onPress={requestPermission}>
      Allow Access
    </Button>
  );
}
