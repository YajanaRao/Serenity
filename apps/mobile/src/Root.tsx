import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@serenity/components';
import { selectThemeType, useAppSelector, useAppDispatch, Player } from '@serenity/core';
import { RootNavigator } from './navigation/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import analytics from '@react-native-firebase/analytics';

export const RootScreen = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const themeType = useAppSelector(selectThemeType);

  const dispatch = useAppDispatch();


  React.useEffect(() => {
    dispatch(Player.setUpTrackPlayer());
    return () => Player.destroyTrackPlayer();
  }, []);

  let theme = DefaultTheme;

  if (themeType === 'dark') {
    theme = DarkTheme;
  }

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
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
