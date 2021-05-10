import React from 'react';
import { Text } from 'react-native-paper';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { DefaultImage } from './DefaultImage';
import { TrackProps } from '../utils/types';

interface TrackScrollViewProps {
  data: TrackProps[];
  play(track: TrackProps): void;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

// FIXME: Testing the application
export const TrackScrollView = ({
  data,
  play,
  containerStyle = {},
  imageStyle = {},
}: TrackScrollViewProps) => (
  <FlatList
    horizontal
    data={data}
    keyExtractor={(item, index) => index.toString()}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[styles.item, containerStyle]}
        onPress={() => play(item)}
      >
        {item?.cover ? (
          <FastImage
            source={{
              uri: item.cover,
            }}
            style={[styles.photo, imageStyle]}
          />
        ) : (
          <DefaultImage style={styles.photo} />
        )}

        <Text numberOfLines={2} style={styles.title}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 12,
    width: 120,
  },
  title: {
    fontSize: 12,
    marginTop: 8,
    padding: 0,
    fontFamily: 'Nunito-Bold',
    includeFontPadding: false,
  },
  photo: {
    borderRadius: 12,
    elevation: 4,
    height: 120,
    width: 120,
    backgroundColor: 'gray'
  },
});
