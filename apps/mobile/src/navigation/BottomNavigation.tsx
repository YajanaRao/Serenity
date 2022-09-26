import * as React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import color from 'color';

import { NavigatorScreenParams } from '@react-navigation/core';
import { SearchStack, SearchStackParamList } from '../screens/search';
import HomeStack from '../screens/home';
import { LibraryStack } from '../screens/library';
import { OfflineStack } from '../screens/offline';
import { BottomTabBar } from './components/BottomTabBar';

type BottomTabParamList = {
  Home: undefined;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Library: undefined;
  Offline: undefined;
};


const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomNavigator = () => {
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
        <BottomTabBar {...props} backgroundColor={colors.surface} activeTintColor={colors.primary} />
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
