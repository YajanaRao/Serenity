import React from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { TrackScrollView } from '../components/TrackScrollView';
import { getYoutubeMusic } from '../services/Youtube';
import { useCache } from '../hooks/useCache';

const YoutubeSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const navigateToPlaylist = (playlist: any) => {
    const playlistMetadata = {
      id: 'youtube-playlist--000002',
      name: playlist.title,
      owner: 'Serenity',
      cover: playlist.cover,
    };
    navigation.navigate('Playlist', {
      playlist: playlistMetadata,
      songs: playlist.children,
    });
  };

  const playlist = useCache('youtube_music', () =>
    getYoutubeMusic('top 10 music '),
  );

  if (netInfo.isConnected && playlist.length) {
    return (
      <View>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Title>Youtube Songs</Title>
        </View>
        <TrackScrollView data={playlist} play={navigateToPlaylist} />
      </View>
    );
  }

  return null;
};

export default YoutubeSongsContainer;
