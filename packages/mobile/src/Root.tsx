import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Icon, ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { selectThemeType, useAppSelector } from '@serenity/core';
import { RootNavigator } from './navigation/RootNavigator';

export const RootScreen = () => {
  const themeType = useAppSelector(selectThemeType);

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
