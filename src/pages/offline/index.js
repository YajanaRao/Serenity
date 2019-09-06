import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import AlbumScreen from './Album';
import ArtistScreen from './Artist';
import SongScreen from './Song';
import FilterScreen from '../shared/Filter';

const ArtistStack = createStackNavigator({
  Artist: ArtistScreen,
});

const AlbumStack = createStackNavigator({
  Album: AlbumScreen,
});

const TabNavigator = createMaterialTopTabNavigator({
  Song: {screen: SongScreen},
  Artist: {screen: ArtistStack},
  Album: {screen: AlbumStack},
});

export default createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Filter: FilterScreen,
  },
  {
    defaultNavigationOptions: ({screenProps}) => {
      const {colors} = screenProps.theme;
      return {
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      };
    },
  },
);
