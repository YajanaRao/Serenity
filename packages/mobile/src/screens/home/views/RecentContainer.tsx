import React from 'react';
import { View, FlatList } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/core';
import { Headline } from '@serenity/components';
import { useDispatch, useSelector } from 'react-redux';
import { TrackProps } from '../../../utils/types';
import { playSong } from '../../../../../core/src';
import { TrackItem } from '../components/TrackItem';

export const RecentContainer = () => {
  const navigation = useNavigation();
  const history = useSelector(state => state.player.history);
  console.log('history', history);
  const dispatch = useDispatch();

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(playSong(track));
    }
  };

  const navigateToSongs = () => {
    const playlist = {
      id: 'user-playlist--000001',
      name: 'Recent songs',
      owner: 'Serenity',
    };
    navigation.navigate('Playlist', {
      playlist,
    });
  };

  if (history.length) {
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
          <Headline>Recently Played</Headline>
          {history.length > 3 ? (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          ) : null}
        </View>
        <FlatList
          horizontal
          data={history}
          keyExtractor={(item, index) => `recently-played-${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={play} />}
        />
      </View>
    );
  }
  return null;
};

