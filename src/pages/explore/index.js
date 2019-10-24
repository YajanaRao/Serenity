import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import PlaylistScreen from './Playlist';
import PlaylistSongs from '../shared/PlaylistSongs';
import AlbumSongs from '../shared/AlbumSongs';
import ArtistSongs from '../shared/ArtistSongs';

const PlaylistStack = createStackNavigator({
  Playlist: PlaylistScreen,
});

const ArtistStack = createStackNavigator({
  Artist: ArtistScreen,
});

const AlbumStack = createStackNavigator({
  Album: AlbumScreen,
});

const TabNavigator = createMaterialTopTabNavigator({
  Playlist: { screen: PlaylistStack },
  Artist: { screen: ArtistStack },
  Album: { screen: AlbumStack },
});

export default createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Songs: PlaylistSongs,
    AlbumSongs,
    ArtistSongs,
  },
  {
    defaultNavigationOptions: ({ screenProps }) => {
      const { colors } = screenProps.theme;
      return {
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      };
    },
  },
);
