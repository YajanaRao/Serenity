import { createStackNavigator } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import Songs from '../shared/Songs';
import Search from './Search';


export default createStackNavigator({
    Search: { screen: Search },
    Songs: { screen: Songs }
},
    {
        initialRouteName: 'Search',
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
