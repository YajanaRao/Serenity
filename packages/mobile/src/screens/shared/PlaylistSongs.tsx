import React, { useState } from 'react';
import { Title, Button, Divider, Subheading } from 'react-native-paper';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import FastImage from 'react-native-fast-image';
import { addToQueue } from '../../actions/playerState';
import { TrackContainer } from '../../containers/TrackContainer';
import { DefaultImage } from '../../components/DefaultImage';
import { Screen } from 'components';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';

import { TrackProps } from '../../utils/types';
import { usePlaylistSongs } from '../../hooks/usePlaylistSongs';

export const PlaylistSongs = ({ route }) => {
  const { playlist, filter } = route.params;
  const songs = usePlaylistSongs(playlist.id, filter);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const addSongToQueue = () => {
    dispatch(addToQueue(values(songs)));
  };


  const onRefresh = () => {
    setRefreshing(true);
    // const playlistSongs = getPlaylistSongs(playlist.id);
    // setSongs(playlistSongs);
    setRefreshing(false);
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
                <Button mode="contained" onPress={addSongToQueue}>
                  Play All
                </Button>
              </View>
            </View>
          )}
          data={songs}
          renderItem={({ item }: { item: TrackProps }) => (
            <TrackContainer track={item} />
          )}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
