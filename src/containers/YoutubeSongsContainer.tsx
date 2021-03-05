import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Title } from 'react-native-paper';
import ytdl from 'react-native-ytdl';
import { useDispatch } from 'react-redux';
import { TrackScrollView } from '../components/TrackScrollView';
import { getYoutubeMusic } from '../services/YoutubeData';
import { loadTrack } from '../actions/playerState';

const YoutubeSongsContainer = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);

  function playAudioFromYoutube(song) {
    ytdl(song.path, { filter: format => format.container === 'mp4' }).then(
      urls => {
        song.path = urls[0].url;
        dispatch(loadTrack(song));
      },
    );
  }

  useEffect(() => {
    getYoutubeMusic().then(music => setPlaylist(music));
  }, []);

  if (netInfo.isConnected) {
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
        <TrackScrollView data={playlist} play={playAudioFromYoutube} />
      </View>
    );
  }

  return null;
};

export default YoutubeSongsContainer;
