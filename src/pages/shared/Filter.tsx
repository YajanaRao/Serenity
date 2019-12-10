import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToQueue } from '../../actions/playerState';
import { filterSongsByGenre } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from '../../components/Screen';
import { NavigationScreenProps } from '../../types';

const Filter = ({ navigation, route }: NavigationScreenProps) => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    navigation.setParams({ addToQueue: addSongsToQueue });
  }, []);

  const addSongsToQueue = () => {
    dispatch(addToQueue(songs));
  };

  const fetchData = async () => {
    const genre = route.params.genre.title;
    const songs = await filterSongsByGenre(genre);
    setSongs(songs);
  };

  const { genre } = route.params;

  return (
    <Screen>
      <SongListContainer
        data={songs}
        fetchData={fetchData}
        title={genre.title}
        cover={genre.image}
      />
    </Screen>
  );
};

export default Filter;
