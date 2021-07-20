import React from 'react';
import { View, FlatList } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/core';
import { Headline } from '@serenity/components';
import { playSong, useAppDispatch, useAppSelector, historySelectors } from '@serenity/core';
import { TrackProps } from '../../../../utils/types';
import { TrackItem } from '../../components/TrackItem';

export const RecentContainer = () => {
  const navigation = useNavigation();
  const history = useAppSelector(state => historySelectors.selectIds(state));
  const dispatch = useAppDispatch();

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(playSong(track));
    }
  };

  const navigateToSongs = () => {
    navigation.navigate('History');
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

