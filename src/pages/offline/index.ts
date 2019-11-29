import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import SongScreen from './Song';
import AlbumSongs from '../shared/AlbumSongs';
import ArtistSongs from '../shared/ArtistSongs';
import TopTabBar from '../../components/TopTabBar';

const ArtistStack = createStackNavigator({
  Artist: ArtistScreen,
});

const AlbumStack = createStackNavigator({
  Album: AlbumScreen,
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Song: { screen: SongScreen },
    Artist: { screen: ArtistStack },
    Album: { screen: AlbumStack },
  },
  {
    tabBarComponent: TopTabBar,
  },
);

export default createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
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
