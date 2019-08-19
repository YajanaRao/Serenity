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
