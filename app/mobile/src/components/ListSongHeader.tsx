import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Title, Text } from '@serenity/components'
import { DefaultImage } from './DefaultImage';
import { Container, Button } from '@serenity/components';

interface ListSongHeaderProps {
  title: string;
  description?: string;
  cover: string;
  addSongsToQueue(): void;
}

export const ListSongHeader = ({
  title,
  description,
  cover,
  addSongsToQueue,
}: ListSongHeaderProps) => (
  <Container>
    <View style={styles.coverContainer}>
      {cover ? (
        <FastImage source={{ uri: cover }} style={styles.artCover} />
      ) : (
        <DefaultImage style={styles.artCover} />
      )}
    </View>
    <View style={styles.titleContainer}>
      <Title>{title}</Title>
      {description ? <Text numberOfLines={0}>{description}</Text> : null}
    </View>
    <Button onPress={addSongsToQueue} style={styles.buttonContainer}>
      Play All
    </Button>
  </Container>
);

const styles = StyleSheet.create({
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    margin: 8,
  },
  buttonContainer: {
    margin: 12,
  },
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12, backgroundColor: 'lightgray' },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  fillContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
