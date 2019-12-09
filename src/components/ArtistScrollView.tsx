import React from 'react';
import { Paragraph, Title } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TrackProps {
  artwork: string;
  title: string;
  artist: string;
  album: string;
}

interface Props {
  data: TrackProps[];
  title: string;
  navigateToSongs(): void;
}

export const ArtistScrollView = ({ data, title, navigateToSongs }: Props) => {
  return (
    <View>
      {data ? <Title style={styles.title}>{title}</Title> : false}
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
            <FastImage source={{ uri: item.artwork }} style={styles.artist} />
            <Paragraph numberOfLines={1}>{item.album}</Paragraph>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
  },
  artist: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 1,
  },
});
