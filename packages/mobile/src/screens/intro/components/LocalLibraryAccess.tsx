import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { giveReadOfflineAccess } from '../../../actions/userState';
import { RootReducerType } from '../../../reducers';
import { log } from '../../../utils/logging';

export interface LocalLibraryAccessProps {
  color: string;
  next: () => void;
}

export function LocalLibraryAccess({ color, next }: LocalLibraryAccessProps) {
  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.user,
  );

  const [given, setGiven] = useState(false);
  const dispatch = useDispatch();
  const requestPermission = () => {
    dispatch(giveReadOfflineAccess());
  };
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(status => setGiven(status));
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
      onPress={requestPermission}
    >
      Allow Access
    </Button>
  );
}
