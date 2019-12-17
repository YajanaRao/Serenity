import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Surface, Title, IconButton, Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { deserializeSongs } from '../utils/database';
import { getQueuedSongs } from '../actions/realmAction';
import { clearQueue, removeFromQueue } from '../actions/playerState';
import { FavContainer } from './FavContainer';
import { TrackContainer } from './TrackContainer';
import { TrackProps } from '../types';
import { AlertDialog } from '../components/AlertDialog';

interface Props {
  close(): void;
}

interface ItemProps {
  item: TrackProps;
}

export const QueueContainer = ({ close }: Props) => {
  const realmSongs = getQueuedSongs();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
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
    if (realmSongs !== undefined) {
      realmSongs.addListener(listener);
    }
    return () => {
      realmSongs.removeListener(listener);
    };
  }, [realmSongs]);

  const openAlert = () => {
    setVisible(true);
  };

  const clearQueueSongs = () => {
    dispatch(clearQueue());
    close();
  };

  const removeSongFromQueue = (song: TrackProps) => {
    dispatch(removeFromQueue(song));
  };

  if (!isEmpty(queue)) {
    return (
      <View>
        <AlertDialog
          visible={visible}
          hideDialog={() => setVisible(false)}
          action={clearQueueSongs}
          title="Clear Queue"
          message="Clear queue would stop current playing song"
        />
        <SwipeListView
          data={queue}
          ListHeaderComponent={() => (
            <View style={styles.rowContainer}>
              <Title style={{ padding: 10 }}>Queue</Title>
              <IconButton
                icon="delete"
                // size={40}
                onPress={openAlert}
              />
            </View>
          )}
          renderItem={({ item }: ItemProps) => <TrackContainer track={item} />}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={({ item }) => (
            <Surface style={styles.rowBack}>
              <IconButton
                icon="delete"
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
  return false;
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
