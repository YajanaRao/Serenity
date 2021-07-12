import React, { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import IntroductionScreen from '../screens/intro/Introduction';

import NotificationContainer from '../containers/NotificationContainer';
import { LaunchScreen } from '../screens/launch/Launch';
import { PlayerStack } from '../screens/player';
import { FindScreen } from '../screens/shared/Find/Find';
import { BottomNavigator } from './BottomNavigation';


type RootStackParamList = {
  Main: any;
  Find: { type?: string };
  Player: undefined;
};

export type AppStackParamList = {
  Launch: undefined;
  App: NavigatorScreenParams<RootStackParamList>;
  Intro: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const NativeStack = createNativeStackNavigator<AppStackParamList>();




const RootStack = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Main"
      component={BottomNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Find"
      component={FindScreen}
      initialParams={{ type: 'all' }}
    />
    <Stack.Screen
      name="Player"
      component={PlayerStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);


const AppStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Launch"
  >
    <NativeStack.Screen name="App" component={RootStack} />
    <NativeStack.Screen name="Intro" component={IntroductionScreen} />
    <NativeStack.Screen name="Launch" component={LaunchScreen} />
  </NativeStack.Navigator>
);

export const RootNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <NotificationContainer />
      <AppStack />
    </SafeAreaView>
  );
};
