import React from 'react';
import { Title, Button, Divider, Subheading } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import FastImage from 'react-native-fast-image';
import { DefaultImage } from '../../../components/DefaultImage';
import { Screen } from '@serenity/components';
import { EmptyPlaylist } from '../../../components/EmptyPlaylist';

import { addSongToQueue, selectPlaylistSongsById } from '@serenity/core';
import { SongItem } from '../../offline/Song/components/SongItem';

export const PlaylistSongs = ({ route }) => {
  const { playlist } = route.params;
  const songs = useSelector(state => selectPlaylistSongsById(state, playlist.id))
  console.log('playlist songs', songs);
  const dispatch = useDispatch();

  const addToQueue = () => {
    dispatch(addSongToQueue(values(songs)));
  };



  return (
    <Screen>
      {isEmpty(songs) ? (
        <EmptyPlaylist />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{ margin: 12 }}>
              <View style={styles.coverContainer}>
                {playlist.cover ? (
                  <FastImage
                    source={{ uri: playlist.cover }}
                    style={styles.artCover}
                  />
                ) : (
                  <DefaultImage style={styles.artCover} />
                )}
              </View>
              <View style={styles.titleContainer}>
                <Title>{playlist.name}</Title>
                <Subheading>{`by ${playlist.owner}`}</Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={addToQueue}>
                  Play All
                </Button>
              </View>
            </View>
          )}
          data={songs}
          renderItem={({ item }: { item: string }) => (
            <SongItem id={item} />
          )}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
