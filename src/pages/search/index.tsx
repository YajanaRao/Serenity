import React from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import Filter from '../shared/Filter';
import Search from './Search';
import { Header } from '../../components/Header';

const Stack = createStackNavigator();

export const SearchStack = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={({ route }) => {
          const { genre } = route.params;
          const { addToQueue } = route.params;
          return {
            headerTitle: genre.title,
            headerRight: () => (
              <IconButton
                icon="play-circle-outline"
                onPress={() => addToQueue()}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};
