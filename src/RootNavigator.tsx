import React, { useEffect } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { PermissionsAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootScreen } from './pages/Root';
import { defaultSetup } from './actions';
import { RootReducerType } from './reducers';
import { log } from './utils/logging';

export const RootNavigator = () => {
  const themeType = useSelector(
    (state: RootReducerType) => state.config.themeType,
  );
  const setup = useSelector((state: any) => state.config.setup);
  const dispatch = useDispatch();

  const requestPermission = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Serenity App READ_EXTERNAL_STORAGE Permission',
          message:
            'Serenity App needs access to your EXTERNAL_STORAGE ' +
            'so you can take play offline songs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          log('Access given');
        } else {
          log('No access given');
        }
      });
    } catch (err) {
      log(err);
    }
  };

  useEffect(() => {
    if (!setup) {
      dispatch(defaultSetup());
      requestPermission();
    }
  }, [setup, dispatch]);

  return (
    <PaperProvider
      settings={{
        icon: props => <Icon {...props} />,
      }}
      theme={themeType === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootScreen />
    </PaperProvider>
  );
};
