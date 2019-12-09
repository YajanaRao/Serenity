import React from 'react';
import { Paragraph } from 'react-native-paper';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { DefaultImage } from './DefaultImage';

interface TrackProps {
  artwork: string;
  title: string;
  artist: string;
}

interface TrackScrollViewProps {
  data: TrackProps[];
  play(track: TrackProps): void;
}

// FIXME: Testing the application
export const TrackScrollView = ({ data, play }: TrackScrollViewProps) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => play(item)}>
          {item.artwork ? (
            <FastImage
              source={{
                uri: item.artwork,
              }}
              style={styles.photo}
            />
          ) : (
            <DefaultImage style={styles.photo} />
          )}

          <Paragraph numberOfLines={1}>{item.title}</Paragraph>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    elevation: 4,
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
    width: 120,
  },
});
