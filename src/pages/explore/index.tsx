import React from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import PlaylistScreen from './Playlist';
import PlaylistSongs from '../shared/PlaylistSongs';
import AlbumSongs from '../shared/AlbumSongs';
import ArtistSongs from '../shared/ArtistSongs';
import FavContainer from '../../containers/FavContainer';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
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
      }}
    >
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="Artist" component={ArtistScreen} />
      <Tab.Screen name="Album" component={AlbumScreen} />
    </Tab.Navigator>
  );
}

export default function RootStack() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
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
          const { addToQueue } = route.params;
          return {
            headerTitle: artist.artist || artist.name,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <FavContainer item={artist} type="artist" />
                <IconButton icon="play-circle-outline" onPress={addToQueue} />
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
          const { addToQueue } = route.params;
          return {
            headerTitle: album.name || album.album,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <FavContainer item={album} type="album" />
                <IconButton
                  icon="play-circle-outline"
                  onPress={() => addToQueue()}
                />
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Songs"
        component={PlaylistSongs}
        options={({ route }) => {
          const { playlist } = route.params;
          const { openMenu } = route.params;
          return {
            headerTitle: playlist.name,
            headerRight: () => (
              <IconButton icon="dots-vertical" onPress={openMenu} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

// export default createStackNavigator(
//   {
//     Tabs: {
//       screen: TabNavigator,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Songs: PlaylistSongs,
//     AlbumSongs,
//     ArtistSongs,
//   },
//   {
//     defaultNavigationOptions: ({ screenProps }) => {
//       const { colors } = screenProps.theme;
//       return {
//         headerStyle: {
//           backgroundColor: colors.surface,
//         },
//         headerTintColor: colors.text,
//         headerTitleStyle: {
//           color: colors.text,
//         },
//       };
//     },
//   },
// );
