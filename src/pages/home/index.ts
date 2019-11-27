import { createStackNavigator } from 'react-navigation-stack';
import { useTheme } from 'react-native-paper';
import MainScreen from './Main';
import SettingScreen from './Settings';
import PlaylistScreen from '../shared/PlaylistSongs';

export default createStackNavigator(
  {
    Home: { screen: MainScreen },
    Settings: { screen: SettingScreen },
    Playlist: { screen: PlaylistScreen },
  },
  {
    initialRouteName: 'Home',
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
