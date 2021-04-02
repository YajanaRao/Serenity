import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FAB, useTheme } from 'react-native-paper';
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
  const { colors } = useTheme();
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
      <IconButton icon="skip-back-outline" size={40} onPress={previous} />
      <FAB
        icon={status === 'playing' ? 'pause' : 'play'}
        onPress={togglePlayback}
        loading={status === 'loading'}
        style={{ backgroundColor: colors.onSurface }}
      />
      <IconButton icon="skip-forward-outline" size={40} onPress={next} />
    </View>
  );
};

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
  },
});
