import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import Album from './Album';
import Artist from './Artist';
import Playlist from './Playlist';

// https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens

const App = createAppContainer(createMaterialTopTabNavigator({
    Playlist: { screen: Playlist },
    Artist: { screen: Artist },
    Album: { screen: Album },
},{
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
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
}));

class Explore extends Component {
    render() {
        return (
           <App/>
        );
    }
}

export default Explore;