import React, { useEffect } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootScreen } from './pages/Root';
import { defaultSetup } from './actions';
import { RootReducerType } from './reducers';

export const RootNavigator = () => {
  const themeType = useSelector(
    (state: RootReducerType) => state.config.themeType,
  );
  const setup = useSelector((state: any) => state.config.setup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setup) {
      dispatch(defaultSetup());
    }
  }, [setup]);

  return (
    <PaperProvider theme={themeType === 'dark' ? DarkTheme : DefaultTheme}>
      <RootScreen />
    </PaperProvider>
  );
};
