import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { PermissionsAndroid, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './pages/RootNavigator';
import { defaultSetup } from './actions';
import { RootReducerType } from './reducers';
import { log } from './utils/logging';
import { DarkTheme, DefaultTheme } from './utils/theme';

export const RootScreen = () => {
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
          log.debug('App mounted', 'Access given');
        } else {
          log.debug('App mounted', 'No access given');
        }
      });
    } catch (err) {
      log.error('App mounted', err);
    }
  };

  useEffect(() => {
    if (!setup) {
      dispatch(defaultSetup());
      if (Platform.OS === 'android') {
        requestPermission();
      }
    }
  }, [setup, dispatch]);

  let theme = DefaultTheme;

  if (themeType === 'dark') {
    theme = DarkTheme;
  }

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={theme}
      >
        <RootNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};
