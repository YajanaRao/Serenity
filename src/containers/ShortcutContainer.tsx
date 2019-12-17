import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Caption } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import { getPlayedSongs, getFavoriteSongs } from '../actions/realmAction';
import { startRadio } from '../actions/playerState';
import { mostPlayedSongs } from '../actions/mediaStore';

export const ShortCutContainer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mostPlayed = () => {
    return mostPlayedSongs(getPlayedSongs());
  };

  const navigateToHistory = React.useMemo(
    () => () => {
      const playlist = {
        id: 'user-playlist--000001',
        name: 'Recently Played Songs',
        owner: 'Serenity',
      };
      navigation.navigate('Playlist', {
        playlist,
        fetchSongs: getPlayedSongs,
      });
    },
    [navigation],
  );

  const navigateToFavorite = React.useMemo(
    () => () => {
      const playlist = {
        id: 'user-playlist--000002',
        name: 'Liked Songs',
        owner: 'Serenity',
      };
      navigation.navigate('Playlist', {
        playlist,
        fetchSongs: getFavoriteSongs,
      });
    },
    [navigation],
  );

  const navigateToMostPlayed = React.useMemo(
    () => () => {
      const playlist = {
        id: 'user-playlist--000002',
        name: 'Most Played Songs',
        owner: 'Serenity',
      };
      navigation.navigate('Playlist', {
        playlist,
        fetchSongs: mostPlayed,
      });
    },
    [navigation],
  );

  const startSongs = () => {
    dispatch(startRadio());
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 16,
      }}
    >
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={navigateToHistory}
      >
        <Avatar.Icon
          icon="history"
          color="#46b3e6"
          style={{ backgroundColor: '#46b3e650' }}
        />
        <Caption>History</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={navigateToFavorite}
      >
        <Avatar.Icon
          icon="heart-outline"
          color="#c70d3a"
          style={{ backgroundColor: '#c70d3a50' }}
        />
        <Caption>Favorite</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={navigateToMostPlayed}
      >
        <Avatar.Icon
          icon="trending-up"
          color="#4a47a3"
          style={{ backgroundColor: '#4a47a350' }}
        />
        <Caption>Most Played</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onPress={startSongs}
      >
        <Avatar.Icon
          icon="radio"
          color="#0c9463"
          style={{ backgroundColor: '#0c946350' }}
        />
        <Caption>Radio</Caption>
      </TouchableOpacity>
    </View>
  );
};
