import * as React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';
import { withTheme, IconButton, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';

import PlayListScreen from '../components/PlayList';
import OfflineMedia from './sub/Offline';
import SearchScreen from './sub/Search';
import TabBar from '../components/TabBar';
import MainScreen from './sub/Main';
import AlbumScreen from './sub/Album';
import MusicScreen from './sub/Music';
import NavBar from '../components/NavBar';


class MediaScreen extends React.Component {
  state = {
    visible: false,
    message: ''
  };

  componentWillReceiveProps(nextProps) {
//  != nextState.result
    if (nextProps.result) {
      this.setState({
        visible: true,
        message: nextProps.result
      });
//      return true;
    }
//    return false;
  }


  render() {

    const { colors } = this.props.theme;
    const { dark } = this.props.theme;
    
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <NavBar style={{ backgroundColor: colors.surface, elevation: 4 }}/>
        <StatusBar backgroundColor={colors.surface} barStyle={ dark ? "light-content" : "dark-content" } />
        <Snackbar
          style={{  top: 0, right: 0, left: 0 }}
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          duration={1000}
          // action={{
          //   label: 'Dismiss',
          //   onPress: () => {
          //     this.setState({
          //       visible: false
          //     })
          //   },
          // }}
        >
          {this.state.message}
        </Snackbar>
        <Navigator />
      </View>

    )
  }
}




const MediaNavigator = createStackNavigator({
  Home: { screen: MainScreen },
  Songs: { screen: PlayListScreen },
  Music: { screen: MusicScreen }
});


const AppContainer = createAppContainer(MediaNavigator);

class HomeScreen extends React.PureComponent {
  render() {
    return (
      // <NetworkContainer>
        <AppContainer />
      // </NetworkContainer>
    )

  }
}


const Navigator = createAppContainer(createBottomTabNavigator({
 Home: {
   screen: HomeScreen,
   navigationOptions: {
     tabBarIcon: ({ tintColor }) => <IconButton icon="home" color={tintColor} style={{ margin: 0, padding: 0 }} />
   }
 },
 Search: {
   screen: SearchScreen,
   navigationOptions: {
     tabBarIcon: ({ tintColor }) => <IconButton icon="search" color={tintColor} style={{ margin: 0, padding: 0 }} />
   }
 },
 Albums: {
   screen: AlbumScreen,
   navigationOptions: {
     tabBarIcon: ({ tintColor }) => <IconButton icon="library-music" color={tintColor} style={{ margin: 0, padding: 0 }} />
   }
 },
 Offline: {
   screen: OfflineMedia,
   navigationOptions: {
     tabBarIcon: ({ tintColor }) => <IconButton icon="save" color={tintColor} style={{ margin: 0, padding: 0 }} />
   }
 }
},
 {
   tabBarComponent: TabBar
 }));


const mapStateToProps = state => ({
  result: state.media.result
});


export default connect(mapStateToProps)(withTheme(MediaScreen));