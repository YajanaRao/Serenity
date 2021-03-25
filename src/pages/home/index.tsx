import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useTheme,
  IconButton,
  Surface,
  Appbar,
  overlay,
} from 'react-native-paper';
import { MainScreen } from './Main';
import { SettingScreen } from './Settings';
import { PlaylistSongs } from '../shared/PlaylistSongs';
import { getGreetingTime } from '../../utils/greeting';

const Stack = createStackNavigator();

const HomeStack = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={({ navigation }) => {
          return {
            headerTitle: getGreetingTime(),
            headerTitleStyle: { fontFamily: 'Nunito-Bold' },
            headerRight: () => (
              <IconButton
                icon="settings-outline"
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

export default HomeStack;
