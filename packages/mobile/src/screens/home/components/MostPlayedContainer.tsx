import React from 'react';
import { useDispatch } from 'react-redux';
import { View, ViewStyle } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { TrackScrollView } from '../../../components/TrackScrollView';
import { playTrack } from '../../../actions/playerState';
import { TrackProps } from '../../../utils/types';
import { Headline } from 'components';
import { HISTORY_PLAYLIST_ID } from '../../../database/consts';
import { usePlaylistSongs } from '../../../hooks/usePlaylistSongs';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 16,
  marginBottom: 8,
};

export const MostPlayedContainer = () => {
  const navigation = useNavigation();
  const history = usePlaylistSongs(HISTORY_PLAYLIST_ID, 'most-played')

  const dispatch = useDispatch();

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(playTrack(track));
    }
  };

  const navigateToSongs = React.useMemo(
    () => () => {
      const playlist = {
        id: HISTORY_PLAYLIST_ID,
        name: 'Most Played Songs',
        owner: 'Serenity',
      };
      navigation.navigate('Playlist', {
        playlist,
      });
    },
    [navigation],
  );

  if (history.length) {
    return (
      <View>
        <View style={CONTAINER}>
          <Headline>Most Played</Headline>
          {history.length > 3 ? (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          ) : null}
        </View>
        <TrackScrollView data={history} play={play} />
      </View>
    );
  }
  return null;
};
