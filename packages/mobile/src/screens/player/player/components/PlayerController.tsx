import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FAB, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Player } from '@serenity/core';
import { usePlaybackState } from 'react-track-player';

export const PlayerController = () => {
  const dispatch = useDispatch();
  const state = usePlaybackState();
  const { colors } = useTheme();

  const previous = () => {
    dispatch(Player.playPrevious());
  };

  const next = () => {
    dispatch(Player.playNext());
  };

  const togglePlayback = () => {
    if(state === "playing"){
      Player.pause()
    } else {
      Player.play();
    }
  };
  
  return (
    <View style={styles.playerToolbox}>
      <IconButton icon="skip-back-outline" size={50} onPress={previous} />
      <FAB
        icon={state === 'playing' ? 'pause' : 'play'}
        onPress={togglePlayback}
        loading={state === 'loading'}
        style={{ backgroundColor: colors.onSurface }}
      />
      <IconButton icon="skip-forward-outline" size={50} onPress={next} />
    </View>
  );
};

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
  },
});
