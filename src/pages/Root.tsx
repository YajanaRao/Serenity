import React, { useEffect } from 'react';
// import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PermissionsAndroid } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import OfflineScreen from './offline';
import SearchScreen from './search';
import { HomeStack } from './home';
import ExploreScreen from './explore';
import PlayerScreen from './shared/Player';
import { BottomTabBar } from '../components/BottomTabBar';
import { Screen } from '../components/Screen';

import log from '../utils/logging';
import NotificationContainer from '../containers/NotificationContainer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator tabBar={BottomTabBar}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home"
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="magnify"
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="compass"
              color={focused ? colors.primary : colors.text}
              style={{ margin: 0, padding: 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="library-music"
              color={focused ? colors.primary : colors.text}
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
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomNavigator} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export const RootScreen = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestPermission();
    });
  }, []);

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

  return (
    <Screen>
      <NotificationContainer />
      <RootStack />
    </Screen>
  );
};
