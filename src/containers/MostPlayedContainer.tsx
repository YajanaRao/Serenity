import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, ViewStyle } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { TrackScrollView } from '../components/TrackScrollView';
import { loadTrack } from '../actions/playerState';
import { getPlayedSongs } from '../actions/realmAction';
import { TrackProps } from '../types';
import { mostPlayedSongs } from '../actions/mediaStore';
import realm from '../database';
import { Headline } from '../components/Headline';

const CONTINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 16,
  marginBottom: 8,
};

export const MostPlayedContainer = () => {
  const navigation = useNavigation();
  const realmSongs = getPlayedSongs();
  const [history, setHistory] = useState(() => {
    return mostPlayedSongs(realmSongs);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (songs: [], changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const song = mostPlayedSongs(songs);
        setHistory(song);
      }
    };
    if (realmSongs !== undefined && !realm.isInTransaction) {
      realmSongs.addListener(listener);
      return () => {
        realmSongs.removeListener(listener);
      };
    }
  }, [realmSongs]);

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(loadTrack(track));
    }
  };

  const navigateToSongs = React.useMemo(
    () => () => {
      const playlist = {
        id: 'user-playlist--000001',
        name: 'Most Played Songs',
        owner: 'Serenity',
      };
      navigation.navigate('Playlist', {
        songs: mostPlayedSongs(realmSongs),
        playlist,
      });
    },
    [navigation, realmSongs],
  );

  if (history.length) {
    console.log(history);
    return (
      <View>
        <View style={CONTINER}>
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
