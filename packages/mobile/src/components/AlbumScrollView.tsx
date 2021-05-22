import React from 'react';
import { Title, Paragraph } from 'react-native-paper';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Container } from 'components';

interface TrackProps {
  artwork: string;
  title: string;
  artist: string;
  album: string;
}

interface Props {
  data: TrackProps[];
  title: string;
  navigateToSongs(item: TrackProps): void;
}

export const AlbumScrollView = ({ data, title, navigateToSongs }: Props) => (
  <Container>
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
          <FastImage source={{ uri: item.artwork }} style=[{ backgroundColor: "gray" }]  />
          <Paragraph numberOfLines={1}>{item.album}</Paragraph>
        </TouchableOpacity>
      )}
    />
  </Container>
);

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
    height: 140,
    width: 120,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    elevation: 4,
  },
});
