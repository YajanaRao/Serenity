import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import {
  playTrack,
  skipToNext,
  skipToPrevious,
  pauseTrack,
} from '../actions/playerState';
import { RootReducerType } from '../reducers';

export const PlayerController = () => {
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootReducerType) => state.playerState.status,
  );

  const previous = () => {
    dispatch(skipToPrevious());
  };

  const next = () => {
    dispatch(skipToNext());
  };

  const togglePlayback = () => {
    if (status === 'playing') {
      requestAnimationFrame(() => {
        pauseTrack();
      });
    } else {
      requestAnimationFrame(() => {
        playTrack();
      });
    }
  };
  return (
    <View style={styles.playerToolbox}>
      <IconButton icon="play-skip-back" size={40} onPress={previous} />
      <FAB
        icon={status === 'playing' ? 'pause' : 'play'}
        onPress={togglePlayback}
        loading={status === 'loading'}
      />
      <IconButton icon="play-skip-forward" size={40} onPress={next} />
    </View>
  );
};

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
