import React from 'react';
import { IconButton, List, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ActiveTrackIcon from './ActiveTrackIcon';
import { DefaultImage } from './DefaultImage';

interface TrackProps {
  title: string;
  album?: string;
  artist?: string;
  cover?: string;
  type?: string;
}

interface Props {
  track: TrackProps;
  active: boolean;
  play(): void;
  download(): void;
}

export const Track = React.memo(({ track, active, play, download }: Props) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={[styles.surface, { backgroundColor: colors.background }]}>
      <List.Item
        title={track?.title}
        description={ track?.artist || track?.album}
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
            track.type === 'online' && (
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
});

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
