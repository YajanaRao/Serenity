import React, { useEffect } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import { PermissionsAndroid, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootScreen } from './pages/Root';
import { defaultSetup } from './actions';
import { RootReducerType } from './reducers';
import { log } from './utils/logging';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as '100',
    },
  },
};

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
      if (Platform.OS === 'android') {
        requestPermission();
      }
    }
  }, [setup, dispatch]);

  let theme = DefaultTheme;

  if (themeType === 'dark') {
    theme = {
      ...DarkTheme,
      fonts: configureFonts(fontConfig),
      roundness: 2,
      colors: {
        ...DarkTheme.colors,
        primary: '#1DB954',
      },
    };
  } else {
    theme = {
      ...DefaultTheme,
      fonts: configureFonts(fontConfig),
      roundness: 2,
      colors: {
        ...DefaultTheme.colors,
        primary: '#1DB954',
      },
    };
  }
  return (
    <PaperProvider
      settings={{
        icon: props => <Icon {...props} />,
      }}
      theme={theme}
    >
      <RootScreen />
    </PaperProvider>
  );
};
