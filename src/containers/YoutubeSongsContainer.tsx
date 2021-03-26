import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { TrackScrollView } from '../components/TrackScrollView';
import { searchYoutubeMusic } from '../services/Youtube';
import { loadTrack } from '../actions/playerState';

const YoutubeSongsContainer = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    searchYoutubeMusic('trending songs').then(data => setPlaylist(data));
  }, []);

  function playAudio(song) {
    dispatch(loadTrack(song));
  }

  if (netInfo.isConnected && playlists.length) {
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
        <TrackScrollView data={playlists} play={playAudio} />
      </View>
    );
  }

  return null;
};

export default YoutubeSongsContainer;
