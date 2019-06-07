import * as React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
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


    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <NavBar style={{ backgroundColor: colors.primary }}/>
        <Snackbar
          style={{ marginTop: 50 }}
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Dismiss',
            onPress: () => {
              this.setState({
                visible: false
              })
            },
          }}
        >
          {this.state.message}
        </Snackbar>
        <Navigator />
        {/* <Player /> */}
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


// class BottomNavigator extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'home', title: 'Home', icon: 'home', color: '#3F51B5'  },
//       { key: 'search', title: 'Search', icon: 'search', color: '#009688' },
//       { key: 'albums', title: 'Albums', icon: 'library-music', color: '#795548' },
//       { key: 'offline', title: 'Offline', icon: 'save', color: '#607D8B' },
//     ],
//   };

//   _handleIndexChange = index => this.setState({ index });

//   _renderScene = BottomNavigation.SceneMap({
//     home: HomeScreen,
//     search: SearchScreen,
//     albums: AlbumScreen,
//     offline: OfflineMedia
//   });

//   render() {
//     return (
//       <BottomNavigation
//         navigationState={this.state}
//         onIndexChange={this._handleIndexChange}
//         renderScene={this._renderScene}
//       />
//     );
//   }
// }

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