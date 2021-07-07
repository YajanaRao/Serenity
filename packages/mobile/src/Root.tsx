import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Icon, ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { selectThemeType } from '@serenity/core';
import { RootNavigator } from './screens/RootNavigator';

export const RootScreen = () => {
  const themeType = useSelector(selectThemeType);

  let theme = DefaultTheme;

  if (themeType === 'dark') {
    theme = DarkTheme;
  }

  return (
    <NavigationContainer theme={theme}>
      <ThemeProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={theme}
      >
        <RootNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};
