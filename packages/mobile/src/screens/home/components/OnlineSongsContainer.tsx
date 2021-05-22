import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';
import { TrackScrollView } from '../../../components/TrackScrollView';
import { Headline } from 'components';
import { Assets } from 'media';

const OnlineSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const data = Assets.getPlaylists();
    setPlaylists(data);
  }, [])

  const navigateToPlaylist = (playlist: any) => {

    navigation.navigate('OnlinePlaylist', {
      playlist: playlist,
    });
  };

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
        <TrackScrollView data={playlists} play={navigateToPlaylist} />
      </View>
    );
  }

  return null;
};

export default OnlineSongsContainer;
