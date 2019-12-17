import React from 'react';
import { Title, Subheading } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  margin: 24,
};

export const EmptyFavoriteAlbums = () => {
  return (
    <View style={CONTAINER}>
      <ThemedIcon name="heart-outline" size={80} />
      <Title>No favorites yet.</Title>
      <Subheading style={{ textAlign: 'center' }}>
        Songs, albums, artists and playlists you&apos;ve liked will live here
      </Subheading>
    </View>
  );
};
