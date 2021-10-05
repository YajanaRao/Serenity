import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { selectThemeType, useAppSelector } from '@serenity/core';
import { RootNavigator } from './navigation/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export const RootScreen = () => {
  const themeType = useAppSelector(selectThemeType);

  let theme = DefaultTheme;

  if (themeType === 'dark') {
    theme = DarkTheme;
  }

  return (
    <NavigationContainer theme={theme}>
      <ThemeProvider
        theme={theme}
      >
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
