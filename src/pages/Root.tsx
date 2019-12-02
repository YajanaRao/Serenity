import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { PermissionsAndroid } from 'react-native';
import { withTheme, IconButton } from 'react-native-paper';
import isEqual from 'lodash/isEqual';

import OfflineScreen from './offline';
import SearchScreen from './search';
import HomeScreen from './home';
import ExploreScreen from './explore';
import PlayerScreen from './shared/Player';
import BottomTabBar from '../components/BottomTabBar';
import Screen from '../components/Screen';

import log from '../utils/logging';
import NotificationContainer from '../containers/NotificationContainer';

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconButton
            icon="home"
            color={tintColor}
            style={{ margin: 0, padding: 0 }}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconButton
            icon="magnify"
            color={tintColor}
            style={{ margin: 0, padding: 0 }}
          />
        ),
      },
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconButton
            icon="compass"
            color={tintColor}
            style={{ margin: 0, padding: 0 }}
          />
        ),
      },
    },
    Offline: {
      screen: OfflineScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconButton
            icon="library-music"
            color={tintColor}
            style={{ margin: 0, padding: 0 }}
          />
        ),
      },
    },
  },
  {
    tabBarComponent: BottomTabBar,
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: BottomNavigator,
    },
    Player: {
      screen: PlayerScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const Navigator = createAppContainer(RootStack);

export interface Props {
  theme: any;
}

class RootScreen extends React.Component<Props> {
  // FIXME: Need to enhance start up time

  componentDidMount() {
    requestAnimationFrame(() => {
      this.requestPermission();
    });
  }

  requestPermission = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Serenity App READ_EXTERNAL_STORAGE Permission',
          message:
            'Serenity App needs access to your READ_EXTERNAL_STORAGE ' +
            'so you can take play offline songs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({
            result: 'Able to access offline songs',
          });
        } else {
          this.setState({
            result: 'Permission to access offline files denied',
          });
        }
      });
    } catch (err) {
      log(err);
    }
  };

  render() {
    const { theme } = this.props;

    return (
      <Screen>
        <NotificationContainer />
        <Navigator screenProps={{ theme }} />
      </Screen>
    );
  }
}

export default withTheme(RootScreen);
