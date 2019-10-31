import { createStackNavigator } from 'react-navigation-stack';

import SongScreen from '../shared/Songs';
import MainScreen from './Main';
import SettingScreen from './Settings';
import PlaylistScreen from '../shared/PlaylistSongs';

export default createStackNavigator(
  {
    Home: { screen: MainScreen },
    Songs: { screen: SongScreen },
    Settings: { screen: SettingScreen },
    Playlist: { screen: PlaylistScreen },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
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
