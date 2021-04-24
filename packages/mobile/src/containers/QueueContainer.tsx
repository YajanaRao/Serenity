import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Surface, Title, IconButton, Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { deserializeSongs } from '../utils/database';
import { getQueuedSongs } from '../actions/realmAction';
import { removeFromQueue } from '../actions/playerState';
import { FavContainer } from './FavContainer';
import { TrackContainer } from './TrackContainer';
import { TrackProps } from '../utils/types';
import realm from '../database';

interface Props {}

interface ItemProps {
  item: TrackProps;
}

export const QueueContainer = ({}: Props) => {
  const realmSongs = getQueuedSongs();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [queue, setQueue] = useState(() => {
    return deserializeSongs(realmSongs);
  });

  useEffect(() => {
    const listener = (songs: TrackProps, changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const song = deserializeSongs(songs);
        setQueue(song);
      }
    };
    if (realmSongs !== undefined && !realm.isInTransaction) {
      realmSongs.addListener(listener);
      return () => {
        realmSongs.removeListener(listener);
      };
    }
  }, [realmSongs]);

  const removeSongFromQueue = (song: TrackProps) => {
    dispatch(removeFromQueue(song));
  };

  if (!isEmpty(queue)) {
    return (
      <View>
        <SwipeListView
          data={queue}
          renderItem={({ item }: ItemProps) => <TrackContainer track={item} />}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={({ item }) => (
            <Surface style={styles.rowBack}>
              <IconButton
                icon="trash-outline"
                color="#dd1818"
                onPress={() => removeSongFromQueue(item)}
              />
              <FavContainer type="song" item={item} />
            </Surface>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
          closeOnRowPress
          closeOnRowOpen
          useNativeDriver
        />
      </View>
    );
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Title>No Songs in the queue</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
