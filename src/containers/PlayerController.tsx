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

function PlayerController() {
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.playerState.status);

  function previous() {
    dispatch(skipToPrevious);
  }

  function next() {
    dispatch(skipToNext);
  }

  function togglePlayback() {
    if (status === 'playing') {
      requestAnimationFrame(() => {
        pauseTrack();
      });
    } else {
      requestAnimationFrame(() => {
        playTrack();
      });
    }
  }
  return (
    <View style={styles.playerToolbox}>
      <IconButton icon="skip-previous" size={40} onPress={previous} />
      <FAB
        icon={status === 'playing' ? 'pause' : 'play'}
        onPress={togglePlayback}
        loading={status === 'loading'}
      />
      <IconButton icon="skip-next" size={40} onPress={next} />
    </View>
  );
}

export default PlayerController;

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
