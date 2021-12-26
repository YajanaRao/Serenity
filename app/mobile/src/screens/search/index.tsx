import React from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import { FilterScreen } from './Filter';
import { SearchScreen } from './Search';

export type SearchStackParamList = {
  Search: undefined;
  Filter: { genre: { title: string }, addToQueue: () => void };
};

const Stack = createStackNavigator<SearchStackParamList>();

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
        headerTitleAlign: 'center',
        safeAreaInsets: { top: 0, bottom: 0 },
        headerBackImage: () => (
          <IconButton style={{ marginLeft: 0 }} icon="arrow-back" />
        ),
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitleStyle: { fontFamily: 'Nunito-ExtraBold', fontSize: 28 },
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
};
