import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FAB, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { playNext, playPrevious, toggle } from '../../../../../core/src';
import { playNextSong } from '../../../../../core/src/actions/player';
import { RootReducerType } from '../../../../../core/src/reducers';

export const PlayerController = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const status = useSelector(
    (state: RootReducerType) => state.player.status,
  );

  const previous = () => {
    dispatch(playPrevious());
  };

  const next = () => {
    dispatch(playNextSong());
  };

  const togglePlayback = () => {
    dispatch(toggle())
  };
  return (
    <View style={styles.playerToolbox}>
      <IconButton icon="skip-back-outline" size={50} onPress={previous} />
      <FAB
        icon={status === 'playing' ? 'pause' : 'play'}
        onPress={togglePlayback}
        loading={status === 'loading'}
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
