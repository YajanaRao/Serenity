import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToQueue } from '../../actions/playerState';
import { findArtistSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';

function ArtistSongs({ route, navigation }) {
  const { artist } = route.params;
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    navigation.setParams({ addToQueue: addSongsToQueue });
  }, []);

  function fetchData() {
    const songsPromise = findArtistSongs(artist.name || artist.artist);
    songsPromise.then(tracks => {
      setSongs(tracks);
    });
  }

  function addSongsToQueue() {
    dispatch(addToQueue(songs));
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
}

export default ArtistSongs;
