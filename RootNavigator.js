import {
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import SideMenu from './components/SideBar';
import * as React from 'react';
import DetailScreen from './pages/Details';
import ProfileScreen from './pages/Profile';
import HomeScreen from './pages/Home';
import { Dimensions } from 'react-native';
import { Text, View, ActivityIndicator, } from 'react-native';
import type { Theme } from 'react-native-paper';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
    },
    Profile: {
      screen: ProfileScreen
    }
  },{
    drawerWidth: Dimensions.get('window').width - 120, 
    contentComponent: SideMenu,
  }
);

const App = createAppContainer(AppNavigator);

import Store from './store'

type State = {
  theme: DefaultTheme,
};

class RootNavigator extends React.Component {
  state = {
    theme: DefaultTheme,
    isFontLoaded: true
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps.themeType) {
          console.log("changing theme", nextProps.themeType);
          if(nextProps.themeType == "dark"){
            this.setState({
              theme: DarkTheme,
            })
          } else {
            this.setState({
              theme: DefaultTheme,
            })
          }          
      }
  }


  async componentWillMount() {
    await Font.loadAsync({ 'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf') })
    this.setState({ isFontLoaded: true })
  }

  render() {
    console.log("is font loaded",this.state.isFontLoaded);
    return (
        <PaperProvider theme={this.state.theme}>
          { this.state.isFontLoaded ?
            <App /> :
            <ActivityIndicator animating style={{ flex: 1 }} /> }
        </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  themeType: state.themeType.themeType
});

export default connect(mapStateToProps)(RootNavigator);