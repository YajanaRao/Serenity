import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Surface,
  Text,
  Caption,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import { DefaultImage } from './DefaultImage';
import { TrackProps } from '../utils/types';

interface Props {
  active: TrackProps;
  status: string;
  togglePlayback(): void;
  navigateToPlayer(): void;
}

export const PlayerBar = ({
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
          <Text
            numberOfLines={1}
            style={{
              marginVertical: 0,
              includeFontPadding: false,
              fontFamily: 'Nunito-Bold',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
          <Caption
            numberOfLines={1}
            style={{ marginVertical: 0, includeFontPadding: false }}
          >
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

const styles = StyleSheet.create({
  artwork: {
    backgroundColor: '#d7d1c9',
    borderRadius: 4,
    height: 50,
    width: 50,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 50,
  },
  playBar: {
    alignItems: 'center',
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  textContainer: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  },
});
