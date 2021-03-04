import React from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import { FilterScreen } from '../shared/Filter';
import { SearchScreen } from './Search';
import { Header } from '../../components/Header';

const Stack = createStackNavigator();

export const SearchStack = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: () => {
            return <Header />;
          },
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
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
