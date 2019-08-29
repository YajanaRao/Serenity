import React, { Component } from 'react';
import { createMaterialTopTabNavigator,  createStackNavigator } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import PlaylistScreen from './Playlist';
import SongScreen from '../shared/Songs';

const PlaylistStack = createStackNavigator({
    Playlist: PlaylistScreen
})

const ArtistStack = createStackNavigator({
    Artist: ArtistScreen
})

const AlbumStack = createStackNavigator({
    Album: AlbumScreen
})


const TabNavigator = createMaterialTopTabNavigator({
    Playlist: { screen: PlaylistStack },
    Artist: { screen: ArtistStack },
    Album: { screen: AlbumStack }
});

export default createStackNavigator({
    Tabs: { 
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Songs: SongScreen 
},
    {
        defaultNavigationOptions: ({screenProps}) => {
            const { colors } = screenProps.theme; 
            return {
                 headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    color: colors.text,
                },
            }
        },
    }
);

