import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme, IconButton } from 'react-native-paper';
import { MainScreen } from './Main';
import { SettingScreen } from './Settings';
import { PlaylistSongs } from '../shared/PlaylistSongs';

const Stack = createStackNavigator();

export const HomeStack = () => {
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
        name="Home"
        component={MainScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Home',
            headerRight: () => (
              <IconButton
                icon="cog"
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name="Playlist"
        component={PlaylistSongs}
        options={({ route }) => {
          const { playlist } = route.params;
          const { addToQueue } = route.params;
          return {
            headerTitle: playlist.name,
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
