import React from 'react';
import { FlatList } from 'react-native';
import { Container, Screen, Title } from '@serenity/components';
import { selectLikedSongs, useAppSelector } from '@serenity/core';
import { SongItem } from '../../components/SongItem/SongItem';

export function Favorites() {
  const songs = useAppSelector(state => selectLikedSongs(state));

  if (!songs) return null;
  return (
    <Screen>
      <FlatList
        data={songs}
        ListEmptyComponent={() => (
          <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>No songs</Title>
          </Container>
        )}
        keyExtractor={(item, index) => `fav-${item}-${index}`}
        renderItem={({ item }) => <SongItem id={item} />}
      />
    </Screen>
  );
}
