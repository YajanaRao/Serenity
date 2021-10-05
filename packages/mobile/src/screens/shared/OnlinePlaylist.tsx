import React, { useState } from 'react';
import { Button, Divider, Subheading, IconButton } from 'react-native-paper';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import FastImage from 'react-native-fast-image';
import { Headline, Screen } from '@serenity/components';
import { Assets } from 'media';
import { addSongToQueue } from '@serenity/core';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';
import { DefaultImage } from '../../components/DefaultImage';
import { TrackProps } from '../../utils/types';
import { Track } from 'components/Track';

export const OnlinePlaylist = ({ route, navigation }) => {
  const { playlist, filter } = route.params;
  const songs = Assets.getSongsFromPlaylist(playlist.id);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const addToQueue = () => {
    dispatch(addSongToQueue(values(songs)));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="play-circle-outline"
          onPress={addSongToQueue}
        />
      ),
    });
  }, [navigation]);

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
                <Headline>{playlist.name}</Headline>
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
          renderItem={({ item }: { item: TrackProps }) => (
            <Track track={item} />
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
