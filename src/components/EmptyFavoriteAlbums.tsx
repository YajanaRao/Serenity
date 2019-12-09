import React from 'react';
import { Title, Subheading } from 'react-native-paper';
import { View } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

export const EmptyFavoriteAlbums = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 24,
      }}
    >
      <ThemedIcon name="heart-outline" size={80} />
      <Title>No favorites yet.</Title>
      <Subheading style={{ textAlign: 'center' }}>
        Songs, albums, artists and playlists you've liked will live here
      </Subheading>
    </View>
  );
};
