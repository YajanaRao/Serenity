import React, { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import { View, StyleSheet } from 'react-native';
import { IconButton, useTheme, List } from 'react-native-paper';
import { downloadMedia, SongProps, useAppDispatch, useAppSelector } from '@serenity/core';
import { playSong } from '@serenity/core';
import FastImage from 'react-native-fast-image';
import { DefaultImage } from 'components/DefaultImage';
import ActiveTrackIcon from 'components/ActiveTrackIcon';

interface Props {
  track: SongProps;
  goBack?: () => void;
}

export const Track = ({ track, goBack }: Props) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const active = useAppSelector(
    (state) => state.player.active,
  );

  const download = () => {
    dispatch(downloadMedia(track));
  };

  useEffect(() => {
    if (!isUndefined(active) && track.id) {
      setActive(isEqual(active.id, track.id));
    }
  }, [active, track]);

  const play = () => {
    if (!isActive) {
      dispatch(playSong(track));
    }
    if (goBack) {
      goBack();
    }
  };

  const { colors } = useTheme();
  return (
    <View style={[styles.surface, { backgroundColor: colors.background }]}>
      <List.Item
        title={track?.title}
        description={track?.artist || track?.album}
        left={() =>
          track?.cover ? (
            <FastImage source={{ uri: track.cover }} style={styles.artwork} />
          ) : (
            <DefaultImage style={styles.artwork} />
          )
        }
        right={props =>
          active ? (
            <ActiveTrackIcon
              style={[{ height: 50, width: 30, marginLeft: 4 }, props.style]}
            />
          ) : (
            track?.type === 'online' && (
              <IconButton
                icon="download-outline"
                onPress={download}
                {...props}
              />
            )
          )
        }
        onPress={() => play()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
  artwork: {
    backgroundColor: '#d7d1c9',
    borderRadius: 4,
    height: 50,
    width: 50,
  },
});