import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { DarkTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import Album from './Album';
import Artist from './Artist';
import Songs from './Song';

import { getOfflineMedia } from '../../actions';

// https://reactnavigation.org/docs/en/navigation-options-resolution.html#a-tab-navigator-contains-a-stack-and-you-want-to-hide-the-tab-bar-on-specific-screens

const App = createAppContainer(createMaterialTopTabNavigator({
    Songs: { screen: Songs },
    Artist: { screen: Artist },
    Album: { screen: Album },
}, {
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

class Offline extends Component {

    componentDidMount(){
        this.props.getOfflineMedia()
    }

    render() {
        return (
            <App />
        );
    }
}

// export default Offline;
export default connect(null, { getOfflineMedia })(Offline);