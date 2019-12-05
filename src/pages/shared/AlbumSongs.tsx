import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToQueue } from '../../actions/playerState';
import { findAlbumSongs } from '../../actions/mediaStore';
import SongListContainer from '../../containers/SongListContainer';
import Screen from '../../components/Screen';

function AlbumSongs({ route, navigation }) {
  const { album } = route.params;
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    navigation.setParams({ addToQueue: addSongsToQueue });
  }, []);

  function fetchData() {
    const songsPromise = findAlbumSongs(album.name || album.album);
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
        title={album.name || album.album}
        cover={album.cover}
      />
    </Screen>
  );
}

export default AlbumSongs;
