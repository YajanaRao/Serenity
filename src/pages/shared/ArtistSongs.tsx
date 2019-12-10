import React, { useState, useEffect } from 'react';
import { findArtistSongs } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from '../../components/Screen';

const ArtistSongs = ({ route }) => {
  const { artist } = route.params;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const songsPromise = findArtistSongs(artist.name || artist.artist);
    songsPromise.then(tracks => {
      setSongs(tracks);
    });
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

export default ArtistSongs;
