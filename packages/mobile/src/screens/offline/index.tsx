import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import { AlbumScreen } from './Album/Albums';
import { ArtistsScreen } from './Artists/Artists';
import { SongScreen } from './Song/Song';
import { AlbumSongs } from '../shared/AlbumSongs/AlbumSongs';
import { ArtistSongs } from '../shared/ArtistSongs/ArtistSongs';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        style: {
          backgroundColor: colors.surface,
        },
        labelStyle: {
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 16,
          textTransform: 'none',
        },
        indicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tab.Screen name="Song" component={SongScreen} />
      <Tab.Screen name="Artist" component={ArtistsScreen} />
      <Tab.Screen name="Album" component={AlbumScreen} />
    </Tab.Navigator>
  );
};

export const OfflineStack = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
        headerTitleAlign: 'center',
        headerBackImage: () => (
          <IconButton style={{ marginLeft: 0 }} icon="arrow-back" />
        ),
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistSongs"
        component={ArtistSongs}
      />
      <Stack.Screen
        name="AlbumSongs"
        component={AlbumSongs}
      />
    </Stack.Navigator>
  );
};
