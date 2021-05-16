import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme, IconButton } from 'react-native-paper';
import { MainScreen } from './Main';
import { SettingScreen } from './Settings';
import { getGreetingTime } from '../../utils/greeting';
import { PlaylistSongs } from '../shared/PlaylistSongs';
import { OnlinePlaylist } from '../shared/OnlinePlaylist';

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
        headerBackImage: () => (
          <IconButton style={{ marginLeft: 0 }} icon="arrow-back" />
        ),
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: getGreetingTime(),
          headerTitleStyle: { fontFamily: 'Nunito-ExtraBold', fontSize: 24 },
          headerRight: () => (
            <IconButton
              icon="settings-outline"
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="OnlinePlaylist"
        component={OnlinePlaylist}
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
