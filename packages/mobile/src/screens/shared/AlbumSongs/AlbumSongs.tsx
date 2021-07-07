import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import { Screen } from '@serenity/components';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addSongToQueue } from '@serenity/core';
import { findAlbumSongs } from '../../../../../core/src/actions/media';
import { SongListContainer } from '../../../containers/SongListContainer';
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
    console.log("view: ", data)
    dispatch(addSongToQueue(data.songs));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: album.name || album.album,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <FavAlbum id={album.id} />
          {isFetching ? null : <IconButton icon="play-circle-outline" onPress={addSongsToQueue} />}
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
      <SongListContainer
        data={songs}
        fetchData={fetchData}
        title={album.name || album.album}
        cover={album.cover}
      />
    </Screen>
  );
};
