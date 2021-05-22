import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';

import { findArtistSongs } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from 'components';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';

export const ArtistSongs = ({ route }) => {
  const { artist } = route.params;
  const [data, setSongs] = useState({
    isFetching: true,
    songs: [],
  });

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
