import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import { AlbumScreen } from './Album';
import { ArtistScreen } from './Artist';
import { PlaylistScreen } from './Playlist';
import { AlbumSongs } from '../shared/AlbumSongs';
import { ArtistSongs } from '../shared/ArtistSongs';
import { FavContainer } from '../../containers/FavContainer';
import { AddToQueueIcon } from '../../containers/AddToQueueIcon';
import { PlaylistOptions } from '../../containers/PlaylistOptions';
import { PlaylistSongs } from '../shared/PlaylistSongs';

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
        options={({ route }) => {
          const { artist } = route.params;
          const title = artist.artist || artist.name;
          return {
            headerTitle: title,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <FavContainer item={artist} type="artist" />
                <AddToQueueIcon type="artist" title={title} />
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="AlbumSongs"
        component={AlbumSongs}
        options={({ route }) => {
          const { album } = route.params;
          const title = album.name || album.album;
          return {
            headerTitle: title,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <FavContainer item={album} type="album" />
                <AddToQueueIcon type="album" title={title} />
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="PlaylistSongs"
        component={PlaylistSongs}
        options={({ route, navigation }) => {
          const { playlist } = route.params;
          return {
            headerTitle: playlist.name,
            headerRight: () => (
              <PlaylistOptions route={route} navigation={navigation} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};
