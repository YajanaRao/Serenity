import { useNetInfo } from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadTrack } from '../actions/playerState';
import { Headline } from '../components/Headline';
import { TrackScrollView } from '../components/TrackScrollView';
import { getJioSaavnMusic } from '../services/JioSaavn';

export interface JioSaavnContainerProps {}

export function JioSaavnContainer(props: JioSaavnContainerProps) {
  const [songs, setSongs] = useState(null);
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    getJioSaavnMusic().then(data => setSongs(data));
  }, []);

  function playAudioFromJioSaavn(song) {
    dispatch(loadTrack(song));
  }

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
          <Headline>JioSaavn Songs</Headline>
        </View>
        <TrackScrollView data={songs} play={playAudioFromJioSaavn} />
      </View>
    );
  }

  return null;
}
