import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { findAlbumSongs } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from 'components';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';

export const AlbumSongs = ({ route }) => {
  const { album } = route.params;
  const [data, setSongs] = useState({
    isFetching: true,
    songs: [],
  });

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
