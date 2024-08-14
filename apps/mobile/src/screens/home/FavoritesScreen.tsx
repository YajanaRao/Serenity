import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Container, Screen, Title } from '@serenity/components';
import { Player, selectLikedSongIds, selectLikedSongs, useAppDispatch, useAppSelector } from '@serenity/core';
import { SongItem } from 'components/SongItem/SongItem';
import { FavBanner } from 'components/FavBanner/FavBanner';

export function Favorites() {
  const songs = useAppSelector(state => selectLikedSongIds(state));
  const likedSongs = useAppSelector(state => selectLikedSongs(state));
  const dispatch = useAppDispatch();

  function playSongs() {
    if (likedSongs.length) {
      dispatch(Player.add(likedSongs));
    }
  }

  if (!songs) return null;
  return (
    <Screen>
      <FlatList
        data={songs}
        ListHeaderComponent={() => (
          <View style={{ margin: 16 }}>
            <FavBanner title="Favorites songs" />
            <View style={styles.buttonContainer}>
              <Button onPress={playSongs}>Play</Button>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Container style={styles.titleContainer}>
            <Title>Your favorite list is currently empty.</Title>
            <Title>Checkout out for songs you may like</Title>
          </Container>
        )}
        keyExtractor={(index) => `fav-${index.toString()}`}
        renderItem={({ item }) => <SongItem id={item} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', margin: 16 },
  buttonContainer: { justifyContent: 'center', alignItems: 'center', flex: 1, margin: 12 },
});
