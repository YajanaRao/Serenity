import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme, IconButton } from 'react-native-paper';
import { MainScreen } from './Main/Main';
import { SettingScreen } from './Settings/SettingsScreen';
import { getGreetingTime } from 'utils/greeting';
import { PlaylistSongs } from '../shared/PlaylistSongs';
import { Favorites } from './FavoritesScreen';
import { HistoryScreen } from './History/HistoryScreen';
import { MostPlayedScreen } from './MostPlayed/MostPlayedScreen';
import { PodcastScreen } from './Podcast/Podcast';
import { MeditationScreen } from './Meditation/Meditation';
import { PlaylistScreen } from './Playlist/Playlist';

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
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Liked Songs'
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />
      <Stack.Screen
        name="MostPlayed"
        component={MostPlayedScreen}
        options={{
          title: "Most Played Songs"
        }}
      />
      <Stack.Screen
        name="Podcast"
        component={PodcastScreen}
      />
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
      />
      <Stack.Screen
        name="Songs"
        component={PlaylistScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
