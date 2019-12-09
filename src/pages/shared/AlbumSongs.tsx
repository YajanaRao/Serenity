import React, { useEffect, useState } from 'react';

import { findAlbumSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';
import { TrackProps } from '../../types';

function AlbumSongs({ route }) {
  const { album } = route.params;
  const [songs, setSongs] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    findAlbumSongs(album.name || album.album).then((tracks: TrackProps) => {
      setSongs(tracks);
    });
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
}

export default AlbumSongs;
