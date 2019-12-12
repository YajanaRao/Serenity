import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subheading, Title } from 'react-native-paper';
import { DefaultImage } from './DefaultImage';
import { TrackProps } from '../types';

interface Props {
  track: TrackProps;
}

export const ActiveTrackDetails = ({ track }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.centerContainer}>
        {track.cover ? (
          <FastImage source={{ uri: track.cover }} style={[styles.artCover]} />
        ) : (
          <DefaultImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Title numberOfLines={1}>{track.title}</Title>
        <Subheading numberOfLines={1}>
          {track.artist ? track.artist : track.album}
        </Subheading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: {
    borderRadius: 12,
    elevation: 4,
    height: Dimensions.get('window').width - 50,
    maxHeight: 300,
    maxWidth: 300,
    width: Dimensions.get('window').width - 50,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
