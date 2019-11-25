import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { PermissionsAndroid, StatusBar } from 'react-native';
import { withTheme, IconButton, Snackbar } from 'react-native-paper';

import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import Crashes, { UserConfirmation } from 'appcenter-crashes';

import OfflineScreen from './offline';
import SearchScreen from './search';
import HomeScreen from './home';
import ExploreScreen from './explore';
import PlayerScreen from './shared/Player';
import BottomTabBar from '../components/BottomTabBar';
import Screen from '../components/Screen';

import log from '../utils/logging';

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

class RootScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerRight: (
        <IconButton
          icon="settings"
          color="black"
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      result: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.result, state.result) && !isEmpty(props.result)) {
      return {
        result: props.result,
        visible: true,
      };
    }
    return null;
  }

  // FIXME: Need to enhance start up time

  componentDidMount() {
    requestAnimationFrame(() => {
      this.requestPermission();
      this.checkForCrash();
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

  checkForCrash = async () => {
    await Crashes.setEnabled(true);
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      try {
        // const crashReport = await Crashes.lastSessionCrashReport();
        Crashes.setListener({
          shouldProcess(report) {
            return true; // return true if the crash report should be processed, otherwise false.
          },

          onSendingSucceeded(report) {
            // called when crash report sent successfully.
            log(report);
          },
          onSendingFailed(report) {
            // called when crash report could not be sent.
            log(report);
          },

          // Other callbacks must also be defined at the same time if used.
          // Default values are used if a method with return parameter is not defined.
        });
        Crashes.notifyUserConfirmation(UserConfirmation.SEND);
      } catch (error) {
        log(error);
      }
    }
  };

  render() {
    const { theme } = this.props;
    const { result, visible } = this.state;

    return (
      <Screen>
        <Snackbar
          style={{ marginBottom: 120, zIndex: 10 }}
          visible={visible}
          onDismiss={() => this.setState({ visible: false })}
          // duration={1000}
          action={{
            label: 'Dismiss',
            onPress: () => {
              this.setState({
                visible: false,
              });
            },
          }}
        >
          {result}
        </Snackbar>
        {/* <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" /> */}
        <Navigator screenProps={{ theme }} />
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  result: state.query.message,
});

export default connect(mapStateToProps)(withTheme(RootScreen));
