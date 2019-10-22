import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import DefaultImage from './DefaultImage';

const ListSongHeader = ({ title, cover, isEmpty, addSongsToQueue }) => (
  <View>
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
    {isEmpty ? (
      <View style={styles.fillContainer}>
        <Title>No songs</Title>
      </View>
    ) : (
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={addSongsToQueue}>
          Play All
        </Button>
      </View>
    )}
  </View>
);

export default ListSongHeader;

const styles = StyleSheet.create({
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
