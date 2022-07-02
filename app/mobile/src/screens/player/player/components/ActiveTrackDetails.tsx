import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subheading, Text, useTheme } from 'react-native-paper';
import ActiveTrackImage from './ActiveTrackImage';
import { TrackProps } from '../../../../utils/types';
import { Neomorph } from 'react-native-neomorph-shadows';

interface Props {
  track: TrackProps;
}

const {width} = Dimensions.get('screen');
const imageSize = width - 100;
export const ActiveTrackDetails = ({ track }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Neomorph
        style={{
          shadowRadius: 6,
          borderRadius: imageSize/2,
          backgroundColor: colors.surface,
          width: imageSize,
          height: imageSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          {track?.cover ? (
            <FastImage
              source={{ uri: track.cover }}
              style={[styles.artCover, {borderColor: colors.surface}]}
              resizeMode="cover"
            />
          ) : (
            <ActiveTrackImage style={styles.artCover} />
          )}
      </Neomorph>
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
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 4,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
