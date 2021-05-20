import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subheading, Text } from 'react-native-paper';
import ActiveTrackImage from './ActiveTrackImage';
import { TrackProps } from '../../../utils/types';

interface Props {
  track: TrackProps;
}

export const ActiveTrackDetails = ({ track }: Props) => {
  return (
    <View>
      <View style={styles.centerContainer}>
        {track?.cover ? (
          <FastImage
            source={{ uri: track.cover }}
            style={[styles.artCover]}
            resizeMode="contain"
          />
        ) : (
          <ActiveTrackImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{ fontFamily: 'Nunito-Bold', fontSize: 20 }}
          numberOfLines={1}
        >
          {track.title}
        </Text>
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
    // elevation: 4,
    height: Dimensions.get('window').width - 80,
    maxHeight: 300,
    maxWidth: 300,
    width: Dimensions.get('window').width - 50,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
