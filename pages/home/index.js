import * as React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { withTheme, IconButton, Snackbar, DarkTheme, Surface } from 'react-native-paper';

import SongScreen from '../shared/Songs';
import MainScreen from './Main';
import SettingScreen from './Settings';



export const MediaNavigator = createStackNavigator({
    Home: { screen: MainScreen },
    Songs: { screen: SongScreen },
    Settings: { screen: SettingScreen }
},
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: DarkTheme.colors.surface,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: DarkTheme.colors.text
            },
        },
    });

