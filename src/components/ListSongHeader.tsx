import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import DefaultImage from './DefaultImage';

interface ListSongHeaderProps {
  title: string;
  cover: string;
  addSongsToQueue(): void;
}

const ListSongHeader = ({
  title,
  cover,
  addSongsToQueue,
}: ListSongHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.coverContainer}>
      {cover ? (
        <FastImage source={{ uri: cover }} style={styles.artCover} />
      ) : (
        <DefaultImage style={styles.artCover} />
      )}
    </View>
    <View style={styles.titleContainer}>
      <Title>{title}</Title>
    </View>
    <View style={styles.buttonContainer}>
      <Button mode="contained" onPress={addSongsToQueue}>
        Play All
      </Button>
    </View>
  </View>
);

export default ListSongHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex: 1,
  },
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  fillContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
