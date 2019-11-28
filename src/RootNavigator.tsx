import React, { useEffect } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import RootScreen from './pages/Root';
import { defaultSetup } from './actions';

export default function RootNavigator() {
  const themeType = useSelector((state: any) => state.config.themeType);
  const setup = useSelector((state: any) => state.config.setup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setup) {
      dispatch(defaultSetup());
    }
  }, []);

  return (
    <PaperProvider theme={themeType === 'dark' ? DarkTheme : DefaultTheme}>
      <RootScreen />
    </PaperProvider>
  );
}
