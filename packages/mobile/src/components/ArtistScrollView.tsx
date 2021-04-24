import React from 'react';
import { Paragraph, Title } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TrackProps } from '../utils/types';

interface Props {
  data: TrackProps[];
  title: string;
  navigateToSongs(songs: TrackProps): void;
}

export const ArtistScrollView = ({ data, title, navigateToSongs }: Props) => {
  return (
    <View>
      <Title style={styles.title}>{title}</Title>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateToSongs(item)}
          >
            <FastImage source={{ uri: item.cover }} style={styles.artist} />
            <Paragraph numberOfLines={1}>{item.album}</Paragraph>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  artist: {
    borderRadius: 60,
    elevation: 1,
    height: 120,
    width: 120,
  },
  item: {
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 12,
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
});
