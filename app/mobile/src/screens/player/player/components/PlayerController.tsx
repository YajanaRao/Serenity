import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Player } from '@serenity/core';
import { usePlaybackState } from 'react-track-player';
import { IconButton } from '@serenity/components';
import { Neomorph } from 'react-native-neomorph-shadows';

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
    if (state === "playing") {
      Player.pause()
    } else {
      Player.play();
    }
  };

  return (
    <View style={styles.playerToolbox}>
      <IconButton name="skip-back-outline" onPress={previous} size={70} />
      <Neomorph
        // swapShadows // <- change zIndex of each shadow color
        darkShadowColor={'black'}
        lightShadowColor={'white'}
        style={{
          shadowRadius: 8,
          borderRadius: 40,
          backgroundColor: colors.surface,
          width: 80,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <FAB
          icon={state === 'playing' ? 'pause' : 'play'}
          onPress={togglePlayback}
          loading={state === 'loading'}
          style={{ backgroundColor: colors.surface, width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: "center" }}
        />
      </Neomorph>
      <IconButton name="skip-forward-outline" onPress={next} size={70} />
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
