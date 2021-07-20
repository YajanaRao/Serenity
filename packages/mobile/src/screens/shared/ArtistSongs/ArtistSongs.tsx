import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import { Screen } from '@serenity/components';
import { useDispatch } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { findArtistSongs } from '@serenity/core/src/actions/media';
import { addSongToQueue } from '@serenity/core';
import { SongListContainer } from '../../../containers/SongListContainer';
import { EmptyPlaylist } from '../../../components/EmptyPlaylist';
import { FollowArtist } from './components/FollowArtist';

export const ArtistSongs = ({ route, navigation }) => {
  const { artist } = route.params;
  const [data, setSongs] = useState({
    isFetching: true,
    songs: [],
  });

  const dispatch = useDispatch();

  const addSongsToQueue = () => {
    dispatch(addSongToQueue(data));
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: artist.artist || artist.name,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <FollowArtist id={artist} />
          <IconButton icon="play-circle-outline" onPress={addSongsToQueue} />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    findArtistSongs(artist.name || artist.artist).then(songs => {
      setSongs({
        isFetching: false,
        songs,
      });
    });
  };

  const { isFetching, songs } = data;

  if (!isFetching && isEmpty(songs)) {
    return <EmptyPlaylist />;
  }

  return (
    <Screen>
      <SongListContainer
        data={songs}
        fetchData={fetchData}
        title={artist.name || artist.artist}
        cover={artist.cover}
      />
    </Screen>
  );
};
