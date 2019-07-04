import {  createStackNavigator } from 'react-navigation';
import {  DarkTheme } from 'react-native-paper';

import SongScreen from '../shared/Songs';
import MainScreen from './Main';
import SettingScreen from './Settings';


export default createStackNavigator({
    Home: { screen: MainScreen },
    Songs: { screen: SongScreen },
    Settings: { screen: SettingScreen }
},
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: DarkTheme.colors.surface,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: DarkTheme.colors.text
            },
        }),
    });
