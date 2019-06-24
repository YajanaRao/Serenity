import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import Album from './Album';
import Artist from './Artist';
import Playlist from './Playlist';

const App = createAppContainer(createMaterialTopTabNavigator({
    Album: { screen: Album },
    Artist: { screen: Artist },
    Playlist: { screen: Playlist },
},{
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            width: 100,
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