import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme  } from 'react-native-paper';
import { IconButton } from '@serenity/components';
import { MainScreen } from './Main/Main';
import { SettingScreen } from './Settings/SettingsScreen';
import { PlaylistSongs } from '../shared/PlaylistSongs';
import { Favorites } from './FavoritesScreen';
import { HistoryScreen } from './History/HistoryScreen';
import { MostPlayedScreen } from './MostPlayed/MostPlayedScreen';
import { PodcastScreen } from './Podcast/Podcast';
import { MeditationScreen } from './Meditation/Meditation';
import { PlaylistScreen } from './Playlist/Playlist';
import { BookScreen } from './Book/Book';

const Stack = createStackNavigator();

const HomeStack = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
        headerBackImage: () => (
          <IconButton name="arrow-back" onPress={() => navigation.goBack()}/>
        ),
        headerBackTitleVisible: false
      })}
    >
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={() => ({
          headerShown: false
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
        name="Book"
        component={BookScreen}
      />
      <Stack.Screen
        name="Songs"
        component={PlaylistScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
