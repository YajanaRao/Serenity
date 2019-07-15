import { createStackNavigator } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';

import Filter from '../shared/Filter';
import Search from './Search';


export default createStackNavigator({
    Search: { screen: Search },
    Filter: { screen: Filter }
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
