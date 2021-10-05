import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AlbumScreen } from './Albums/AlbumSceen';
import { ArtistScreen } from './Artists/Artists';
import { PlaylistScreen } from './Playlists/Playlists';
import { AlbumSongs } from '../shared/AlbumSongs/AlbumSongs';
import { ArtistSongs } from '../shared/ArtistSongs/ArtistSongs';
import { PlaylistSongs } from './PlaylistSongs/PlaylistSongs';
import { FollowArtists } from './Artists/FollowArtists';

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
        indicatorStyle: {
          backgroundColor: colors.primary,
        },
        labelStyle: {
          fontFamily: 'Nunito-ExtraBold',
          fontSize: 16,
          textTransform: 'none',
        },
      }}
    >
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="Artist" component={ArtistScreen} />

      <Tab.Screen name="Album" component={AlbumScreen} />
    </Tab.Navigator>
  );
};

export const LibraryStack = () => {
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
      <Stack.Screen
        name="FollowArtists"
        component={FollowArtists}
      />
      <Stack.Screen
        name="PlaylistSongs"
        component={PlaylistSongs}
      />
    </Stack.Navigator>
  );
};
