import React from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';
import * as data from '../assets/Media.json';
import { TrackScrollView } from '../components/TrackScrollView';
import { Headline } from '../components/Headline';

const OnlineSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const navigateToPlaylist = (playlist: any) => {
    const playlistMetadata = {
      id: 'online-playlist--000002',
      name: playlist.title,
      owner: 'Serenity',
      cover: playlist.cover,
    };
    navigation.navigate('Playlist', {
      playlist: playlistMetadata,
      songs: playlist.children,
    });
  };

  const { media } = data;
  if (netInfo.isConnected) {
    return (
      <View>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Headline>Online Songs</Headline>
        </View>
        <TrackScrollView data={media} play={navigateToPlaylist} />
      </View>
    );
  }

  return null;
};

export default OnlineSongsContainer;
