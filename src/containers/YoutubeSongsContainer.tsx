import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { TrackScrollView } from '../components/TrackScrollView';
import { getYoutubeMusic } from '../services/YoutubeData';

const YoutubeSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [playlist, setPlaylist] = useState([]);

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

  useEffect(() => {
    getYoutubeMusic('songs').then(data => setPlaylist(data));
  }, []);

  console.log('playlist: ', playlist);
  if (netInfo.isConnected && playlist.length) {
    return (
      <View>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
