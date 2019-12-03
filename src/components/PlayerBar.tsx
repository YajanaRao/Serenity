import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Surface,
  Subheading,
  Caption,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import DefaultImage from './DefaultImage';

interface TrackProps {
  cover: string;
  title: string;
  artist?: string;
  album?: string;
}

interface Props {
  active: TrackProps;
  status: string;
  togglePlayback(): void;
  navigateToPlayer(): void;
}

const PlayerBar = ({
  active,
  status,
  togglePlayback,
  navigateToPlayer,
}: Props) => {
  const { cover, artist, album, title } = active;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ height: 60, width: '100%' }}
      onPress={navigateToPlayer}
    >
      <Surface style={styles.playBar}>
        {cover ? (
          <FastImage source={{ uri: cover }} style={styles.artwork} />
        ) : (
          <DefaultImage style={styles.artwork} />
        )}
        <View style={styles.textContainer}>
          <Subheading numberOfLines={1} style={{ margin: 0 }}>
            {title}
          </Subheading>
          <Caption numberOfLines={1} style={{ margin: 0 }}>
            {artist || album}
          </Caption>
        </View>
        <View style={styles.iconContainer}>
          {status === 'loading' ? (
            <ActivityIndicator animating={status === 'loading'} />
          ) : (
            <IconButton
              icon={status === 'playing' ? 'pause' : 'play'}
              animated
              size={34}
              onPress={togglePlayback}
              style={{ margin: 0, padding: 0 }}
            />
          )}
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default PlayerBar;

const styles = StyleSheet.create({
  playBar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    elevation: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
