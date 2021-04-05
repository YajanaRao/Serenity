import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import color from 'color';

import { SafeAreaView } from 'react-native';
import { OfflineStack } from './offline';
import { SearchStack } from './search';
import HomeStack from './home';
import IntroductionScreen from './intro/Introduction';
import { LibraryStack } from './library';
import { BottomTabBar } from '../components/BottomTabBar';
import NotificationContainer from '../containers/NotificationContainer';
import LaunchScreen from './launch/Launch';
import { PlayerStack } from './player';
import { FindScreen } from './shared/Find';
import { Header } from '../components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

const BottomNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  const activeTintColor = colors.primary;
  const inactiveTintColor = color(colors.text)
    .alpha(0.5)
    .rgb()
    .string();

  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar {...props} backgroundColor={colors.surface} />
      )}
      tabBarOptions={{
        style: { backgroundColor: colors.surface },
        activeTintColor,
        inactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'home' : 'home-outline'}
              color={focused ? activeTintColor : inactiveTintColor}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'search' : 'search-outline'}
              color={focused ? activeTintColor : inactiveTintColor}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Your library',
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'browser' : 'browser-outline'}
              color={focused ? activeTintColor : inactiveTintColor}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon={focused ? 'save' : 'save-outline'}
              color={focused ? activeTintColor : inactiveTintColor}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
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
        options={{
          header: ({ navigation, route }) => (
            <Header goBack={navigation.goBack} />
          ),
        }}
      />
      <Stack.Screen
        name="Player"
        component={PlayerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
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
};
export const RootNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <NotificationContainer />
      <AuthStack />
    </SafeAreaView>
  );
};
