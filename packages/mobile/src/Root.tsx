import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { Icon } from 'components';

import { RootNavigator } from './screens/RootNavigator';
import { defaultSetup } from './actions';
import { RootReducerType } from './reducers';
import { DarkTheme, DefaultTheme } from './utils/theme';

export const RootScreen = () => {
  const themeType = useSelector(
    (state: RootReducerType) => state.config.themeType,
  );
  const setup = useSelector((state: any) => state.config.setup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setup) {
      dispatch(defaultSetup());
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
