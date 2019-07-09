import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import Song from './Song';
import FilterScreen from '../shared/Filter';

const ArtistStack = createStackNavigator({
    Artist: ArtistScreen
})

const AlbumStack = createStackNavigator({
    Album: AlbumScreen
})


// const ArtistNavigation = createStackNavigator({
//     Artist: { screen: Artist },
//     Filter: { screen: Filter }
// },
//     {
//         initialRouteName: 'Artist',
//         /* The header config from HomeScreen is now here */
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: DarkTheme.colors.surface,
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: DarkTheme.colors.text
//             },
//         },
//     }
// );

// ArtistNavigation.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//         tabBarVisible = false;
//     }

//     return {
//         tabBarVisible,
//     };
// };

// const AlbumNavigation = createStackNavigator({
//     Album: { screen: Album },
//     Filter: { screen: Filter }
// },
//     {
//         initialRouteName: 'Album',
//         /* The header config from HomeScreen is now here */
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: DarkTheme.colors.surface,
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 color: DarkTheme.colors.text
//             },
//         },
//     }
// );

// AlbumNavigation.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//         tabBarVisible = false;
//     }

//     return {
//         tabBarVisible,
//     };
// };

// https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens

const TabNavigator =  createMaterialTopTabNavigator({
    Song: { screen: Song },
    Artist: { screen: ArtistStack },
    Album: { screen: AlbumStack },
}, {
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

export default createStackNavigator({
        Tabs: {
            screen: TabNavigator,
            navigationOptions: {
                header: null
            }
        },
        Filter: FilterScreen
    },
    {
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
)
