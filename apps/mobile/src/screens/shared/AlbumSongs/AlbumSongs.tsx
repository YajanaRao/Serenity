import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import { Screen } from '@serenity/components';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Player } from '@serenity/core';
import { findAlbumSongs } from '@serenity/core/src/actions/media';
import { SongList } from '../../../components/SongList';
import { EmptyPlaylist } from '../../../components/EmptyPlaylist';
import { FavAlbum } from './components/FavAlbum';

export const AlbumSongs = ({ route, navigation }) => {
  const { album } = route.params;
  const dispatch = useDispatch();
  const [data, setSongs] = useState({
    isFetching: true,
    songs: [],
  });

  const addSongsToQueue = () => {
    dispatch(Player.add(data.songs));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: album.name || album.album,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <FavAlbum id={album.id} />
          <IconButton icon="play-circle-outline" onPress={addSongsToQueue} disabled={isFetching} />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    findAlbumSongs(album.name || album.album).then(songs => {
      setSongs({
        isFetching: false,
        songs,
      });
    });
  };

  const { songs, isFetching } = data;
  if (!isFetching && isEmpty(songs)) {
    return <EmptyPlaylist />;
  }
  return (
    <Screen>
      <SongList
        data={songs}
        fetchData={fetchData}
        title={album.name || album.album}
        cover={album.cover}
      />
    </Screen>
  );
};
