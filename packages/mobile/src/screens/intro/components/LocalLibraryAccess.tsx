import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { giveReadOfflineAccess, useAppDispatch, useAppSelector } from '@serenity/core';
import { Button } from '@serenity/components';

export interface LocalLibraryAccessProps {
  color: string;
  next: () => void;
}

export function LocalLibraryAccess({ color, next }: LocalLibraryAccessProps) {
  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);

  const [given, setGiven] = useState(false);
  const dispatch = useAppDispatch();
  const requestPermission = () => {
    dispatch(giveReadOfflineAccess());
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => setGiven(status));
    }
  }, [offlineReadAccessGiven]);

  if (given || offlineReadAccessGiven) {
    return (
      <Button mode="contained" icon="done-all" color={color} onPress={next}>
        Done
      </Button>
    );
  }

  return (
    <Button
      mode="contained"
      icon="unlock-outline"
      color={color}
      onPress={requestPermission}>
      Allow Access
    </Button>
  );
}
