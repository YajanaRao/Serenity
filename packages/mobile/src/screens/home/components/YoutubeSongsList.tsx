import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { TrackScrollView } from '../../../components/TrackScrollView';
import { Youtube } from 'media';
import { playTrack } from '../../../actions/playerState';
import { Headline } from 'components';

const YoutubeSongsList = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    if (netInfo.isConnected) {
      Youtube.searchYoutubeMusic('trending songs').then(data => {
        if (data) {
          setPlaylist(data);
        }
      });
    }
  }, [netInfo]);

  function playAudio(song) {
    dispatch(playTrack(song));
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
            marginBottom: 8,
          }}
        >
          <Headline>Youtube Songs</Headline>
        </View>
        <TrackScrollView
          containerStyle={{ width: 180 }}
          imageStyle={{ height: 101, width: 180 }}
          data={playlists}
          play={playAudio}
        />
      </View>
    );
  }

  return null;
};

export default YoutubeSongsList;
