import React, { Component } from 'react';
import { createMaterialTopTabNavigator,  createStackNavigator } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import Album from './Album';
import Artist from './Artist';
import Playlist from './Playlist';
import SongScreen from '../shared/Songs';

// https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens

const PlaylistNavigation = createStackNavigator({
    Playlist: { screen: Playlist },
    Songs: { screen: SongScreen }
},
    {
        initialRouteName: 'Playlist',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: DarkTheme.colors.surface,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: DarkTheme.colors.text
            },
        },
    }
);

PlaylistNavigation.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default createMaterialTopTabNavigator({
    Playlist: { screen: PlaylistNavigation },
    Artist: { screen: Artist },
    Album: { screen: Album },
},{
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        },
        tabStyle: {
            width: 100,
        },
        indicatorStyle: {
            backgroundColor: DarkTheme.colors.primary
        },
        style: {
            backgroundColor: DarkTheme.colors.surface,
        },
    }
});

// class Explore extends Component {
//     render() {
//         return (
//            <App/>
//         );
//     }
// }

// export default Explore;

