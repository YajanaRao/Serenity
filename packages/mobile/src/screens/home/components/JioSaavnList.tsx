import { useNetInfo } from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Headline } from 'components';
import { JioSaavn } from 'media';

import { playTrack } from '../../../actions/playerState';
import { TrackScrollView } from '../../../components/TrackScrollView';

export interface JioSaavnContainerProps { }

export function JioSaavnContainer({ }: JioSaavnContainerProps) {
  const [songs, setSongs] = useState(null);
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    JioSaavn.getJioSaavnMusic().then(data => setSongs(data));
  }, []);

  function playAudioFromJioSaavn(song) {
    dispatch(playTrack(song));
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
