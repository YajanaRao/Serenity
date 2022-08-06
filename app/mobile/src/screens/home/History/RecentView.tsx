import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/core';
import { Headline } from '@serenity/components';
import { Player, useAppDispatch, useAppSelector, historySelectors, SongProps } from '@serenity/core';
import { TrackItem } from './components/TrackItem';

export const RecentContainer = () => {
  const navigation = useNavigation();
	const songs = useAppSelector(state => historySelectors.selectEntities(state));
  const dispatch = useAppDispatch();

  const play = (track: SongProps) => {
    if (!isEmpty(track)) {
      dispatch(Player.playSong(track));
    }
  };

  const navigateToSongs = () => {
    navigation.navigate('History');
  };

  let history = orderBy(songs, element => element.date, 'desc');

  if (history.length > 3) {
    return (
      <View style={styles.container}>
        <View
          style={styles.titleContainer}
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
          renderItem={({ item }) => <TrackItem id={item.id} onPress={play} />}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
