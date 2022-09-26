import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { View } from 'react-native';
import { Screen } from '@serenity/components';
import { useDispatch } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { findArtistSongs } from '@serenity/core/src/actions/media';
import { Player } from '@serenity/core';
import { SongList } from 'components/SongList';
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
    dispatch(Player.add(data.songs));
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: artist.artist || artist.name,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <FollowArtist id={artist.id} />
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
      <SongList
        data={songs}
        fetchData={fetchData}
        title={artist.name || artist.artist}
        cover={artist.cover}
      />
    </Screen>
  );
};
